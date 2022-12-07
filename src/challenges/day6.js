import { convertInputFileToString } from '../utils/utils.js';
const dataStream = convertInputFileToString('./src/inputs/day6.txt');

const areAllCharactersDifferent = (characters) => {
  return characters.every((character, currentIndex) => {
    return characters.indexOf(character) === currentIndex
  })
}

const findFirstMarker = (distinctCharacterCount) => {
  let marker = -1;
  for(let index = 0; index < dataStream.length;index++){
    if(index > dataStream.length - distinctCharacterCount){
      continue;
    }
    const nextFourChars = dataStream.substring(index, index+distinctCharacterCount);
    if(areAllCharactersDifferent(nextFourChars.split(""))){
      marker = (index+distinctCharacterCount);
      break;
    }
  }
  return marker;
}

const challenge1 = () => {
   const marker = findFirstMarker(4);
   console.log(`Start of Packet marker is: ${marker}`);
};

const challenge2 = () => {
  const marker = findFirstMarker(14);
  console.log(`Start of Message marker is: ${marker}`);
};

export default { challenge1, challenge2 };
