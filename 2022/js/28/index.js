import { readInputFile, sleep, options } from './utils.js';
// import * as scanf from 'scanf';
import termkit from 'terminal-kit';
const terminal = termkit.terminal;

let blocked = [];
let min_x = Infinity,
  max_x = 0,
  min_y = Infinity,
  max_y = 0;

let map = [];
let origin = 500;

function drawMap(scroll = false) {
  let lines = 1;
  let result = '\n ';

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      result += map[i][j];
    }
    result += '\n ';
    lines++;
  }

  if (scroll) terminal.up(lines);
  terminal(result);
}

function countPositions(char) {
  let result = 0;

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === char) result++;
    }
  }

  return result;
}

function setMap(position, value) {
  if (position[0] < 0) return;
  if (position[1] < 0) return;
  map[position[1]][position[0]] = value;
}

function growMap(direction) {
  if (direction == 'left') {
    for (let i = 0; i < map.length; i++) {
      map[i] = ['.'].concat(map[i]);
    }
    map[map.length - 1][0] = '#';
    origin++;
  } else if (direction == 'right') {
    for (let i = 0; i < map.length; i++) {
      map[i] = map[i].concat(['.']);
    }
    map[map.length - 1][map[0].length - 1] = '#';
  }
}

function getMapPosition(position) {
  // won't happen now
  if (position[1] >= map.length) return 'out';

  // if (position[0] < 0) return 'out';
  // if (position[0] >= map[0].length) return 'out';
  if (position[0] < 0) growMap('left');
  if (position[0] >= map[0].length) growMap('right');

  if (map[position[1]][position[0]] == '.') return 'free';
  if (map[position[1]][position[0]] == '#') return 'blocked';

  return false;
}

function linePositions(origin, destination) {
  let result = [];

  // console.info(origin, destination);

  // vertical line
  if (origin[0] == destination[0]) {
    if (origin[1] > destination[1]) {
      let tmp = destination;
      destination = origin;
      origin = tmp;
    }

    for (let i = origin[1]; i < destination[1] + 1; i++) {
      result.push([origin[0], i]);
    }
  }
  // horizontal line
  else if (origin[1] == destination[1]) {
    if (origin[0] > destination[0]) {
      let tmp = destination;
      destination = origin;
      origin = tmp;
    }

    for (let i = origin[0]; i < destination[0] + 1; i++) {
      result.push([i, origin[1]]);
    }
  }
  // console.info(result);
  return result;
}

(async () => {
  let lines = await readInputFile();

  // read every coordinate, and find the min and max values for x,y
  for (let i = 0; i < lines.length; i++) {
    console.log(lines[i]);
    let pairs = lines[i].split(' -> ');
    let lastPair = null;

    for (let j = 0; j < pairs.length; j++) {
      let coords = pairs[j].split(',');

      coords[0] = parseInt(coords[0]);
      coords[1] = parseInt(coords[1]);

      if (coords[0] > max_x) max_x = coords[0];
      if (coords[0] < min_x) min_x = coords[0];
      if (coords[1] > max_y) max_y = coords[1];
      if (coords[1] < min_y) min_y = coords[1];

      if (lastPair == null) {
        lastPair = coords;
      } else {
        blocked = blocked.concat(linePositions(lastPair, coords));
        lastPair = coords;
      }
    }
  }

  console.log(blocked, min_x, max_x, min_y, max_y);

  // map bottom
  for (let i = min_x; i <= max_x; i++) {
    blocked.push([i, max_y + 2]);
  }
  max_y += 2;

  // initialize empty map
  for (let i = max_y; i >= 0; i--) {
    let row = [];
    for (let j = min_x; j <= max_x; j++) {
      row.push('.');
    }
    map.push(row);
  }

  // drawMap();

  // insert every coordinate in the map
  for (let i = 0; i < blocked.length; i++) {
    // console.log(
    //   'convert ' +
    //     blocked[i][0] +
    //     ',' +
    //     blocked[i][1] +
    //     ' to ' +
    //     (blocked[i][0] - min_x) +
    //     ',' +
    //     blocked[i][1]
    // );
    map[blocked[i][1]][blocked[i][0] - min_x] = '#';
  }

  drawMap();

  // test
  // for (let i = 0; i < 4; i++) {
  //   await sleep(500);
  //   map[i][4] = 'A';
  //   drawMap(true);
  // }

  let current = [origin - min_x, -1];
  let lastPosition = null;
  let next = null;

  while (next != 'out') {
    if (map[0][origin - min_x] == 'o') {
      break;
    }

    current = [origin - min_x, -1];

    // while sand has moved
    while (lastPosition == null || current[0] != lastPosition[0] || current[1] != lastPosition[1]) {
      if (options.step && options.step != 0) {
        drawMap(true);
        await sleep(options.step);
      }

      lastPosition = [...current];

      // down if able
      if ((next = getMapPosition([current[0], current[1] + 1]) == 'free')) {
        setMap(current, '.');
        current[1] = current[1] + 1;
        setMap(current, 'o');
      }
      // down-left if able
      else if (
        next != 'out' &&
        (next = getMapPosition([current[0] - 1, current[1] + 1])) == 'free'
      ) {
        setMap(current, '.');
        current[1] = current[1] + 1;
        current[0] = current[0] - 1;
        setMap(current, 'o');
      }
      // down-right if able
      else if (
        next != 'out' &&
        (next = getMapPosition([current[0] + 1, current[1] + 1])) == 'free'
      ) {
        setMap(current, '.');
        current[1] = current[1] + 1;
        current[0] = current[0] + 1;
        setMap(current, 'o');
      }

      if (next == 'out') {
        setMap(current, '.');
      }

      // console.log(lastPosition, current);
    }
  }

  drawMap(options.step && options.step > 0 ? true : false);

  console.log('\nNumber of sand positions: ' + countPositions('o'));
})();
