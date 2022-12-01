import { convertInputFileToArray } from '../utils/utils.js';

const input = convertInputFileToArray('./src/inputs/day1.txt');

const challenge1 = () => {
  let biggest = 0;
  let currentTotal = 0;
  input.forEach((item) => {
    if (item.trim()) {
      currentTotal += parseInt(item.trim());
    } else {
      biggest = biggest > currentTotal ? biggest : currentTotal;
      currentTotal = 0;
    }
  });
  console.log(biggest);
};

const challenge2 = () => {
  const totalCalories = [];
  let currentTotal = 0;

  input.forEach((item, index) => {
    if (!item.trim() || input.length - 1 === index) {
      totalCalories.push(currentTotal);
      currentTotal = 0;
    } else {
      currentTotal += parseInt(item.trim());
    }
  });

  totalCalories.sort((first, second) =>
    first < second ? 1 : first > second ? -1 : 0
  );

  console.log(totalCalories[0] + totalCalories[1] + totalCalories[2]);
};

export default { challenge1, challenge2 };
