import { parse } from 'react-docgen-typescript';
import fs from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { glob } from 'glob';
import { promisify } from 'util';
import * as ts from 'typescript';

const globPromise = promisify(glob);

async function getInputFiles(inputPattern) {
  if (existsSync(inputPattern) && (inputPattern.endsWith('.tsx') || inputPattern.endsWith('.ts'))) {
    return [path.resolve(inputPattern)];
  }

  const files = await globPromise(inputPattern, {
    ignore: ['**/node_modules/**', '**/.git/**'],
    nodir: true,
  });

  return files.filter(file => /\.(tsx|ts)$/.test(file)).map(file => path.resolve(file));
}

async function parseTypeDefinitions(program, checker) {
  const typeMap = new Map();

  function getTypeDefinition(type) {
    if (!type) return null;

    const properties = {};
    
    if (type.isUnion()) {
      return {
        type: 'union',
        types: type.types.map(t => getTypeDefinition(t))
      };
    }

    if (type.getProperties) {
      type.getProperties().forEach(prop => {
        const propName = prop.getName();
        const declarations = prop.getDeclarations();
        
        if (!declarations || declarations.length === 0 || 
            declarations.some(d => d.getSourceFile().fileName.includes('node_modules/typescript/lib/'))) {
          return;
        }

        const propType = checker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration);
        const propTypeDef = getTypeDefinition(propType);
        properties[propName] = {
          type: checker.typeToString(propType),
          description: ts.displayPartsToString(prop.getDocumentationComment(checker)),
          optional: (prop.flags & ts.SymbolFlags.Optional) !== 0,
          ...(propTypeDef && { definition: propTypeDef })
        };
      });
    }

    return Object.keys(properties).length > 0 ? { properties } : null;
  }

  return {
    getTypeInfo: (typeName) => {
      if (typeMap.has(typeName)) {
        return typeMap.get(typeName);
      }

      for (const sourceFile of program.getSourceFiles()) {
        if (!sourceFile.isDeclarationFile) {
          ts.forEachChild(sourceFile, node => {
            if (ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
              if (node.name.text === typeName) {
                const type = checker.getTypeAtLocation(node);
                const typeInfo = getTypeDefinition(type);
                if (typeInfo) {
                  typeMap.set(typeName, typeInfo);
                }
                return typeInfo;
              }
            }
          });
        }
      }

      return typeMap.get(typeName) || null;
    }
  };
}

async function parseComponentTypes(input, outputPath) {
  try {
    const inputPatterns = input.split(',').map(p => p.trim());
    const allFiles = new Set();

    for (const pattern of inputPatterns) {
      const files = await getInputFiles(pattern);
      files.forEach(file => allFiles.add(file));
    }

    // 创建编译器选项
    const compilerOptions = {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      jsx: ts.JsxEmit.React,
      esModuleInterop: true,
      skipLibCheck: true,
      baseUrl: process.cwd(),
      paths: {
        "*": ["*", "node_modules/*"]
      }
    };

    // 创建程序实例
    const program = ts.createProgram(Array.from(allFiles), compilerOptions);
    const checker = program.getTypeChecker();
    const typeParser = await parseTypeDefinitions(program, checker);

    // 配置 react-docgen-typescript 解析器
    const parserOptions = {
      savePropValueAsString: true,
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: {
        skipPropsWithoutDoc: false,
      },
    };

    const result = {};

    for (const file of allFiles) {
      try {
        const relativePath = path.relative(process.cwd(), file);
        
        if (file.endsWith('.tsx')) {
          const componentInfo = parse(file, parserOptions);

          if (componentInfo.length > 0) {
            result[relativePath] = {
              components: componentInfo.map(info => ({
                displayName: info.displayName,
                description: info.description,
                props: Object.entries(info.props || {}).reduce((acc, [propName, prop]) => {
                  const typeInfo = typeParser.getTypeInfo(prop.type.name);
                  acc[propName] = {
                    defaultValue: prop.defaultValue,
                    description: prop.description,
                    name: propName,
                    required: prop.required,
                    type: {
                      name: prop.type.name,
                      raw: prop.type.raw,
                      ...(typeInfo && { definition: typeInfo })
                    }
                  };
                  return acc;
                }, {})
              }))
            };
          }
        }
      } catch (err) {
        console.warn(`Warning: Could not parse ${file}:`, {
          error: err.message,
          stack: err.stack,
        });
      }
    }

    const outputDir = path.dirname(outputPath);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    await fs.writeFile(
      outputPath,
      JSON.stringify(result, null, 2),
      'utf8'
    );

    console.log(`Successfully generated documentation at ${outputPath}`);
  } catch (error) {
    console.error('Error parsing files:', error);
    process.exit(1);
  }
}

yargs(hideBin(process.argv))
  .command('parseType', 'Parse React component types and TypeScript interfaces', {
    input: {
      description: 'Input file pattern or specific file path(s). Multiple inputs can be comma-separated.',
      alias: 'i',
      type: 'string',
      demandOption: true,
      example: [
        'src/components/Button.tsx',
        'src/types/*.ts',
        'src/**/*.{ts,tsx}',
        'src/components/Button.tsx,src/types/interfaces.ts'
      ]
    },
    output: {
      description: 'Output JSON file path',
      alias: 'o',
      type: 'string',
      demandOption: true,
    },
  }, (argv) => {
    parseComponentTypes(argv.input, argv.output);
  })
  .example([
    ['$0 parseType -i "src/components/Button.tsx" -o "types.json"', 'Parse a single component file'],
    ['$0 parseType -i "src/types/*.ts" -o "types.json"', 'Parse TypeScript type definitions'],
    ['$0 parseType -i "src/**/*.{ts,tsx}" -o "types.json"', 'Parse all TypeScript files'],
    ['$0 parseType -i "Button.tsx,types.ts" -o "types.json"', 'Parse multiple specific files']
  ])
  .help()
  .argv;
