import { readFile } from 'fs/promises';
// import * as scanf from 'scanf';
// import colors from 'colors';

const INPUT_FILE_NAME = 'input.txt';

let packets = [];

function parsePacket(line) {
  return JSON.parse(line);
}

function comparePackets(a, b) {
  console.info(a, b);

  let i = 0;

  for (i = 0; i < a.length; i++) {
    let left = a[i];
    let right = b[i];

    // right side run out of elements
    if (right === undefined) {
      return false;
    }

    // if both are numbers
    if (typeof left === 'number' && typeof right === 'number') {
      console.log('they are numbers ' + left + ' ' + right);
      if (left < right) return true;
      if (left > right) return false;
      continue;
    }

    // if both are lists
    if (left instanceof Array && right instanceof Array) {
      // if (typeof left === 'object' && typeof right === 'object') {
      console.log('they are arrays');
      let comparison = comparePackets(left, right);

      if (comparison === null) continue;
      return comparison;
    }
    // one is an array and the other one a number
    else if (left instanceof Array && typeof right === 'number') {
      return comparePackets(left, [right]);
    } else if (typeof left === 'number' && right instanceof Array) {
      return comparePackets([left], right);
    }
  }

  // left side run out of elements
  if (b.length > i) {
    return true;
  } else {
    return null;
  }
}

(async () => {
  const inputFilePath = new URL(`./${INPUT_FILE_NAME}`, import.meta.url);
  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  let lines = fileContents.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 3) {
    let leftPacket = lines[i];
    let rightPacket = lines[i + 1];

    console.info(leftPacket, rightPacket);

    packets.push(parsePacket(leftPacket));
    packets.push(parsePacket(rightPacket));

    // console.info(packets);
  }

  console.info(packets);

  let total = 0;

  for (let i = 0; i < packets.length; i += 2) {
    console.log('-- Packets ' + (i + 2) / 2 + '  -----------------------');
    let comparison = comparePackets(packets[i], packets[i + 1]);
    console.log('returned ' + comparison);
    if (comparison === true) {
      total += (i + 2) / 2;
    }
  }

  console.log('Sum of indices: ' + total);
})();
