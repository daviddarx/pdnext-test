import { PageProps } from '@/types/PageProps';
import { SupportUsSlot } from '@/types/SupportUsSlot';
import loadJsonFiles from '@/utils/load-json-files';

export async function fetchCommonPageContent(): Promise<PageProps> {
  const supportUsSlotsDir: SupportUsSlot[] = [];
  const supportUsSlots = await loadJsonFiles(supportUsSlotsDir, '_content/supportUsSlots');

  return {
    pageData: {
      pageTitle: '',
    },
    supportUsData: supportUsSlots,
  };
}
