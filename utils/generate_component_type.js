import { parse } from 'react-docgen-typescript';
import fs from 'node:fs/promises';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { glob } from 'glob';
import { promisify } from 'util';
import * as ts from 'typescript';

const globPromise = promisify(glob);

function getJSDocComment(node) {
  const jsDoc = ts.getJSDocTags(node);
  if (!jsDoc || jsDoc.length === 0) return '';
  
  const comments = jsDoc
    .filter(doc => doc.comment)
    .map(doc => {
      if (typeof doc.comment === 'string') {
        return doc.comment;
      }
      return doc.comment.map(c => c.text).join('');
    });

  return comments.join('\n');
}

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

function getTypeDefinition(type, node = null, checker) {
  if (!type) return null;

  if (type.isIntersection()) {
    const types = type.types.map(t => {
      const typeStr = checker.typeToString(t);
      const definition = checker.getTypeAtLocation(
        ts.createSourceFile('temp.ts', `type Temp = ${typeStr}`, ts.ScriptTarget.Latest)
      );
      return {
        type: typeStr,
        definition: getTypeDefinition(definition, null, checker)
      };
    });

    return {
      type: 'intersection',
      types
    };
  }

  if (type.isUnion()) {
    return {
      type: 'union',
      types: type.types.map(t => checker.typeToString(t))
    };
  }

  if (type.isLiteral()) {
    return {
      type: 'literal',
      value: type.value
    };
  }

  const properties = {};
  
  if (type.getProperties) {
    type.getProperties().forEach(prop => {
      const propName = prop.getName();
      const declarations = prop.getDeclarations();
      
      if (!declarations || declarations.length === 0 || 
          declarations.some(d => d.getSourceFile().fileName.includes('node_modules/typescript/lib/'))) {
        return;
      }

      const propType = checker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration);
      const propTypeDef = getTypeDefinition(propType, null, checker);
      
      const jsDocComment = declarations[0] ? getJSDocComment(declarations[0]) : '';
      
      properties[propName] = {
        type: checker.typeToString(propType),
        description: jsDocComment || ts.displayPartsToString(prop.getDocumentationComment(checker)),
        optional: (prop.flags & ts.SymbolFlags.Optional) !== 0,
        ...(propTypeDef && { definition: propTypeDef })
      };
    });
  }

  if (type.symbol && 
      (type.symbol.name.includes('Partial') || type.symbol.name.includes('Omit'))) {
    const typeArguments = type.resolvedTypeArguments || type.typeArguments;
    if (typeArguments) {
      return {
        type: checker.typeToString(type),
        typeArguments: typeArguments.map(t => getTypeDefinition(t, null, checker))
      };
    }
  }

  return Object.keys(properties).length > 0 ? { properties } : null;
}

