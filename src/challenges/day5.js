import {convertInputFileToArray, isCharacterALetter} from '../utils/utils.js';
const input = convertInputFileToArray('./src/inputs/day5.txt');

const stackDrawing = [];
input.every(line => {
  if(line.substring(0,4) !== "move"){
    stackDrawing.push(line);
    return true
  }
  return false;
});
const craneProcedure = input.slice(stackDrawing.length);

const initialStacks = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: []
}

const addItemsToStacks = (lineAsCharArray) => {

  let arrayPos = 1;
  Object.keys(initialStacks).forEach((stackNumber) => {
    if(lineAsCharArray[arrayPos] && isCharacterALetter(lineAsCharArray[arrayPos])) {
      initialStacks[stackNumber].unshift(lineAsCharArray[arrayPos]);
    }
    arrayPos+=4;
  })
}

const populateInitialStacks = () => {
  stackDrawing.forEach((line) => {
    if(!line.trim()){
      return false;
    }
    addItemsToStacks(line.split(""));
  });
}

populateInitialStacks();
////// Everything above is just to format the input /////

const challenge1 = () => {
  const stacks = JSON.parse(JSON.stringify(initialStacks));//qad deep clone
  craneProcedure.forEach(procedure => {
    const [crateNo, fromStack, toStack] = procedure.replace("move ","")
      .replace(" from ",",")
      .replace(" to ", ",")
      .split(",");

    const crates = stacks[fromStack].splice(stacks[fromStack].length - crateNo);
    stacks[toStack].push(...crates.reverse());
  })

  const output = Object.keys(stacks).reduce((accumulator, stackNo) => {
    const crate = stacks[stackNo].pop();
    return accumulator + (crate ? crate:"");
  }, "");
  console.log(output);

};

const challenge2 = () => {
  const stacks = JSON.parse(JSON.stringify(initialStacks));//qad deep clone
  craneProcedure.forEach(procedure => {
    const [crateNo, fromStack, toStack] = procedure.replace("move ","")
      .replace(" from ",",")
      .replace(" to ", ",")
      .split(",");

    const crates = stacks[fromStack].splice(-crateNo);
    stacks[toStack].push(...crates);
  })

  const output = Object.keys(stacks).reduce((accumulator, stackNo) => {
    const crate = stacks[stackNo].pop();
    return accumulator + (crate ? crate:"");
  }, "");
  console.log(output);
};

export default { challenge1, challenge2 };
