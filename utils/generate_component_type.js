import { parse } from 'react-docgen-typescript';
import fs from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { glob } from 'glob';
import { promisify } from 'util';

const globPromise = promisify(glob);

async function getInputFiles(inputPattern) {
  // Check if the input is a direct file path
  if (existsSync(inputPattern) && (inputPattern.endsWith('.tsx') || inputPattern.endsWith('.jsx'))) {
    return [path.resolve(inputPattern)];
  }

  // Otherwise, treat as a glob pattern
  const files = await globPromise(inputPattern, {
    ignore: ['**/node_modules/**', '**/.git/**'],
    nodir: true,
  });

  return files.filter(file => /\.(tsx|jsx)$/.test(file)).map(file => path.resolve(file));
}

async function parseComponentTypes(input, outputPath) {
  try {
    // Handle multiple input patterns (comma-separated)
    const inputPatterns = input.split(',').map(p => p.trim());
    const allFiles = new Set();

    // Collect all matching files
    for (const pattern of inputPatterns) {
      const files = await getInputFiles(pattern);
      files.forEach(file => allFiles.add(file));
    }

    if (allFiles.size === 0) {
      console.warn('No matching files found for patterns:', inputPatterns);
      process.exit(0);
    }

    console.log('Found files:', Array.from(allFiles));

    const components = {};

    for (const file of allFiles) {
      try {
        const componentInfo = parse(file, {
          savePropValueAsString: true,
          shouldExtractLiteralValuesFromEnum: true,
          shouldRemoveUndefinedFromOptional: true,
        });

        if (componentInfo.length === 0) {
          console.log(`No components found in ${file}`);
          continue;
        }

        // Use relative path from current working directory as key
        const relativePath = path.relative(process.cwd(), file);
        components[relativePath] = componentInfo.map(info => ({
          displayName: info.displayName,
          description: info.description,
          props: info.props,
          methods: info.methods,
        }));

        console.log(`Successfully parsed ${relativePath}`);
      } catch (err) {
        console.warn(`Warning: Could not parse ${file}:`, {
          error: err.message,
          stack: err.stack,
        });
      }
    }

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }

    // Write results to output file
    await fs.writeFile(
      outputPath,
      JSON.stringify(components, null, 2),
      'utf8'
    );

    console.log(`Successfully generated component types at ${outputPath}`);
  } catch (error) {
    console.error('Error parsing component types:', error);
    process.exit(1);
  }
}

yargs(hideBin(process.argv))
  .command('parseType', 'Parse React component types', {
    input: {
      description: 'Input file pattern or specific file path(s). Multiple inputs can be comma-separated.',
      alias: 'i',
      type: 'string',
      demandOption: true,
      example: [
        'src/components/Button.tsx',
        'src/**/*.tsx',
        'src/components/Button.tsx,src/components/Input.tsx',
        'packages/*/src/**/*.tsx'
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
    ['$0 parseType -i "src/**/*.tsx" -o "types.json"', 'Parse all .tsx files in src directory and subdirectories'],
    ['$0 parseType -i "Button.tsx,Input.tsx" -o "types.json"', 'Parse multiple specific files'],
    ['$0 parseType -i "components/*.tsx,pages/**/*.tsx" -o "types.json"', 'Parse files matching multiple patterns']
  ])
  .help()
  .argv;
