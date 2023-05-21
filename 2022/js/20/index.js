import { readFile } from 'fs/promises';
import * as scanf from 'scanf';

const INPUT_FILE_NAME = 'input.txt';

let registerHistory = [];
let register = 1;

let screen = [];

function initScreen() {
  screen = [];
  for (let i = 0; i < 6; i++) {
    let line = [];
    for (let j = 0; j < 40; j++) {
      line.push('.');
    }
    screen.push(line);
  }
}

function drawScreen() {
  let string = '';
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 40; j++) {
      string += screen[i][j];
    }
    string += '\n';
  }
  console.log(string);
}

(async () => {
  const inputFilePath = new URL(`./${INPUT_FILE_NAME}`, import.meta.url);
  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  let lines = fileContents.split(/\r?\n/);

  for (let line of lines) {
    let info = scanf.sscanf(line, '%s %S', 'command', 'value');
    info.value = parseInt(info.value);

    if (info.command === 'noop') {
      registerHistory.push(register);
    } else {
      registerHistory = registerHistory.concat([register, register]);
      register = register + info.value;
    }

    // console.log(info);
  }

  initScreen();
  drawScreen();

  for (let cycle in registerHistory) {
    if (cycle == 0) continue;

    let pixel = registerHistory[cycle - 1];
    let pixels = [pixel, pixel + 1, pixel + 2];

    // console.log(Math.floor(cycle / 40), cycle % 40);

    if (pixels.includes(parseInt(cycle % 40))) {
      screen[Math.floor(cycle / 40)][(cycle % 40) - 1] = '#';
    }

    // console.log('Cycle: ' + cycle + ', pixel positions: ' + pixels.toString() + ' --> ' + contains);
  }

  drawScreen();
})();
