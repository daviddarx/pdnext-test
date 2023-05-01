import { SupportUsSlot } from '@/types/SupportUsSlot';
import loadJsonFiles from '@/utils/load-json-files';

import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';

type Props = {
  supportUsData: SupportUsSlot[];
};

const News = ({ supportUsData }: Props) => {
  return (
    <Layout supportUsData={supportUsData}>
      <Metas title='News' />
      <div>
        <h1>News</h1>
      </div>
    </Layout>
  );
};

export default News;

export async function getStaticProps() {
  const supportUsSlotsDir: SupportUsSlot[] = [];
  const supportUsSlots = await loadJsonFiles(supportUsSlotsDir, '_content/supportUsSlots');

  return {
    props: {
      supportUsData: supportUsSlots,
    },
  };
}
