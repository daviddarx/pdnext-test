import loadJsonFiles from '@/utils/load-json-files';

export interface NewsContent {
  news: any[];
}
export async function fetchNewsContent(): Promise<NewsContent> {
  // const newsDir: NewsType[] = [];
  const newsDir: [] = [];
  const news = await loadJsonFiles(newsDir, '_content/news');

  // news.sort((a, b) => a.order - b.order);

  return {
    news: news,
  };
}
