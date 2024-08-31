import { readFile } from 'fs/promises';
import * as scanf from 'scanf';

const INPUT_FILE_NAME = 'input.txt';

let registerHistory = [1];
let register = 1;

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

    console.log(info);
  }

  console.info(registerHistory);

  // register values
  console.log(
    registerHistory[20],
    registerHistory[60],
    registerHistory[100],
    registerHistory[140],
    registerHistory[180],
    registerHistory[220]
  );

  // strenghts
  console.log(
    registerHistory[20] * 20,
    registerHistory[60] * 60,
    registerHistory[100] * 100,
    registerHistory[140] * 140,
    registerHistory[180] * 180,
    registerHistory[220] * 220
  );

  let result =
    registerHistory[20] * 20 +
    registerHistory[60] * 60 +
    registerHistory[100] * 100 +
    registerHistory[140] * 140 +
    registerHistory[180] * 180 +
    registerHistory[220] * 220;

  console.log('Sum of signal strengths: ' + result);
})();
