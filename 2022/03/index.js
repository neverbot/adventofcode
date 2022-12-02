import { access, readFile } from 'fs/promises';

const INPUT_FILE_NAME = 'input.txt';

(async () => {
  const inputFilePath = new URL(`./${INPUT_FILE_NAME}`, import.meta.url);

  try {
    await access(inputFilePath);
  } catch {
    console.error(inputFilePath + ' file could not be found');
    process.exit(1);
  }

  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  const lines = fileContents.split(/\r?\n/);

  let round = [];
  let counter = 1;
  let total = 0;

  let me, them;

  for (let line of lines) {
    round = line.split(' ');

    if (round.length != 2) {
      console.error('wrong input line');
      process.exit(1);
    }

    them = round[0];
    me = round[1];

    // to make it easier to understand, let's use the same symbol for the moves
    if (me == 'X') me = 'A';
    if (me == 'Y') me = 'B';
    if (me == 'Z') me = 'C';

    console.log(counter + ' - This round is, oponent: ' + them + ', me: ' + me);
    counter++;

    // points
    switch (me) {
      case 'A': // X
        total += 1;
        if (me == them) total += 3; // draw
        if (them == 'C') total += 6; // win
        break;
      case 'B': // Y
        total += 2;
        if (me == them) total += 3; // draw
        if (them == 'A') total += 6; // win
        break;
      case 'C': // Z
        total += 3;
        if (me == them) total += 3; // draw
        if (them == 'B') total += 6; // win
        break;
    }
  }

  // // the input.txt file includes an empty line at the end
  // // if it wouldn't include it, here we'll have to
  // // push de last value to the array

  // console.log('Number of elves: ' + elvesList.length);

  // elvesList = elvesList.sort((a, b) => {
  //   return b - a;
  // });

  // // console.log(elvesList);

  // const topThreeElves = elvesList[0] + elvesList[1] + elvesList[2];

  console.log('Total points: ' + total);
})();