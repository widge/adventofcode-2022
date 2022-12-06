import { convertInputFileToArray } from '../utils/utils.js';
const input = convertInputFileToArray('./src/inputs/day4.txt');

const range = (min, max) => {
  const populatedArray = [];
  let rangeVal = min;
  while(rangeVal <= max){
    populatedArray.push(rangeVal++);
  }
  return populatedArray;
}

const getRange = (assignment) => {
  const [start, end] = assignment.split("-");
  return range(parseInt(start), parseInt(end));
}

const challenge1 = () => {

  const fullyOverlappingPairs = input.reduce((accumulator, pairAssignments) => {
    const [assignment1, assignment2] = pairAssignments.split(",");
    const range1 = getRange(assignment1);
    const range2 = getRange(assignment2);

    const leftOverIds = range1.filter((id) => !range2.includes(id));//specifically that it does not include it
    const rangeSizeDifference = range1.length - range2.length;

    // if nothing remains or if the number items left is the same as if you remove the number of items in the first
    // array from the second then there was a full overlap of one of the two arrays
    return (leftOverIds.length === 0 || leftOverIds.length === rangeSizeDifference) ? ++accumulator : accumulator;
  }, 0);

  console.log(fullyOverlappingPairs);
};

const challenge2 = () => {

  const partiallyOverlappingPairs = input.reduce((accumulator, pairAssignments) => {
    const [assignment1, assignment2] = pairAssignments.split(",");

    const range1 = getRange(assignment1);
    const range2 = getRange(assignment2);
    // number of items left over, one of the arrays fully overlaps the other
    return range1.some((id) => range2.includes(id)) ? ++accumulator : accumulator;

  }, 0);

  console.log(partiallyOverlappingPairs);
};

export default { challenge1, challenge2 };
