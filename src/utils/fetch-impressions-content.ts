import sizeOf from 'image-size';
import fs from 'fs';
import loadJsonFiles from '@/utils/load-json-files';

interface Impression {
  title: string;
  titleFormated: string;
  type: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  link: string;
  start: string;
  date: string;
}

export interface ImpressionsContent {
  impressions: Impression[];
}
export async function fetchImpressionsContent(): Promise<ImpressionsContent> {
  const impressionsDir: Impression[] = [];
  const impressions = await loadJsonFiles(impressionsDir, '_content/impressions');

  impressions.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

  const formatedImpression: Impression[] = impressions.map((impression) => {
    const date = new Date(impression.start).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const imagePath = `public${impression.image}`;
    const dimensions = sizeOf(fs.readFileSync(imagePath));

    return {
      ...impression,
      date: date,
      imageWidth: dimensions.width,
      imageHeight: dimensions.height,
    };
  });

  // log image to help clean images folder (empty folder, and add again the listed images)
  // impressions.map((item) => {
  //   console.log(item.image.split('images/uploads/')[1]);
  // });

  return {
    impressions: formatedImpression,
  };
}
