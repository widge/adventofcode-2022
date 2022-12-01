import * as days from './src/challenges/index.js';
import {formatDayString} from "./src/utils/utils.js";

const args = process.argv.slice(2);

const executeDaysChallenges = (day)=> {
  console.log(`${formatDayString(day)} Challenge 1`);
  days[day].challenge1();
  console.log(`${formatDayString(day)} Challenge 2`);
  days[day].challenge2();
}

if(args && args.shift() == "latestOnly"){
  const day = Object.keys(days).pop();
  executeDaysChallenges(day);
}else {
  Object.keys(days).map(day => {
    executeDaysChallenges(day);
  });
}