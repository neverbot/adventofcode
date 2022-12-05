import { readFile } from 'fs/promises';

import * as scanf from 'scanf';

const INPUT_FILE_NAME = 'input.txt';

// global!!
let stacks = [];

function moveCrates(howMany, from, to) {
  let i, crate;

  from = parseInt(from) - 1;
  to = parseInt(to) - 1;

  for (i = 0; i < howMany; i++) {
    crate = stacks[from].pop();
    stacks[to].push(crate);
  }
}

(async () => {
  const inputFilePath = new URL(`./${INPUT_FILE_NAME}`, import.meta.url);
  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  const lines = fileContents.split(/\r?\n/);

  let i, j;
  let emptyLineIndex = 0;

  // find end of initial crate configuration
  for (emptyLineIndex = 0; emptyLineIndex < lines.length - 1; emptyLineIndex++) {
    // end parsing initial crate configuration
    if (lines[emptyLineIndex].length === 0) {
      break;
    }
  }

  // calculate number of stacks
  let numStacks = lines[emptyLineIndex - 1].split(' ').filter((e) => e.length > 0).length;
  console.log('Num Stacks: ' + numStacks);

  // Init stacks as empty strings
  for (i = 0; i < numStacks; i++) {
    stacks[i] = [];
  }
  // console.log('Stacks: ' + stacks);

  for (i = emptyLineIndex - 2; i >= 0; i--) {
    // console.log(lines[i]);
    for (j = 0; j < numStacks; j++) {
      let crate = lines[i][j * 4 + 1];
      // console.log(crate);
      if (crate != ' ') {
        stacks[j].push(crate);
      }
    }
  }

  console.info(stacks);

  for (i = emptyLineIndex + 1; i < lines.length; i++) {
    console.log(lines[i]);

    let values = scanf.sscanf(lines[i], 'move %d from %d to %d', 'howMany', 'from', 'to');

    moveCrates(values.howMany, values.from, values.to);
    // console.info(stacks);
  }

  console.info(stacks);

  let result = '';

  for (i = 0; i < numStacks; i++) {
    if (stacks[i].length === 0) {
      result += ' ';
    } else {
      result += stacks[i].pop();
    }
  }

  console.log('Final stack state: ' + result);
})();
