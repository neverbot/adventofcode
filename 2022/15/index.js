// 30373
// 25512
// 65332
// 33549
// 35390

import { readFile } from 'fs/promises';
// import * as scanf from 'scanf';

const INPUT_FILE_NAME = 'input.txt';

let gridSize = 0;
let grid = [];

function checkVisibility(i, j) {
  let value = grid[i][j];
  let north = true,
    south = true,
    west = true,
    east = true;

  // trees in the border always has visibility
  if (i == 0 || i == gridSize - 1 || j == 0 || j == gridSize - 1) {
    return true;
  }

  // NORTH
  for (let a = 0; a < i; a++) {
    // console.log(' comparamos con ' + a + ' ' + j + ' que es un ' + grid[a][j]);
    if (grid[a][j] >= value) {
      north = false;
    }
  }

  // SOUTH
  for (let a = i + 1; a < gridSize; a++) {
    if (grid[a][j] >= value) {
      south = false;
    }
  }

  // WEST
  for (let a = 0; a < j; a++) {
    if (grid[i][a] >= value) {
      west = false;
    }
  }

  // EAST
  for (let a = j + 1; a < gridSize; a++) {
    if (grid[i][a] >= value) {
      east = false;
    }
  }

  return north || south || west || east;
}

(async () => {
  const inputFilePath = new URL(`./${INPUT_FILE_NAME}`, import.meta.url);
  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  let lines = fileContents.split(/\r?\n/);
  let total = 0;

  gridSize = lines[0].length;

  // build a grid (array of arrays) with every character
  for (let i = 0; i < gridSize; i++) {
    grid.push([]);

    for (let j = 0; j < lines[i].length; j++) {
      grid[i].push(lines[i][j]);
    }
  }

  console.info(grid);

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let res = checkVisibility(i, j);
      // console.log(' vis ' + i + ' ' + j + ' = ' + res);

      if (res) total += 1;
    }
  }

  console.log('Total tress with visibility: ' + total);
})();
