// 30373
// 25512
// 65332
// 33549
// 35390

import { readFile } from 'fs/promises';
import * as scanf from 'scanf';

const INPUT_FILE_NAME = 'input.txt';

let grid = [];
let head_x = 0;
let head_y = 0;
let tail_x = 0;
let tail_y = 0;

function moveCursor(direction, value) {
  for (let i = 0; i < value; i++) {
    switch (direction) {
      case 'U':
        head_x++;
        break;
      case 'D':
        head_x--;
        break;
      case 'L':
        head_y--;
        break;
      case 'R':
        head_y++;
        break;
    }

    // position of the head
    // grid[head_x][head_y] = '#';

    // position of the tail

    // same row
    if (head_x === tail_x) {
      if (head_y >= tail_y + 2) tail_y++;
      if (head_y <= tail_y - 2) tail_y--;
    }
    // same col
    else if (head_y === tail_y) {
      if (head_x >= tail_x + 2) tail_x++;
      if (head_x <= tail_x - 2) tail_x--;
    }
    // diagonal
    else if (
      head_x >= tail_x + 2 ||
      head_y >= tail_y + 2 ||
      head_x <= tail_x - 2 ||
      head_y <= tail_y - 2
    ) {
      if (head_x < tail_x && head_y < tail_y) {
        tail_x--;
        tail_y--;
      } else if (head_x < tail_x && head_y > tail_y) {
        tail_x--;
        tail_y++;
      } else if (head_x > tail_x && head_y > tail_y) {
        tail_x++;
        tail_y++;
      } else if (head_x > tail_x && head_y < tail_y) {
        tail_x++;
        tail_y--;
      }
    }

    grid[tail_x][tail_y] = '#';
  }
}

(async () => {
  const inputFilePath = new URL(`./${INPUT_FILE_NAME}`, import.meta.url);
  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  let lines = fileContents.split(/\r?\n/);
  // let highScore = 0;

  // first let's calculate the grid size
  let i = 0,
    j = 0,
    max_i = 0,
    min_i = 0,
    max_j = 0,
    min_j = 0;

  for (let line of lines) {
    let values = scanf.sscanf(line, '%s %S', 'direction', 'number');

    values.number = parseInt(values.number);

    switch (values.direction) {
      case 'U':
        i += values.number;
        break;
      case 'D':
        i -= values.number;
        break;
      case 'L':
        j -= values.number;
        break;
      case 'R':
        j += values.number;
        break;
    }

    if (i > max_i) max_i = i;
    if (i < min_i) min_i = i;
    if (j > max_j) max_j = j;
    if (j < min_j) min_j = j;
  }

  // initial position inside the grid
  head_x = 0 + -min_i; // rows
  head_y = 0 + -min_j; // cols
  tail_x = head_x;
  tail_y = head_y;

  console.log('Grid size: ' + min_i + ' to ' + max_i + ', ' + min_j + ' to ' + max_j);
  console.log('Initial center: ' + head_x + ', ' + head_y);

  // initialize grid
  for (i = 0; i < max_i + -min_i + 1; i++) {
    grid[i] = [];
    for (j = 0; j < max_j + -min_j + 1; j++) {
      grid[i].push('.');
    }
  }

  grid[head_x][head_y] = 's';

  console.info(grid);

  // read the file again, now with the grid already created
  for (let line of lines) {
    let values = scanf.sscanf(line, '%s %S', 'direction', 'number');
    values.number = parseInt(values.number);

    moveCursor(values.direction, values.number);
  }

  console.info(grid);

  let result = 0;

  for (let pos_x in grid) {
    for (let pos_y in grid[pos_x]) {
      if (grid[pos_x][pos_y] === '#') {
        result++;
      }
    }
  }

  console.log('Tail visited positions: ' + result);
})();
