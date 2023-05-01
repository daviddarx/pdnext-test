import { SupportUsSlot } from '@/types/SupportUsSlot';
import loadJsonFiles from '@/utils/load-json-files';

import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';

type Props = {
  supportUsData: SupportUsSlot[];
};

const Cookies = ({ supportUsData }: Props) => {
  return (
    <Layout supportUsData={supportUsData}>
      <Metas title='Cookies' />
      <div>
        <h1>Cookies</h1>
      </div>
    </Layout>
  );
};

export default Cookies;

export async function getStaticProps() {
  const supportUsSlotsDir: SupportUsSlot[] = [];
  const supportUsSlots = await loadJsonFiles(supportUsSlotsDir, '_content/supportUsSlots');

  return {
    props: {
      supportUsData: supportUsSlots,
    },
  };
}
