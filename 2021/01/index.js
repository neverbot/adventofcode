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
  // console.log(fileContents);

  // const fileContents = await import(inputFilePath, {
  //   assert: { type: 'json' },
  // });

  const lines = fileContents.split(/\r?\n/);

  let last = Number.MAX_VALUE;
  let result = 0;

  for (let line of lines) {
    let number = parseInt(line);

    if (number > last) {
      result++;
    }

    last = number;
  }

  console.log(result);
})();
