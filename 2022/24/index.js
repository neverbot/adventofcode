import { readFile } from 'fs/promises';
// import * as scanf from 'scanf';
import colors from 'colors';

const INPUT_FILE_NAME = 'input.txt';

// matrix of objects { char: a, height: 0 }
let map = [];
let currentOrigin = null;
let availableOrigins = [];
let destination = { x: 0, y: 0 };

let current;
let openList;
let closedList;

function drawMap() {
  console.log('currentOrigin: ' + currentOrigin.x + ', ' + currentOrigin.y);
  console.log('Destination: ' + destination.x + ', ' + destination.y);

  let str = '\n ';

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (y == currentOrigin.y && x == currentOrigin.x) {
        str += colors.green(map[y][x].char);
      } else if (y == destination.y && x == destination.x) {
        str += colors.cyan(map[y][x].char);
      } else {
        str += map[y][x].char;
      }
    }
    str += '\n ';
  }

  console.log(str);
  str = '\n';

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (y == currentOrigin.y && x == currentOrigin.x) {
        str += colors.green(map[y][x].height.toString().padStart(2, ' '));
      } else if (y == destination.y && x == destination.x) {
        str += colors.cyan(map[y][x].height.toString().padStart(2, ' '));
      } else {
        str += map[y][x].height.toString().padStart(2, ' ');
      }

      str += ' ';
    }
    str += '\n';
  }

  console.log(str);
}

function availableDirections(x, y) {
  let height = map[y][x].height;
  let result = [];

  if (y > 0 && height + 1 >= map[y - 1][x].height) result.push('UP');
  if (y < map.length - 1 && height + 1 >= map[y + 1][x].height) result.push('DOWN');
  if (x < map[y].length - 1 && height + 1 >= map[y][x + 1].height) result.push('RIGHT');
  if (x > 0 && height + 1 >= map[y][x - 1].height) result.push('LEFT');

  return result;
}

function distance(A, B) {
  // euclidean distance
  // return Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));

  // manhattan distance
  return Math.abs(B.x - A.x) + Math.abs(B.y - A.y);
}

// function distanceComparison(A, B) {
//   return distance(A, destination) - distance(B, destination);
// }

function inClosedList(x, y) {
  for (let i = 0; i < closedList.length; i++) {
    if (closedList[i].x == x && closedList[i].y == y) return true;
  }
  return false;
}

function inOpenList(x, y) {
  for (let i = 0; i < openList.length; i++) {
    if (openList[i].x == x && openList[i].y == y) return true;
  }
  return false;
}

function resetMap() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].f = Infinity;
      map[y][x].g = Infinity;
      map[y][x].h = Infinity;
      map[y][x].parent = null;
    }
  }
}

(async () => {
  const inputFilePath = new URL(`./${INPUT_FILE_NAME}`, import.meta.url);
  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  let lines = fileContents.split(/\r?\n/);

  for (let y = 0; y < lines.length; y++) {
    let row = [];

    for (let x = 0; x < lines[y].length; x++) {
      let height = 0;
      // save currentOrigin and destination position, and change for their real heights
      if (lines[y][x] === 'S') {
        currentOrigin = { x, y };
        availableOrigins.push(currentOrigin);
        height = 'a'.charCodeAt(0) - 97;
      } else if (lines[y][x] === 'E') {
        destination = { x, y };
        height = 'z'.charCodeAt(0) - 97;
      } else {
        if (lines[y][x] === 'a') availableOrigins.push({ x, y });
        height = lines[y].charCodeAt(x) - 97;
      }

      row.push({
        char: lines[y][x],
        height,
        f: Infinity,
        g: Infinity,
        h: Infinity,
        parent: null,
        x,
        y,
      });
    }
    map.push(row);
  }

  drawMap();
  console.info(availableOrigins);

  let minimalResult = Infinity;

  for (let i = 0; i < availableOrigins.length; i++) {
    resetMap();
    currentOrigin = availableOrigins[i];

    // start the algorithm
    current = map[currentOrigin.y][currentOrigin.x];
    map[currentOrigin.y][currentOrigin.x].g = 0;

    openList = [current];
    closedList = [];

    while (openList.length > 0) {
      // order list by lowest predicted total cost (f = g + h) to destination
      openList = openList.sort((A, B) => {
        A.f - B.f;
      });

      // console.info(openList);

      current = openList.shift();

      // if destination reached
      if (current.x == destination.x && current.y == destination.y) {
        let result = [current];
        let curr = current;
        while (curr.parent) {
          curr = map[curr.parent.y][curr.parent.x];
          result.push(map[curr.y][curr.x]);
        }

        console.info(
          'On step: ' +
            (result.length - 1) +
            ' we reached: ' +
            destination.x +
            ', ' +
            destination.y,
          result.reverse().map((elem) => {
            return { x: elem.x, y: elem.y };
          })
        );
        // console.info(result.reverse());

        if (result.length - 1 < minimalResult) minimalResult = result.length - 1;

        // next origin
        break;
      }

      // destination not yet reached, process the neighbors
      closedList.push(map[current.y][current.x]);

      let available = availableDirections(current.x, current.y)
        .map((elem) => {
          switch (elem) {
            case 'UP':
              return map[current.y - 1][current.x];
            case 'DOWN':
              return map[current.y + 1][current.x];
            case 'RIGHT':
              return map[current.y][current.x + 1];
            case 'LEFT':
              return map[current.y][current.x - 1];
          }
        })
        // sorted by distance to destination
        // .sort(distanceComparison)
        .sort((A, B) => {
          map[A.y][A.x].f - map[B.y][B.x].f;
        })
        // filter available movements removing already visited positions
        .filter((elem) => !inClosedList(elem.x, elem.y))
        .reverse();

      // console.info(
      //   colors.green('Visiting') + ': ' + current.x + ', ' + current.y,
      //   // map[current.y][current.x],
      //   available.map((elem) => {
      //     return { x: elem.x, y: elem.y, d: distance(elem, destination) };
      //   })
      // );

      available.forEach((elem) => {
        if (!inOpenList(elem.x, elem.y)) {
          map[elem.y][elem.x].h = distance(elem, destination);
          openList.push(map[elem.y][elem.x]);
        }

        if (map[elem.y][elem.x].g > map[current.y][current.x].g + 1) {
          map[elem.y][elem.x].parent = { x: current.x, y: current.y };
          map[elem.y][elem.x].g = map[current.y][current.x].g + 1;
          map[elem.y][elem.x].h = distance(elem, destination);
          map[elem.y][elem.x].f = map[elem.y][elem.x].g + map[elem.y][elem.x].h;
        }
      });
    }
  }

  console.log('Minimal result: ' + minimalResult);
})();
