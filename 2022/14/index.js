import { readFile } from 'fs/promises';
import * as scanf from 'scanf';

const INPUT_FILE_NAME = 'input.txt';

let currentDirectory = '';
let tree = {
  '': {},
};
// elem[i] = full file path, elem[i+1] = file size
let files = [];

// function listFiles(files) {
//   for (let i = 0; i < files.length - 1; i += 2) {
//     console.log(files[i] + ' ' + files[i + 1]);
//   }
// }

function storeFile(file, size) {
  // store in a list, i don't know, just in case
  files.push(currentDirectory + '/' + file);
  files.push(size);

  // store in a tree
  let pieces = currentDirectory.split('/');
  let where = tree;

  for (let piece of pieces) {
    where = where[piece];
  }

  if (size === 'dir') where[file] = {};
  else where[file] = size;
}

// list of objects { path: name, size: number}
let directories = [];

function calculateSize(path) {
  let pieces = path.split('/');
  let where = tree;
  // total size of directory or file
  let result = 0;

  for (let piece of pieces) {
    where = where[piece];
  }

  for (let elem in where) {
    // console.log('--> ' + typeof where[elem] + ' ' + elem + ' ' + where[elem]);
    if (typeof where[elem] == 'object') {
      let tmp = calculateSize(path + '/' + elem);
      result += tmp;
      directories.push({ path: path + '/' + elem, size: tmp });
    } else {
      result += where[elem];
    }
  }

  // console.log(' total for ' + path + ' ' + result);
  return result;
}

(async () => {
  const inputFilePath = new URL(`./${INPUT_FILE_NAME}`, import.meta.url);
  const fileContents = await readFile(inputFilePath, { encoding: 'utf8' });

  let lines = fileContents.split(/\r?\n/);

  for (let line of lines) {
    // if line is a command
    if (line.slice(0, 2) === '$ ') {
      line = line.slice(2);

      let values = scanf.sscanf(line, '%s %S', 'command', 'argument');

      switch (values.command) {
        case 'cd':
          // back to root
          if (values.argument === '/') {
            currentDirectory = '';
            console.log('root again! ' + currentDirectory);
          }
          // directory down
          else if (values.argument === '..') {
            let pieces = currentDirectory.split('/');
            pieces.pop();
            currentDirectory = pieces.join('/');
            console.log('change to dir: ' + currentDirectory);
          }
          // directory up
          else {
            currentDirectory += '/' + values.argument;
            console.log('change to dir: ' + currentDirectory);
          }
          break;
        case 'ls':
          console.log('list files');
          break;
      }
    }
    // this line is a result of listing files
    else {
      console.log('line from ls', line);

      let pieces = line.split(' ');

      // name, size
      storeFile(pieces[1], pieces[0] === 'dir' ? pieces[0] : parseInt(pieces[0]));
    }
  }

  // console.log(files);
  // listFiles(files);
  // console.info(tree);

  let size = calculateSize('');
  let freeSpace = 70000000 - size;
  let needToFree = 30000000 - freeSpace;

  console.log('Total used size: ' + size);
  console.log('Total free space: ' + freeSpace);
  console.log('Need to free: ' + needToFree);

  directories = directories.sort((A, B) => {
    return A.size - B.size;
  });

  console.info(directories);

  for (let i = 0; i < directories.length; i++) {
    if (directories[i].size > needToFree) {
      console.log('Need to remove: ' + directories[i].path + ' ' + directories[i].size);
      return;
    }
  }
})();