async function parseTypeDefinitions(program, checker) {
  const typeMap = new Map();

  return {
    getTypeInfo: (typeName) => {
      if (typeName.includes('&') || typeName.includes('Partial<') || typeName.includes('Omit<')) {
        const type = checker.getTypeAtLocation(
          ts.createSourceFile('temp.ts', `type Temp = ${typeName}`, ts.ScriptTarget.Latest)
        );
        return getTypeDefinition(type, null, checker);
      }

      if (typeMap.has(typeName)) {
        return typeMap.get(typeName);
      }

      for (const sourceFile of program.getSourceFiles()) {
        if (!sourceFile.isDeclarationFile) {
          ts.forEachChild(sourceFile, node => {
            if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
              if (node.name.text === typeName) {
                const type = checker.getTypeAtLocation(node);
                const typeInfo = getTypeDefinition(type, node, checker);
                
                const jsDocComment = getJSDocComment(node);
                
                const finalTypeInfo = {
                  ...(jsDocComment && { description: jsDocComment }),
                  kind: ts.isTypeAliasDeclaration(node) ? 'type' : 'interface',
                  ...(typeInfo || {})
                };

                if (Object.keys(finalTypeInfo).length > 0) {
                  typeMap.set(typeName, finalTypeInfo);
                }
                return finalTypeInfo;
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
    const typeDefinitions = new Map();
    const usedTypes = new Set();

    for (const pattern of inputPatterns) {
      const files = await getInputFiles(pattern);
      files.forEach(file => allFiles.add(file));
    }

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

    const program = ts.createProgram(Array.from(allFiles), compilerOptions);
    const checker = program.getTypeChecker();
    const typeParser = await parseTypeDefinitions(program, checker);
    const result = {};

    // 首先收集所有类型定义
    for (const file of allFiles) {
      const sourceFile = program.getSourceFile(file);
      if (sourceFile) {
        ts.forEachChild(sourceFile, node => {
          if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
            const typeName = node.name.text;
            const typeInfo = typeParser.getTypeInfo(typeName);
            if (typeInfo) {
              typeDefinitions.set(typeName, typeInfo);
            }
          }
        });
      }
    }

    // 递归收集类型依赖
    function collectTypeDependencies(typeInfo) {
      if (!typeInfo) return;

      function processType(type) {
        if (typeof type === 'string' && !type.startsWith('"') && 
            !type.match(/^(string|number|boolean|any|object|unknown|void|null|undefined|never)$/)) {
          usedTypes.add(type);
          const dependentType = typeDefinitions.get(type);
          if (dependentType && !processedTypes.has(type)) {
            processedTypes.add(type);
            collectTypeDependencies(dependentType);
          }
        }
      }

      const processedTypes = new Set();

      if (typeInfo.type) {
        processType(typeInfo.type);
      }

      if (typeInfo.properties) {
        Object.values(typeInfo.properties).forEach(prop => {
          processType(prop.type);
          if (prop.definition) {
            collectTypeDependencies(prop.definition);
          }
        });
      }

      if (typeInfo.types) {
        typeInfo.types.forEach(processType);
      }
    }

    // 解析组件
    for (const file of allFiles) {
      const relativePath = path.relative(process.cwd(), file);
      
      if (file.endsWith('.tsx')) {
        const parserOptions = {
          savePropValueAsString: true,
          shouldExtractLiteralValuesFromEnum: true,
          shouldRemoveUndefinedFromOptional: true,
          propFilter: {
            skipPropsWithoutDoc: false,
          },
        };

        const componentInfo = parse(file, parserOptions);

        if (componentInfo.length > 0) {
          const components = componentInfo.map(info => {
            const props = Object.entries(info.props || {}).reduce((acc, [propName, prop]) => {
              let typeInfo = {
                name: prop.type.name,
                raw: prop.type.raw
              };

              if (prop.type.name.includes('&')) {
                const type = checker.getTypeAtLocation(
                  ts.createSourceFile('temp.ts', `type Temp = ${prop.type.name}`, ts.ScriptTarget.Latest)
                );
                const definition = getTypeDefinition(type, null, checker);
                if (definition) {
                  typeInfo.definition = definition;
                }
              } else {
                const propTypeInfo = typeDefinitions.get(prop.type.name);
                if (propTypeInfo) {
                  typeInfo.definition = propTypeInfo;
                  collectTypeDependencies(propTypeInfo);
                }
              }

              acc[propName] = {
                defaultValue: prop.defaultValue,
                description: prop.description,
                name: propName,
                required: prop.required,
                type: typeInfo
              };
              return acc;
            }, {});

            return {
              displayName: info.displayName,
              description: info.description,
              props
            };
          });

          result[relativePath] = { components };
        }
      }
    }

    // 添加所有使用到的类型定义
    for (const file of allFiles) {
      const relativePath = path.relative(process.cwd(), file);
      const sourceFile = program.getSourceFile(file);
      
      if (sourceFile) {
        const types = {};
        ts.forEachChild(sourceFile, node => {
          if ((ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) && 
              usedTypes.has(node.name.text)) {
            const typeInfo = typeDefinitions.get(node.name.text);
            if (typeInfo) {
              types[node.name.text] = typeInfo;
            }
          }
        });

        if (Object.keys(types).length > 0) {
          result[relativePath] = {
            ...(result[relativePath] || {}),
            types
          };
        }
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
