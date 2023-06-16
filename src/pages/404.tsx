import { GetStaticProps, NextPage } from 'next';

import { fetchCommonPageContent, CommonPageData } from '@/utils/fetch-common-page-content';
import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';
import PageHeader from '@/components/layout/PageHeader';

type PageProps = {
  commonPageData: CommonPageData;
};

const Page: NextPage<PageProps> = ({ commonPageData }) => {
  return (
    <Layout commonPageData={commonPageData}>
      <Metas title={'Porny Days Film Festival'} />
      <section className='content-page'>
        <PageHeader
          subline='404 - Not Found'
          title='Ups 😅, die Lust verschwand'
          lead="Diese Seite konnte nicht gefunden werden. Wie wär's mit einer anderen?"
        />
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const commonPageData = await fetchCommonPageContent();

  const props: PageProps = {
    commonPageData: commonPageData,
  };

  return {
    props: props,
  };
};

export default Page;
