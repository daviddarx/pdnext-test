import loadJsonFiles from '@/utils/load-json-files';

import { SaveTheDate } from '@/types/SaveTheDate';
import { SpecialAnnouncement } from '@/types/SpecialAnnouncement';
import { SupportUsSlot } from '@/types/SupportUsSlot';
import { PartnersType } from '@/types/Partners';
import { Settings } from '@/types/Settings';

export type CommonPageData = {
  saveTheDateData: SaveTheDate;
  specialAnnouncementData: SpecialAnnouncement;
  supportUsData: SupportUsSlot[];
  partnersData: PartnersType;
  settingsData: Settings;
};

export async function fetchCommonPageContent(): Promise<CommonPageData> {
  const supportUsSlotsDir: SupportUsSlot[] = [];
  const supportUsSlots = await loadJsonFiles(supportUsSlotsDir, '_content/supportUsSlots');

  const partners = require('../../_content/partners/partners.json') as PartnersType;

  const specialAnnouncement =
    require('../../_content/specialAnnouncement/specialannouncement.json') as SpecialAnnouncement;

  const saveTheDate = require('../../_content/saveTheDate/saveTheDate.json') as SaveTheDate;

  const settings = require('../../_content/settings/settings.json') as Settings;

  return {
    saveTheDateData: saveTheDate,
    specialAnnouncementData: specialAnnouncement,
    supportUsData: supportUsSlots,
    partnersData: partners,
    settingsData: settings,
  };
}
