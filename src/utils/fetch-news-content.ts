import loadJsonFiles, { getJsonSlug } from '@/utils/load-json-files';
import getImageDimensions from './get-image-dimensions';

export interface News {
  title: string;
  date: string;
  dateReadable: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  shortDesc?: string;
  longDesc?: string;
  detailPageLink: string;
  detailPageLinkTitle?: string;
  link?: string;
  linkTitle?: string;
  slug: string;
}

export interface NewsContent {
  news: News[];
}

const completeNews = (news: News) => {
  if (news.image) {
    // log image to help clean images folder (empty folder, and add again the listed images)
    // console.log(newItem.image.split('images/uploads/')[1]);

    const dimensions = getImageDimensions(`public${news.image}`);
    news.imageWidth = dimensions.width;
    news.imageHeight = dimensions.height;
  }

  news.detailPageLink = getNewsRoute(news.slug);
  news.dateReadable = new Date(news.date).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getNewsRoute = (slug: string) => {
  return `/news/${slug}`;
};

export async function fetchNewsContent(): Promise<NewsContent> {
  const newsDir: News[] = [];
  const news = await loadJsonFiles(newsDir, '_content/news');

  // console.log('----------------- FETCH NEWS CONTENT');

  for (const newItem of news) {
    completeNews(newItem);
  }

  news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    news: news,
  };
}

export async function fetchNews(json: string): Promise<News> {
  const newItem = require('../../_content/news/' + json) as News;
  newItem.slug = getJsonSlug(json);
  completeNews(newItem);

  return newItem;
}
