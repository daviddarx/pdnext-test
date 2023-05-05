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

import FestivalProgramPage from '@/components/pages/FestivalProgramPage';
import OnsPage from '@/components/pages/OnsPage';
import NewsPage from '@/components/pages/NewsPage';
import ImpressionsPage from '@/components/pages/ImpressionsPage';
import ContentPage from '@/components/pages/ContentPage';

const pages = [
  { slug: 'festival-program', pageTitle: 'Festival Programm' },
  { slug: 'one-night-stands', pageTitle: 'One Night Stands – das saisonales Programm' },
  { slug: 'news', pageTitle: 'Impressions' },
  { slug: 'impressions', pageTitle: 'News' },
  { slug: 'cookies', pageTitle: 'Cookie-Richtlinie', json: 'contentpage-cookie-richtlinie.json' },
  { slug: 'festival', pageTitle: 'Das Festival', json: 'contentpage-das-festival.json' },
  { slug: 'impressum', pageTitle: 'Impressum', json: 'contentpage-impressum.json' },
  { slug: 'press', pageTitle: 'Press', json: 'contentpage-presse.json' },
  { slug: 'privacy', pageTitle: 'Datenschutz', json: 'contentpage-datenschutz.json' },
  { slug: 'submissions', pageTitle: 'Submissions', json: 'contentpage-submissions' },
];

type PageProps = {
  page: {
    type: string;
    title: string;
    content: ProgramContent | ContentPageContent | NewsContent | ImpressionsContent | OnsContent;
  };
  supportUsData: SupportUsSlot[];
};

const Page: NextPage<PageProps> = ({ page, supportUsData }) => {
  const { type, title, content } = page;

  return (
    <Layout supportUsData={supportUsData}>
      <Metas title={title} />
      {type === 'festival-program' && <FestivalProgramPage content={content as ProgramContent} />}
      {type === 'ons' && <OnsPage content={content as OnsContent} />}
      {type === 'news' && <NewsPage content={content as NewsContent} />}
      {type === 'impressions' && <ImpressionsPage content={content as ImpressionsContent} />}
      {type === 'content-page' && <ContentPage content={content as ContentPageContent} />}
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

  // rename data partout?
  let content;
  let type;

  if (slug === 'festival-program') {
    type = 'festival-program';
    content = await fetchProgramContent();
  } else if (slug === 'one-night-stands') {
    type = 'ons';
    content = await fetchOnsContent();
  } else if (slug === 'news') {
    type = 'news';
    content = await fetchNewsContent();
  } else if (slug === 'impressions') {
    type = 'impressions';
    content = await fetchImpressionsContent();
  } else {
    type = 'content-page';
    content = await fetchContentPageContent(page.json!);
  }

  const commonPageContent = await fetchCommonPageContent();

  const props: PageProps = {
    page: {
      type: type,
      title: page.pageTitle,
      content: content,
    },
    supportUsData: commonPageContent.supportUsData,
  };

  return {
    props: props,
  };
};

export default Page;
