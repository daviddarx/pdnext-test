import sizeOf from 'image-size';
import fs from 'fs';

type ImageDimension = {
  width: number;
  height: number;
};

const getImageDimensions = (path: string): ImageDimension => {
  const dimensions = sizeOf(fs.readFileSync(path));

  return {
    width: typeof dimensions.width !== 'undefined' ? dimensions.width : 0,
    height: typeof dimensions.height !== 'undefined' ? dimensions.height : 0,
  };
};

export default getImageDimensions;
