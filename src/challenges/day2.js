import { convertInputFileToArray } from '../utils/utils.js';

const input = convertInputFileToArray('./src/inputs/day2.txt');

const moveScoreMap = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

const SCORE_WIN = 6;
const SCORE_DRAW = 3;
const SCORE_LOSE = 0;

const actionScoreMap = {
  X: SCORE_LOSE,
  Y: SCORE_DRAW,
  Z: SCORE_WIN,
};

const challenge1 = () => {
  const actionMap = {
    A: { beats: 'Z', losesTo: 'Y' },
    B: { beats: 'X', losesTo: 'Z' },
    C: { beats: 'Y', losesTo: 'X' },
  };
  let myScore = 0;
  input.forEach((round) => {
    const [theirMove, myMove] = round.split(' ');
    switch (myMove) {
      case actionMap[theirMove].beats:
        myScore += moveScoreMap[myMove] + SCORE_LOSE;
        break;
      case actionMap[theirMove].losesTo:
        myScore += moveScoreMap[myMove] + SCORE_WIN;
        break;
      default:
        myScore += moveScoreMap[myMove] + SCORE_DRAW;
        break;
    }
  });

  console.log(myScore);
};

const challenge2 = () => {
  const actionMap = {
    A: { X: 'C', Y: 'A', Z: 'B' },
    B: { X: 'A', Y: 'B', Z: 'C' },
    C: { X: 'B', Y: 'C', Z: 'A' },
  };
  let myScore = 0;
  input.forEach((round) => {
    const [theirMove, action] = round.split(' ');
    const iShouldPlay = actionMap[theirMove][action];
    myScore += moveScoreMap[iShouldPlay] + actionScoreMap[action];
  });

  console.log(myScore);
};

export default { challenge1, challenge2 };
