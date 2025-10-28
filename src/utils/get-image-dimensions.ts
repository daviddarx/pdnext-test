import sizeOf from 'image-size';
import fs from 'fs';

type ImageDimension = {
  width: number;
  height: number;
};

const getImageDimensions = (path: string): ImageDimension => {
  // Check if path is valid and file exists
  if (!path || typeof path !== 'string' || path.trim() === '') {
    console.log('Invalid path provided:', path);
    return { width: 0, height: 0 };
  }

  try {
    // Check if file exists
    if (!fs.existsSync(path)) {
      console.log('File does not exist:', path);
      return { width: 0, height: 0 };
    }

    const dimensions = sizeOf(fs.readFileSync(path));

    return {
      width: typeof dimensions.width !== 'undefined' ? dimensions.width : 0,
      height: typeof dimensions.height !== 'undefined' ? dimensions.height : 0,
    };
  } catch (error) {
    console.error('Error getting image dimensions for path:', path, error);
    return { width: 0, height: 0 };
  }
};

export default getImageDimensions;
