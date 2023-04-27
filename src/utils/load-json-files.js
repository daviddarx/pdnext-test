const fs = require('fs');
import path from 'path';

const loadJsonFiles = async (directory) => {
  const jsonsInDir = fs.readdirSync(directory).filter((file) => path.extname(file) === '.json');

  const jsonsObject = [];

  jsonsInDir.forEach((file) => {
    const fileData = fs.readFileSync(path.join(directory, file));
    const json = JSON.parse(fileData.toString());
    jsonsObject.push(json);
  });

  return jsonsObject;
};

export default loadJsonFiles;
