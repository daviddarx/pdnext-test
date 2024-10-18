import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { fetchCommonPageContent, CommonPageData } from '@/utils/fetch-common-page-content';
import { fetchNewsContent, fetchNews, type News } from '@/utils/fetch-news-content';

import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';
import PageHeader from '@/components/layout/PageHeader';
import LoadedImage from '@/components/ui/LoadedImage';

type PageProps = {
  news: News;
  commonPageData: CommonPageData;
};

const Page: NextPage<PageProps> = ({ news, commonPageData }) => {
  return (
    <Layout commonPageData={commonPageData}>
      <Metas title={news.title} />

      <section className='content-page gallery-page'>
        <PageHeader subline='News' title={news.title} lead={news.shortDesc || ''} />
        <div
          className={classNames('news-page__content', {
            'news-page__content--splitted': news.image,
          })}
        >
          {news.image && (
            <LoadedImage
              src={news.image}
              alt={news.title}
              width={news.imageWidth}
              height={news.imageHeight}
              sizes='(min-width: 1920px) 25vw, (min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw'
              className='news-page__image'
            />
          )}
          <div className='news-page__desc text-content'>
            {news.longDesc && (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{news.longDesc}</ReactMarkdown>
            )}
            {news.link && (
              <a href={news.link} className='news-page__link'>
                {news.linkTitle ? news.linkTitle : 'Link'}
              </a>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const newsContent = await fetchNewsContent();

  const slugs = newsContent.news.map((news) => news.slug);
  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const { slug } = params ?? {};
  const news = await fetchNews(`${slug}.json`);

  const commonPageData = await fetchCommonPageContent();

  const props: PageProps = {
    news,
    commonPageData,
  };

  return {
    props: props,
  };
};

export default Page;
