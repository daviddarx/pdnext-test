const fs = require('fs');
import path from 'path';

const loadJsonFiles = async (directory) => {
  const jsonsInDir = fs.readdirSync(directory).filter((file) => path.extname(file) === '.json');

  const pages = [];

  jsonsInDir.forEach((file) => {
    const fileData = fs.readFileSync(path.join(directory, file));
    const json = JSON.parse(fileData.toString());
    pages.push(json);
  });

  return {
    props: {
      items: pages,
    },
  };
};

export default loadJsonFiles;
