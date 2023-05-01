import { SupportUsSlot } from '@/types/SupportUsSlot';
import loadJsonFiles from '@/utils/load-json-files';

import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';

type Props = {
  supportUsData: SupportUsSlot[];
};

const Impressum = ({ supportUsData }: Props) => {
  return (
    <Layout supportUsData={supportUsData}>
      <Metas title='Impressum' />
      <div>
        <h1>Impressum</h1>
      </div>
    </Layout>
  );
};

export default Impressum;

export async function getStaticProps() {
  const supportUsSlotsDir: SupportUsSlot[] = [];
  const supportUsSlots = await loadJsonFiles(supportUsSlotsDir, '_content/supportUsSlots');

  return {
    props: {
      supportUsData: supportUsSlots,
    },
  };
}
