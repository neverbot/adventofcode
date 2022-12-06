import { readFile } from 'fs/promises';

const INPUT_FILE_NAME = 'input.txt';

function allDifferent(string) {
  for (let i = 0; i < string.length - 1; i++) {
    // console.log('is ' + string[i] + ' inside ' + string.slice(i + 1));
    if (string.slice(i + 1).includes(string[i])) return false;
  }

  return true;
}

(async () => {
  const inputFilePath = new URL(`./${INPUT_FILE_NAME}`, import.meta.url);
  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  let line = fileContents.split(/\r?\n/)[0];
  // console.log(line);

  let i;

  for (i = 0; i < line.length - 1; i++) {
    // console.log('check: ' + line.slice(i, i + 4));
    if (allDifferent(line.slice(i, i + 4))) {
      break;
    }
  }

  console.log('First marker after character: ' + (i + 4));
})();
