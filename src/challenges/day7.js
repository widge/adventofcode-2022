import {convertInputFileToArray} from '../utils/utils.js';
const input = convertInputFileToArray('./src/inputs/day7.txt');

const TOTAL_SIZE_LIMIT = 100000;

const findValidTotalSizes = (directory) => {
  const validTotalSizes = [];
  directory.directories.forEach(directory =>{
    if(directory.directorySize <= TOTAL_SIZE_LIMIT){
      validTotalSizes.push(directory.directorySize);
    }
    directory.directories.forEach(subDir => {
      if(subDir.directorySize <= TOTAL_SIZE_LIMIT){
        validTotalSizes.push(subDir.directorySize);
      }
      if(subDir.directories) {
        const subDirSizes = findValidTotalSizes(subDir);
        subDirSizes.forEach(subDirSize => validTotalSizes.push(subDirSize));
      }
    });
  })

  return validTotalSizes;
}

const generateFileSystemStructure = (commands, startPoint, directoryName) => {
  const currentDirectory = {
    name: directoryName,
    files: [],
    directorySize: 0,
    directories: [],
    indexShift: startPoint
  }

  for(let i=startPoint; i < commands.length; i++) {
    const command = commands[i].split(" ");
    currentDirectory.indexShift = i;
    if(command[0] === "$"){
      if(command[1] === "cd" && command[2] !== "/" && command[2] !== ".."){
        const subDirectories = generateFileSystemStructure(commands, i+1, command[2]);
        currentDirectory.directories.push(subDirectories);
        currentDirectory.directorySize += subDirectories.directorySize;
        i = subDirectories.indexShift;
        continue;
      }
      if(command[2] === ".."){
        break;
      }
    }else if(command[0].substring(0,3) !== "dir"){
      command[0].split(" ");
      currentDirectory.directorySize += parseInt(command[0]);
      currentDirectory.files.push(command[1])
    }
  }
  return currentDirectory;
}

const findSmallestValidDirectorySizes = (directory, requiredSpace) => {

  const validSizes = [];
  directory.directories.forEach(directory =>{
    if(directory.directorySize >= requiredSpace){
      validSizes.push(directory.directorySize);
    }
    directory.directories.forEach(subDir => {
      if(subDir.directorySize >= requiredSpace){
        validSizes.push(subDir.directorySize);
      }
      if(subDir.directories) {
        const subDirSizes = findSmallestValidDirectorySizes(subDir, requiredSpace);
        subDirSizes.forEach(subDirSize => validSizes.push(subDirSize));
      }
    });
  })

  return validSizes;
}

const fileSystem = generateFileSystemStructure(input, 0, "root");
const challenge1 = () => {
  const sumOfValidSizes = findValidTotalSizes(fileSystem).reduce((total, item) => total+item);
  console.log(`Sum of valid max sizes: ${sumOfValidSizes}`);
};

const challenge2 = () => {
  const requiredSpace = 30000000 - (70000000 - fileSystem.directorySize);
  const smallestValidDirectories = findSmallestValidDirectorySizes(fileSystem, requiredSpace)
    .sort((a,b)=> a > b ? 1 : a < b ? -1 : 0 )
    .shift();

  console.log(`Smallest Valid Directory: ${smallestValidDirectories}`)
};

export default { challenge1, challenge2 };
