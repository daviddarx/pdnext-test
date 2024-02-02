import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { routes, findRouteBySlug, Route } from '@/routes/routes';
import { fetchProgramContent, ProgramContent } from '@/utils/fetch-program-content';
import { fetchOnsContent, OnsContent } from '@/utils/fetch-ons-content';
import { fetchNewsContent, NewsContent } from '@/utils/fetch-news-content';
import { fetchImpressionsContent, ImpressionsContent } from '@/utils/fetch-impressions-content';
import { fetchContentPageContent, ContentPageContent } from '@/utils/fetch-content-page-content';
import { fetchCommonPageContent, CommonPageData } from '@/utils/fetch-common-page-content';

import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';

import ProgramPage from '@/components/pages/ProgramPage';
import OnsPage from '@/components/pages/OnsPage';
import NewsPage from '@/components/pages/NewsPage';
import ImpressionsPage from '@/components/pages/ImpressionsPage';
import ContentPage from '@/components/pages/ContentPage';

type PageProps = {
  page: {
    slug: string;
    type: string;
    title: string;
    data: ProgramContent | ContentPageContent | NewsContent | ImpressionsContent | OnsContent;
  };
  commonPageData: CommonPageData;
};

const Page: NextPage<PageProps> = ({ page, commonPageData }) => {
  const { slug, type, title, data } = page;
  const isDark = slug === routes.secondary.about.slug || type === routes.secondary.impressions.slug;

  return (
    <Layout commonPageData={commonPageData} isDark={isDark}>
      <Metas title={title} />
      {/**
       * Forced to declaratively cast the
       * components and data to get them typed.
       */}
      {type === routes.main.festival.slug && <ProgramPage data={data as ProgramContent} />}
      {type === routes.main.ons.slug && <OnsPage data={data as OnsContent} />}
      {type === routes.secondary.news.slug && <NewsPage data={data as NewsContent} />}
      {type === routes.secondary.impressions.slug && (
        <ImpressionsPage data={data as ImpressionsContent} />
      )}
      {type === 'content-page' && <ContentPage data={data as ContentPageContent} />}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs: string[] = [];
  for (let key in routes.main) {
    slugs.push(routes.main[key as keyof typeof routes.main].slug);
  }
  for (let key in routes.secondary) {
    slugs.push(routes.secondary[key as keyof typeof routes.secondary].slug);
  }
  for (let key in routes.footer) {
    slugs.push(routes.footer[key as keyof typeof routes.footer].slug);
  }
  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const { slug } = params ?? {};

  let slugString = '';
  if (Array.isArray(slug)) {
    slugString = slug[slug.length - 1];
  } else if (typeof slug === 'string') {
    slugString = slug;
  }

  let route = findRouteBySlug(routes, slugString);

  if (route === null) {
    return { notFound: true };
  }

  const type = route.json === undefined ? route.slug : 'content-page';

  /**
   * Forced to declaratively fetch the data
   * to get it correctly typed.
   */
  let data;
  switch (slug) {
    case routes.main.festival.slug:
      data = await fetchProgramContent();
      break;
    case routes.main.ons.slug:
      data = await fetchOnsContent();
      break;
    case routes.secondary.news.slug:
      data = await fetchNewsContent();
      break;
    case routes.secondary.impressions.slug:
      data = await fetchImpressionsContent();
      break;
    default:
      data = await fetchContentPageContent(route.json!);
      break;
  }

  const commonPageData = await fetchCommonPageContent();

  const props: PageProps = {
    page: {
      slug: slugString,
      type: type,
      title: route.title,
      data: data,
    },
    commonPageData: commonPageData,
  };

  return {
    props: props,
  };
};

export default Page;
