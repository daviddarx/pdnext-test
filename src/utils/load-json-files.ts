const fs = require('fs');
import path from 'path';

const loadJsonFiles = async <T>(typeDirArray: T[], directory: string) => {
  const jsonsInDir = fs
    .readdirSync(directory)
    .filter((file: string) => path.extname(file) === '.json');

  jsonsInDir.forEach((file: string) => {
    const fileData = fs.readFileSync(path.join(directory, file));
    const json = JSON.parse(fileData.toString());
    typeDirArray.push(json);
  });

  return typeDirArray;
};

export default loadJsonFiles;
