import fs from 'fs';

export const convertInputFileToString = (filepath) =>
  fs.readFileSync(filepath).toString();

export const convertInputFileToArray = (filepath) =>
  convertInputFileToString(filepath).split('\n');

export const convertInputFileToCharArrayByLine = (filepath) =>
  convertInputFileToString(filepath)
    .split('\n')
    .map((line) => line.split(''));

export const isCharacterALetter = (char) => {
  //handy hack to check for alpha chars
  return char.toLowerCase() != char.toUpperCase();
}

export const formatDayString = (word) =>
  word.substring(0, 1).toUpperCase() +
  word.substring(1, 3) +
  word.replace('day', ' ');
