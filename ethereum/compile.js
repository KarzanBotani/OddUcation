const path = require('path'),
      solc = require('solc'),
      fs = require('fs-extra'); // 'fs' = filesystem. 'fs-extra' = improved version of 'fs'

// the directory of the 'build' folder:
const buildPath = path.resolve(__dirname, 'build');

// removeSync = removes a folder and everything inside
fs.removeSync(buildPath);

// read 'Campaign.sol' from the folder 'contracts'
const postPath = path.resolve(__dirname, 'contracts', 'Post.sol');

// read input code from that file
const input = fs.readFileSync(postPath, 'utf8');

// compile the file. get the contracts property of the  file.
const output = solc.compile(input, 1).contracts;
console.log(output);

// create 'build' folder
fs.ensureDirSync(buildPath);

// take each contract and put it in their own file. iterates over each key in the object, which are the contracts.
for (let contract in output) {
  // outputJsonSync = writes a JSON file
  fs.outputJsonSync(
    // pass in a path to the build path, and name it contract-name (from the object) + .json
    path.resolve(buildPath, contract.replace(':', '') + '.json'), // replace ':' for ''
    // actual contents to the json file
    output[contract]
  );
}