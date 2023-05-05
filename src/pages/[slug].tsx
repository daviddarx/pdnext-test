import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { fetchProgramContent, ProgramContent } from '@/utils/fetch-program-content';
import { fetchOnsContent, OnsContent } from '@/utils/fetch-ons-content';
import { fetchNewsContent, NewsContent } from '@/utils/fetch-news-content';
import { fetchImpressionsContent, ImpressionsContent } from '@/utils/fetch-impressions-content';
import { fetchContentPageContent, ContentPageContent } from '@/utils/fetch-content-page-content';

import { fetchCommonPageContent } from '@/utils/fetch-common-page-content';
import { SupportUsSlot } from '@/types/SupportUsSlot';

import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';

import ProgramPage from '@/components/pages/ProgramPage';
import OnsPage from '@/components/pages/OnsPage';
import NewsPage from '@/components/pages/NewsPage';
import ImpressionsPage from '@/components/pages/ImpressionsPage';
import ContentPage from '@/components/pages/ContentPage';

const pages = [
  { slug: 'festival-program', pageTitle: 'Festival Programm' },
  { slug: 'one-night-stands', pageTitle: 'One Night Stands' },
  { slug: 'news', pageTitle: 'News' },
  { slug: 'impressions', pageTitle: 'Impressions' },
  { slug: 'cookies', pageTitle: 'Cookie-Richtlinie', json: 'contentpage-cookie-richtlinie.json' },
  { slug: 'festival', pageTitle: 'Das Festival', json: 'contentpage-das-festival.json' },
  { slug: 'impressum', pageTitle: 'Impressum', json: 'contentpage-impressum.json' },
  { slug: 'press', pageTitle: 'Press', json: 'contentpage-presse.json' },
  { slug: 'privacy', pageTitle: 'Datenschutz', json: 'contentpage-datenschutz.json' },
  { slug: 'submissions', pageTitle: 'Submissions', json: 'contentpage-submissions.json' },
];

type PageProps = {
  page: {
    type: string;
    title: string;
    data: ProgramContent | ContentPageContent | NewsContent | ImpressionsContent | OnsContent;
  };
  supportUsData: SupportUsSlot[];
};

const Page: NextPage<PageProps> = ({ page, supportUsData }) => {
  const { type, title, data } = page;

  return (
    <Layout supportUsData={supportUsData}>
      <Metas title={title} />
      {/**
       * Forced to declaratively cast the
       * components and data to get them typed.
       */}
      {type === pages[0].slug && <ProgramPage data={data as ProgramContent} />}
      {type === pages[1].slug && <OnsPage data={data as OnsContent} />}
      {type === pages[2].slug && <NewsPage data={data as NewsContent} />}
      {type === pages[3].slug && <ImpressionsPage data={data as ImpressionsContent} />}
      {type === 'content-page' && <ContentPage data={data as ContentPageContent} />}
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = pages.map((page) => page.slug);
  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const { slug } = params ?? {};
  const page = pages.find((page) => page.slug === slug);

  if (!page) {
    return { notFound: true };
  }

  const type = page.json === undefined ? page.slug : 'content-page';

  /**
   * Forced to declaratively fetch the data
   * to get it correctly typed.
   */
  let data;
  switch (slug) {
    case pages[0].slug:
      data = await fetchProgramContent();
      break;
    case pages[1].slug:
      data = await fetchOnsContent();
      break;
    case pages[2].slug:
      data = await fetchNewsContent();
      break;
    case pages[3].slug:
      data = await fetchImpressionsContent();
      break;
    default:
      data = await fetchContentPageContent(page.json!);
      break;
  }

  const commonPageContent = await fetchCommonPageContent();

  const props: PageProps = {
    page: {
      type: type,
      title: page.pageTitle,
      data: data,
    },
    supportUsData: commonPageContent.supportUsData,
  };

  return {
    props: props,
  };
};

export default Page;
