import loadJsonFiles from '@/utils/load-json-files';

import { SupportUsSlot } from '@/types/SupportUsSlot';

type Props = {
  supportUsData: SupportUsSlot[];
};

export async function fetchCommonPageContent(): Promise<Props> {
  const supportUsSlotsDir: SupportUsSlot[] = [];
  const supportUsSlots = await loadJsonFiles(supportUsSlotsDir, '_content/supportUsSlots');

  return {
    supportUsData: supportUsSlots,
  };
}
