import { readFile } from 'fs/promises';

const INPUT_FILE_NAME = 'input.txt';

(async () => {
  const inputFilePath = new URL(`./${INPUT_FILE_NAME}`, import.meta.url);
  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  const lines = fileContents.split(/\r?\n/);

  let firstElf, secondElf;
  let firstStart, firstEnd, secondStart, secondEnd;

  let total = 0;

  for (let line of lines) {
    [firstElf, secondElf] = line.split(',');
    // console.log(firstElf, secondElf);
    [firstStart, firstEnd] = firstElf.split('-');
    [secondStart, secondEnd] = secondElf.split('-');
    // console.log(firstStart, firstEnd, secondStart, secondEnd);

    firstStart = parseInt(firstStart);
    firstEnd = parseInt(firstEnd);
    secondStart = parseInt(secondStart);
    secondEnd = parseInt(secondEnd);

    // find no overlapping assignments
    if (firstEnd < secondStart || firstStart > secondEnd) {
      console.log('❌', firstStart, firstEnd, secondStart, secondEnd);
    } else {
      console.log('✅', firstStart, firstEnd, secondStart, secondEnd);
      total += 1;
    }
  }

  console.log('Total: ' + total);
})();
