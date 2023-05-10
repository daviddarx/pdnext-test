import loadJsonFiles from '@/utils/load-json-files';
import getImageDimensions from './get-image-dimensions';

interface News {
  title: string;
  date: string;
  dateReadable: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  desc?: string;
  link?: string;
  linkTitle?: string;
}

export interface NewsContent {
  news: News[];
}

export async function fetchNewsContent(): Promise<NewsContent> {
  const newsDir: News[] = [];
  const news = await loadJsonFiles(newsDir, '_content/news');

  for (const newItem of news) {
    newItem.dateReadable = new Date(newItem.date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    if (newItem.image) {
      // log image to help clean images folder (empty folder, and add again the listed images)
      // console.log(newItem.image.split('images/uploads/')[1]);

      const dimensions = getImageDimensions(`public${newItem.image}`);
      newItem.imageWidth = dimensions.width;
      newItem.imageHeight = dimensions.height;
    }
  }

  news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    news: news,
  };
}
