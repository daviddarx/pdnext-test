import sizeOf from 'image-size';
import https from 'https';

export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface GalleryImage {
  main: Image;
  thumb: Image;
}

function getImageData(imageUrl: string): Promise<Image> {
  // console.log('----------------- FETCH GALLERY CONTENT', imageUrl);

  return new Promise((resolve, reject) => {
    https
      .get(imageUrl, (response) => {
        const chunks: Buffer[] = [];
        response.on('data', (chunk) => {
          chunks.push(chunk);
        });
        response.on('end', () => {
          const buffer = Buffer.concat(chunks);
          try {
            const dimensions = sizeOf(buffer);
            // console.log('get dimensions:  ', imageUrl);
            resolve({
              url: imageUrl,
              width: dimensions.width!,
              height: dimensions.height!,
            });
          } catch (error) {
            console.error(error);
          }
        });
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

export async function fetchGalleriesImagesContent(
  folder: string,
  imageNumber: number,
): Promise<GalleryImage[]> {
  const images = [];

  for (let i = 0; i < imageNumber; i++) {
    const imageName = i < 10 ? '0' + i : i;
    const imageUrl = `https://files.daviddarx.com/pornydays/images/galleries/${folder}/${imageName}.jpg`;
    const thumbUrl = `https://files.daviddarx.com/pornydays/images/galleries/${folder}/${imageName}_thumb.jpg`;

    const imageDataPromises = [getImageData(imageUrl), getImageData(thumbUrl)];
    const [imageData, thumbData] = await Promise.all(imageDataPromises);

    images.push({
      main: imageData,
      thumb: thumbData,
    });
  }

  return images;
}
