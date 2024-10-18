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
import ActiveLink from '@/components/ui/ActiveLink';
import ArrowIcon from '@/components/icons/ArrowIcon';

type PageProps = {
  news: News;
  prevNews: News;
  nextNews: News;
  commonPageData: CommonPageData;
};

const Page: NextPage<PageProps> = ({ news, prevNews, nextNews, commonPageData }) => {
  return (
    <Layout commonPageData={commonPageData}>
      <Metas title={news.title} />

      <section className='content-page news-page'>
        <PageHeader
          subline={`News – ${news.dateReadable}`}
          title={news.title}
          lead={news.shortDesc || ''}
        />
        <div
          className={classNames('news-page__content', {
            'news-page__content--splitted': news.image && news.longDesc,
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
          {(news.longDesc || news.link) && (
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
          )}
        </div>
        <nav className='event-detail-nav news-page__nav'>
          <ActiveLink
            href={nextNews.detailPageLink}
            className='event-detail-nav__button event-detail-nav__button--prev'
          >
            <span className='event-detail-nav__subline'>
              <span className='xl:order-2'>{nextNews.dateReadable}</span>
              <ArrowIcon className='event-detail-nav__icon' />
            </span>

            <span className='event-detail-nav__title'>{nextNews.title}</span>
          </ActiveLink>
          <ActiveLink
            href={prevNews.detailPageLink}
            className='event-detail-nav__button event-detail-nav__button--next'
          >
            <span className='event-detail-nav__subline'>
              <span className='xl:order-2'>{prevNews.dateReadable}</span>
              <ArrowIcon className='event-detail-nav__icon' />
            </span>

            <span className='event-detail-nav__title'>{prevNews.title}</span>
          </ActiveLink>
        </nav>
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
  const { news } = await fetchNewsContent();

  const newsItem = await fetchNews(`${slug}.json`);

  const newsIndex = news.findIndex((item) => item.slug === newsItem.slug);
  const prevNewsItem = news[(newsIndex + 1) % news.length];
  const nextNewsItem = news[(newsIndex - 1 + news.length) % news.length];
  const commonPageData = await fetchCommonPageContent();

  console.log(
    'slugs',
    news.map((item) => item.slug),
  );
  console.log('newsIndex', newsIndex);

  const props: PageProps = {
    news: newsItem,
    prevNews: prevNewsItem,
    nextNews: nextNewsItem,
    commonPageData,
  };

  return {
    props: props,
  };
};

export default Page;
