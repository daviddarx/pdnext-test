const fs = require('fs');
import path from 'path';

export const getJsonSlug = (file: string) => {
  return file.split('.json')[0];
};

const loadJsonFiles = async <T>(typeDirArray: T[], directory: string) => {
  const jsonsInDir = fs
    .readdirSync(directory)
    .filter((file: string) => path.extname(file) === '.json');

  jsonsInDir.forEach((file: string) => {
    const fileData = fs.readFileSync(path.join(directory, file));
    const json = JSON.parse(fileData.toString());
    const slug = getJsonSlug(file);
    typeDirArray.push({ ...json, slug });
  });

  return typeDirArray;
};

export default loadJsonFiles;
