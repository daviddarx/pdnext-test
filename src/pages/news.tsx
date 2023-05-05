import { GetStaticProps, NextPage } from 'next';

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

export default Page;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const commonPageContent = await fetchCommonPageContent();

  const pageContent: PageProps = {
    pageData: {
      pageTitle: 'News',
    },
    supportUsData: commonPageContent.supportUsData,
  };

  return {
    props: pageContent,
  };
};
