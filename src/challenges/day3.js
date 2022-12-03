import { convertInputFileToArray } from '../utils/utils.js';

const input = convertInputFileToArray('./src/inputs/day3.txt');
const charList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const challenge1 = () => {
  let totalPriority = 0;
  input.forEach((backpack) => {
    const compartment1 = backpack.split('').slice(0, backpack.length / 2);
    const compartment2 = backpack.split('').slice(backpack.length / 2);
    const commonItem = compartment1
      .filter((item) => compartment2.includes(item))
      .shift();
    totalPriority += charList.indexOf(commonItem) + 1;
  });

  console.log(totalPriority);
};

const challenge2 = () => {
  const groupOfElves = [];
  let totalPriority = 0;
  input.forEach((backpack) => {
    groupOfElves.push(backpack.split(''));
    if (groupOfElves.length > 2) {
      const commonItem = groupOfElves[0]
        .filter(
          (item) =>
            groupOfElves[1].includes(item) && groupOfElves[2].includes(item)
        )
        .pop();
      groupOfElves.length = 0;
      totalPriority += charList.indexOf(commonItem) + 1;
    }
  });

  console.log(totalPriority);
};

export default { challenge1, challenge2 };
