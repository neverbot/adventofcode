import { readFile } from 'fs/promises';
// import * as scanf from 'scanf';
// import colors from 'colors';

const INPUT_FILE_NAME = 'input.txt';

let packets = [];

function parsePacket(line) {
  return JSON.parse(line);
}

function comparePackets(a, b) {
  // console.info(a, b);
  let i = 0;

  for (i = 0; i < a.length; i++) {
    let left = a[i];
    let right = b[i];

    // right side run out of elements
    if (right === undefined) {
      return 1;
    }

    // if both are numbers
    if (typeof left === 'number' && typeof right === 'number') {
      // console.log('they are numbers ' + left + ' ' + right);
      if (left < right) return -1;
      if (left > right) return 1;
      continue;
    }
    // if both are lists
    else if (typeof left === 'object' && typeof right === 'object') {
      // console.log('they are arrays');
      let comparison = comparePackets(left, right);
      if (comparison == null) continue;
      return comparison;
    }
    // one is an array and the other one a number
    else if (typeof left === 'number') {
      let comparison = comparePackets([left], right);
      if (comparison == null) continue;
      return comparison;
    } else {
      let comparison = comparePackets(left, [right]);
      if (comparison == null) continue;
      return comparison;
    }
  }

  // left side run out of elements
  if (b.length > i) {
    return -1;
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
  }

  packets.push([[2]]);
  packets.push([[6]]);

  // console.info(packets);

  packets.sort(comparePackets);

  console.info(packets);

  let position2 = -1;
  let str2 = JSON.stringify([[2]]);
  let position6 = -1;
  let str6 = JSON.stringify([[6]]);

  for (let i = 0; i < packets.length; i++) {
    let str = JSON.stringify(packets[i]);
    if (str == str2) position2 = i + 1;
    if (str == str6) position6 = i + 1;
  }

  console.log('End result: ' + position2 * position6);
})();
