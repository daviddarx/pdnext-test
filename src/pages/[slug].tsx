import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import { fetchCommonPageContent } from '@/utils/fetch-common-page-content';
import { PageProps } from '@/types/PageProps';

import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';

const Page: NextPage<PageProps> = ({ pageData, supportUsData }) => {
  return (
    <Layout supportUsData={supportUsData}>
      <Metas title={pageData.pageTitle} />
      <h1>{pageData.pageTitle}</h1>
    </Layout>
  );
};

const staticPagesData = [
  { slug: 'cookies', pageTitle: 'Cookie-Richtlinie' },
  { slug: 'festival', pageTitle: 'Das Festival' },
  { slug: 'impressum', pageTitle: 'Impressum' },
  { slug: 'press', pageTitle: 'Press' },
  { slug: 'privacy', pageTitle: 'Datenschutz' },
  { slug: 'submissions', pageTitle: 'Submissions' },
];

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = staticPagesData.map((page) => page.slug);
  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const { slug } = params ?? {};

  const pageData = staticPagesData.find((page) => page.slug === slug);

  if (!pageData) {
    return { notFound: true };
  }

  const commonPageContent = await fetchCommonPageContent();

  const pageContent: PageProps = {
    pageData: {
      pageTitle: pageData.pageTitle,
    },
    supportUsData: commonPageContent.supportUsData,
  };

  return {
    props: pageContent,
  };
};

export default Page;
