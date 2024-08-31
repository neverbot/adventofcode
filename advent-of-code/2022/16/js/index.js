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

function scenicScore(i, j) {
  // console.log('CHECK ' + i + ' ' + j + ' que es un ' + grid[i][j]);
  let value = grid[i][j];
  let north = 0,
    south = 0,
    west = 0,
    east = 0;

  // trees in the border has at least one 0
  // as the score is calculated multiplying, the result will be 0
  if (i == 0 || i == gridSize - 1 || j == 0 || j == gridSize - 1) {
    return 0;
  }

  // NORTH
  for (let a = i - 1; a >= 0; a--) {
    // console.log(' comparamos con ' + a + ' ' + j + ' que es un ' + grid[a][j]);
    north++;
    if (grid[a][j] >= value) {
      break;
    }
  }

  // SOUTH
  for (let a = i + 1; a < gridSize; a++) {
    // console.log(' comparamos con ' + a + ' ' + j + ' que es un ' + grid[a][j]);
    south++;
    if (grid[a][j] >= value) {
      break;
    }
  }

  // WEST
  for (let a = j - 1; a >= 0; a--) {
    // console.log(' comparamos con ' + i + ' ' + a + ' que es un ' + grid[i][a]);
    west++;
    if (grid[i][a] >= value) {
      break;
    }
  }

  // EAST
  for (let a = j + 1; a < gridSize; a++) {
    // console.log(' comparamos con ' + i + ' ' + a + ' que es un ' + grid[i][a]);
    east++;
    if (grid[i][a] >= value) {
      break;
    }
  }

  // console.log(north, south, west, east);
  return north * south * west * east;
}

(async () => {
  const inputFilePath = new URL(`./${INPUT_FILE_NAME}`, import.meta.url);
  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  let lines = fileContents.split(/\r?\n/);
  let highScore = 0;

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
      let res = scenicScore(i, j);
      console.log(' score ' + i + ' ' + j + ' = ' + res);
      if (res > highScore) highScore = res;
    }
  }

  console.log('Higher scenic score: ' + highScore);
})();
