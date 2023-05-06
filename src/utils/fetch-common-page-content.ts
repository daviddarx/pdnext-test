import loadJsonFiles from '@/utils/load-json-files';

import { PartnersType } from '@/types/Partners';
import { SupportUsSlot } from '@/types/SupportUsSlot';

export type CommonPageData = {
  supportUsData: SupportUsSlot[];
  partnersData: PartnersType;
};

export async function fetchCommonPageContent(): Promise<CommonPageData> {
  const supportUsSlotsDir: SupportUsSlot[] = [];
  const supportUsSlots = await loadJsonFiles(supportUsSlotsDir, '_content/supportUsSlots');

  const partners = require('../../_content/partners/partners.json') as PartnersType;

  return {
    supportUsData: supportUsSlots,
    partnersData: partners,
  };
}
