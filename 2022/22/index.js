import { readFile } from 'fs/promises';
import * as scanf from 'scanf';

const INPUT_FILE_NAME = 'example-input.txt';

let monkeys = [];
let NUM_ROUNDS = 10000;

function operation(value, func) {
  let result;

  // console.log(value, func);

  for (let i = 0; i < func.length; i++) {
    if (func[i] === 'old') {
      func[i] = value;
    }
  }
  // console.log(func);

  switch (func[1]) {
    case '+':
      result = func[0] + func[2];
      break;
    case '*':
      result = func[0] * func[2];
      break;
    default:
      console.log('WHAT IS THIS', func[1]);
  }

  return result;
}

function showInspectedTimes() {
  for (let monkey of monkeys) {
    console.log('Monkey ' + monkey.name + ' inspected items ' + monkey.inspected + ' times.');
  }
}

(async () => {
  const inputFilePath = new URL(`./${INPUT_FILE_NAME}`, import.meta.url);
  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  let lines = fileContents.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    let info;
    let monkey = {};

    info = scanf.sscanf(lines[i], 'Monkey %S', 'name');

    if (!info || !info.name) continue;

    monkey.name = parseInt(info.name);

    info = scanf.sscanf(lines[++i], 'Starting items: %S', 'items');
    monkey.items = info.items.split(',').map((item) => {
      return parseInt(item);
    });

    info = scanf.sscanf(lines[++i], 'Operation: new = %S', 'operation');
    monkey.operation = info.operation.split(' ');

    for (let j = 0; j < monkey.operation.length; j++) {
      if (parseInt(monkey.operation[j])) {
        monkey.operation[j] = parseInt(monkey.operation[j]);
      }
    }

    info = scanf.sscanf(lines[++i], 'Test: divisible by %S', 'test');
    monkey.test = parseInt(info.test);

    info = scanf.sscanf(lines[++i], 'If true: throw to monkey %S', 'true');
    monkey.true = parseInt(info.true);

    info = scanf.sscanf(lines[++i], 'If false: throw to monkey %S', 'false');
    monkey.false = parseInt(info.false);

    monkey.inspected = 0;

    console.info(monkey);
    monkeys.push(monkey);
  }

  // calculate the lowest common multiple of all the test(divisible) values

  let lcm = 1;

  for (let monkey of monkeys) {
    lcm *= monkey.test;
  }

  console.log('Lowest common multiple: ' + lcm);

  for (let i = 1; i < NUM_ROUNDS + 1; i++) {
    // console.log(' -----> ROUND: ' + i);

    for (let j = 0; j < monkeys.length; j++) {
      for (let k = 0; k < monkeys[j].items.length; k++) {
        // console.log('monkey ' + j + ' inspects item ' + monkeys[j].items[k]);

        monkeys[j].inspected++;

        // empty concat to make a new reference to a new array
        let newValue = operation(monkeys[j].items[k], monkeys[j].operation.concat([]));

        // HERE are the problems
        if (!Number.isSafeInteger(newValue)) console.log('DANGER DANGER!!!!');

        // gets bored -> not anymore!
        // newValue = Math.floor(newValue / 3);

        let isDivisible = newValue % monkeys[j].test == 0;

        newValue = newValue % lcm;

        // console.log(
        //   'new value: ' +
        //     newValue +
        //     ', divisible: ' +
        //     (isDivisible ? 'true' : 'false') +
        //     ', sent to monkey ' +
        //     (isDivisible ? monkeys[j].true : monkeys[j].false)
        // );

        // test === true
        if (isDivisible) {
          monkeys[monkeys[j].true].items.push(newValue);
        }
        // test === false
        else {
          monkeys[monkeys[j].false].items.push(newValue);
        }

        monkeys[j].items.shift();
        k--;
        // console.log(monkeys[j].items);
      }
    }
    // console.info(monkeys);
  }

  console.info(monkeys);
  showInspectedTimes();

  // sort by times they inspected items
  monkeys.sort((a, b) => {
    return b.inspected - a.inspected;
  });

  console.info('Monkey business: ' + monkeys[0].inspected * monkeys[1].inspected);
})();
