import {convertInputFileToCharArrayByLine} from '../utils/utils.js';
const treeGridX = convertInputFileToCharArrayByLine('./src/inputs/day8.txt');

const treeGridY = [];
treeGridX.forEach((row, rowIndex) => {
  row.forEach((tree, treeIndex) => {
    if(!treeGridY[treeIndex]){
      treeGridY[treeIndex] = [];
    }
    treeGridY[treeIndex][rowIndex] = tree;
  });
});

const calculateScenicScore = (xIndex, yIndex, currentTree) => {
  const treeRow = treeGridX[xIndex];
  const treeCol = treeGridY[yIndex];
  let scoreWest = 0;
  let scoreEast = 0;
  let scoreNorth = 0;
  let scoreSouth = 0;

  for(let i=yIndex-1;i>=0;i--){
    scoreWest++;
    if(treeRow[i] >= currentTree){
      break;
    }
  }

  for(let i=yIndex+1;i<treeRow.length;i++){
    scoreEast++
    if(treeRow[i] >= currentTree){
      break;
    }
  }

  for(let i=xIndex-1;i>=0;i--){
    scoreNorth++;
    if(treeCol[i] >= currentTree){
      break;
    }
  }

  for(let i=xIndex+1;i<treeCol.length;i++){
    scoreSouth++;
    if(treeCol[i] >= currentTree){
      break;
    }
  }

  return scoreEast*scoreWest*scoreSouth*scoreNorth;
}

const analyseTreesByRowAndCol = (treeRow, xIndex) => {

  const treeAnalysis = {
    visibleTrees: 0,
    highestScenicScore:0
  }

  if(xIndex === 0 || xIndex === treeGridX.length -1){
    //first and last rows are all visible so just add their length to the count
    treeAnalysis.visibleTrees = treeRow.length;
    return treeAnalysis;
  }

  for(let yIndex = 0; yIndex < treeRow.length; yIndex++){
    if(yIndex === 0 || yIndex === treeRow.length -1){
      //first and last cols are all visible so just add their length to the count
      treeAnalysis.visibleTrees ++ ;
      continue;
    }

    const currentTree = treeRow[yIndex];
    const treeCol = treeGridY[yIndex];
    const visibleFromTheWest = treeRow.slice(0, yIndex).every(tree => parseInt(tree) < currentTree);
    const visibleFromTheEast = treeRow.slice(yIndex+1).every(tree => parseInt(tree) < currentTree);
    const visibleFromTheNorth = treeCol.slice(0, xIndex).every(tree => parseInt(tree) < currentTree);
    const visibleFromTheSouth = treeCol.slice(xIndex+1).every(tree => parseInt(tree) < currentTree);

    if(visibleFromTheWest || visibleFromTheEast || visibleFromTheNorth || visibleFromTheSouth){
      treeAnalysis.visibleTrees++;
    }

    const scenicScore = calculateScenicScore(xIndex, yIndex, currentTree);
    treeAnalysis.highestScenicScore = scenicScore > treeAnalysis.highestScenicScore ?
      scenicScore:treeAnalysis.highestScenicScore
  }
  return treeAnalysis;
}

const challenge1 = () => {

  let visibleTrees = 0;
  for(let xIndex = 0; xIndex < treeGridX.length; xIndex++ ) {
    const treeRow = treeGridX[xIndex];
    const treeAnalysis = analyseTreesByRowAndCol(treeRow, xIndex);
    visibleTrees += treeAnalysis.visibleTrees;
  }

  console.log(`There are ${visibleTrees} visible trees`);
}

const challenge2 = () => {

  let highestScenicScore = 0;
  for(let xIndex = 0; xIndex < treeGridX.length; xIndex++ ) {
    const treeRow = treeGridX[xIndex];
    const treeAnalysis = analyseTreesByRowAndCol(treeRow, xIndex);
    highestScenicScore = treeAnalysis.highestScenicScore > highestScenicScore ?
      treeAnalysis.highestScenicScore : highestScenicScore;
  }
  console.log(`Highest Scenic Score: ${highestScenicScore}`);
};

export default { challenge1, challenge2 };
