import { access, readFile } from 'fs/promises';

const inputFileName = 'input.txt';

(async () => {
  const inputFilePath = new URL(`./${inputFileName}`, import.meta.url);

  try {
    await access(inputFilePath);
  } catch {
    console.error(inputFilePath + ' file could not be found');
    process.exit(1);
  }

  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  const lines = fileContents.split(/\r?\n/);
  let i = 0;

  // convert strings to numbers
  for (i = 0; i <= lines.length - 1; i++) {
    lines[i] = parseInt(lines[i]);
  }
  // console.log(lines, lines.length);

  let windows = [];

  for (i = 0; i <= lines.length - 3; i++) {
    windows.push(lines[i] + lines[i + 1] + lines[i + 2]);
  }
  // console.log(windows);

  let last = Number.MAX_VALUE;
  let result = 0;

  for (let w of windows) {
    if (w > last) {
      result++;
    }

    last = w;
  }

  console.log(result);
})();
