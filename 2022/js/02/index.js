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

  let currentElf = 0;
  let elvesList = [];

  for (let line of lines) {
    if (line.length == 0) {
      elvesList.push(currentElf);
      currentElf = 0;
    } else {
      currentElf += parseInt(line);
    }
  }

  // the input.txt file includes an empty line at the end
  // if it wouldn't include it, here we'll have to
  // push de last value to the array

  console.log('Number of elves: ' + elvesList.length);

  elvesList = elvesList.sort((a, b) => {
    return b - a;
  });

  // console.log(elvesList);

  const topThreeElves = elvesList[0] + elvesList[1] + elvesList[2];

  console.log('Total calories from the top three elves: ' + topThreeElves);
})();
