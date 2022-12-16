import { readFile } from 'fs/promises';
import colors from 'colors';

import commandLineArgs from 'command-line-args';
import commandLineUsage from 'command-line-usage';

// const INPUT_FILE_NAME = 'input.txt';

const optionDefinitions = [
  { name: 'input', alias: 'i', type: String, description: 'File used as input' },
  { name: 'step', alias: 's', type: String, description: 'Step time in milliseconds' },
  { name: 'help', alias: 'h', type: Boolean, description: 'Display this usage guide.' },
];

let options;

async function readInputFile() {
  options = commandLineArgs(optionDefinitions);
  // console.log(options);

  if (!options.input || options.help) {
    const usage = commandLineUsage([
      {
        header: 'Typical Usage',
        content: 'node index.js --input input.txt',
      },
      {
        header: 'Options',
        optionList: optionDefinitions,
      },
      {
        content: 'Project home: {underline https://github.com/neverbot/advent-of-code}',
      },
    ]);

    console.log(usage);

    // end
    process.exit(1);
  }

  const inputFilePath = new URL(`./${options.input}`, import.meta.url);
  console.log('\nReading input file: ' + colors.cyan(options.input) + '\n');

  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  return fileContents.split(/\r?\n/);
}

async function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export { readInputFile, sleep, options };
