import loadJsonFiles from '@/utils/load-json-files';
import getImageDimensions from './get-image-dimensions';

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
  // console.log('----------------- FETCH IMPRESSIONS CONTENT ');

  const impressionsDir: Impression[] = [];
  const impressions = await loadJsonFiles(impressionsDir, '_content/impressions');

  impressions.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

  const formatedImpression: Impression[] = impressions.map((impression) => {
    const date = new Date(impression.start).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    const dimensions = getImageDimensions(`public${impression.image}`);

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
