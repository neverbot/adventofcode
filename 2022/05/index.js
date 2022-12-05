import { readFile } from 'fs/promises';

const INPUT_FILE_NAME = 'input.txt';

function findRepeated(A, B) {
  for (let charA of A) {
    for (let charB of B) {
      if (charA === charB) return charA;
    }
  }
}

function charValue(A) {
  let value = A.charCodeAt(0);

  // chars a..z go from 97 to 122, have to be 1 to 26
  if (value >= 97) value -= 96;
  // chars A..Z starts in 65... we have to add the first 26 in lower case to get the new code
  else value = value - 64 + 26;
  console.log(A, value);

  return value;
}

(async () => {
  const inputFilePath = new URL(`./${INPUT_FILE_NAME}`, import.meta.url);
  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  const lines = fileContents.split(/\r?\n/);

  let firstHalf, secondHalf;
  let repeatedChar;
  let total = 0;

  for (let line of lines) {
    firstHalf = line.substring(0, line.length / 2);
    secondHalf = line.substring(line.length / 2, line.length);
    // console.log(line, firstHalf, secondHalf);

    repeatedChar = findRepeated(firstHalf, secondHalf);
    // console.log(repeatedChar);

    total += charValue(repeatedChar);

    /*
    if (round.length != 2) {
      console.error('wrong input line');
      process.exit(1);
    }

    them = round[0];
    me = round[1];

    // X means the result has to be a lose for me
    // Y means the result has to be a draw
    // Z means the result has to be a win for me
    switch (me) {
      case 'X':
        if (them == 'A') me = 'C';
        if (them == 'B') me = 'A';
        if (them == 'C') me = 'B';
        break;
      case 'Y': // Y
        me = them;
        // if (them == 'A') me = '';
        // if (them == 'B') me = '';
        // if (them == 'C') me = '';
        break;
      case 'Z': // Z
        if (them == 'A') me = 'B';
        if (them == 'B') me = 'C';
        if (them == 'C') me = 'A';
        break;
    }

    console.log(counter + ' - This round has to be, oponent: ' + them + ', me: ' + me);
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
    */
  }

  console.log('Total points: ' + total);
})();
