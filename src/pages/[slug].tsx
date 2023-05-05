import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { fetchCommonPageContent } from '@/utils/fetch-common-page-content';
import { ContentPageContent } from '@/types/ContentPageContent';
import { PageProps } from '@/types/PageProps';

import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';

const Page: NextPage<PageProps> = ({ pageData, supportUsData }) => {
  console.log(pageData.pageContent);

  return (
    <Layout supportUsData={supportUsData}>
      <Metas title={pageData.pageTitle} />
      <h1>{pageData.pageTitle}</h1>
    </Layout>
  );
};

const contents = [
  { slug: 'cookies', pageTitle: 'Cookie-Richtlinie', json: 'contentpage-cookie-richtlinie.json' },
  { slug: 'festival', pageTitle: 'Das Festival', json: 'contentpage-das-festival.json' },
  { slug: 'impressum', pageTitle: 'Impressum', json: 'contentpage-impressum.json' },
  { slug: 'press', pageTitle: 'Press', json: 'contentpage-presse.json' },
  { slug: 'privacy', pageTitle: 'Datenschutz', json: 'contentpage-datenschutz.json' },
  { slug: 'submissions', pageTitle: 'Submissions', json: 'contentpage-submissions' },
];

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = contents.map((page) => page.slug);
  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const { slug } = params ?? {};

  const pageData = contents.find((page) => page.slug === slug);

  if (!pageData) {
    return { notFound: true };
  }

  const contentPageContent = require('../../_content/contentPages/' +
    pageData.json) as ContentPageContent;

  const commonPageContent = await fetchCommonPageContent();

  const pageContent: PageProps = {
    pageData: {
      pageTitle: pageData.pageTitle,
      pageContent: contentPageContent,
    },
    supportUsData: commonPageContent.supportUsData,
  };

  return {
    props: pageContent,
  };
};

export default Page;
