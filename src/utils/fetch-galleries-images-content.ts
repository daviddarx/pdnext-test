export interface GalleryImage {
  main: string;
  thumb: string;
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

    images.push({
      main: imageUrl,
      thumb: thumbUrl,
    });
  }

  return images;
}
