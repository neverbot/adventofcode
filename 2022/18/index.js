import { readFile } from 'fs/promises';
import * as scanf from 'scanf';

const INPUT_FILE_NAME = 'input.txt';

let grid = [];
let knots = [];
let NUMBER_OF_KNOTS = 10;

function initilizeKnots(size, init_x, init_y) {
  for (let i = 0; i < size; i++) {
    knots.push({ x: init_x, y: init_y, name: i });
  }

  console.info(knots);
}

function moveKnot(i) {
  console.log('move knot ' + i);

  // same row
  if (knots[i - 1].x === knots[i].x) {
    if (knots[i - 1].y >= knots[i].y + 2) knots[i].y++;
    if (knots[i - 1].y <= knots[i].y - 2) knots[i].y--;
  }
  // same col
  else if (knots[i - 1].y === knots[i].y) {
    if (knots[i - 1].x >= knots[i].x + 2) knots[i].x++;
    if (knots[i - 1].x <= knots[i].x - 2) knots[i].x--;
  }
  // diagonal
  else if (
    knots[i - 1].x >= knots[i].x + 2 ||
    knots[i - 1].y >= knots[i].y + 2 ||
    knots[i - 1].x <= knots[i].x - 2 ||
    knots[i - 1].y <= knots[i].y - 2
  ) {
    if (knots[i - 1].x < knots[i].x && knots[i - 1].y < knots[i].y) {
      knots[i].x--;
      knots[i].y--;
    } else if (knots[i - 1].x < knots[i].x && knots[i - 1].y > knots[i].y) {
      knots[i].x--;
      knots[i].y++;
    } else if (knots[i - 1].x > knots[i].x && knots[i - 1].y > knots[i].y) {
      knots[i].x++;
      knots[i].y++;
    } else if (knots[i - 1].x > knots[i].x && knots[i - 1].y < knots[i].y) {
      knots[i].x++;
      knots[i].y--;
    }
  }
}

function moveHead(direction, value) {
  for (let i = 0; i < value; i++) {
    switch (direction) {
      case 'U':
        knots[0].x++;
        break;
      case 'D':
        knots[0].x--;
        break;
      case 'L':
        knots[0].y--;
        break;
      case 'R':
        knots[0].y++;
        break;
    }

    for (let knot in knots) {
      // the head has already moved
      if (knot == 0) continue;
      moveKnot(knot);
    }

    grid[knots[NUMBER_OF_KNOTS - 1].x][knots[NUMBER_OF_KNOTS - 1].y] = '#';
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
  initilizeKnots(NUMBER_OF_KNOTS, 0 + -min_i, 0 + -min_j);

  console.log('Grid size: ' + min_i + ' to ' + max_i + ', ' + min_j + ' to ' + max_j);
  console.log('Initial center: ' + knots[0].x + ', ' + knots[0].y);

  // initialize grid
  for (i = 0; i < max_i + -min_i + 1; i++) {
    grid[i] = [];
    for (j = 0; j < max_j + -min_j + 1; j++) {
      grid[i].push('.');
    }
  }

  grid[knots[0].x][knots[0].y] = 's';

  console.info(grid);

  // read the file again, now with the grid already created
  for (let line of lines) {
    let values = scanf.sscanf(line, '%s %S', 'direction', 'number');
    values.number = parseInt(values.number);

    moveHead(values.direction, values.number);
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
