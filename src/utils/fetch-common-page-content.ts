import { routes } from '@/routes/routes';
import { SaveTheDate } from '@/types/SaveTheDate';
import { SpecialAnnouncement } from '@/types/SpecialAnnouncement';
import { fetchContentPageContent, ContentPageContent } from '@/utils/fetch-content-page-content';
import { PartnersType } from '@/types/Partners';
import { Settings } from '@/types/Settings';

export type CommonPageData = {
  saveTheDateData: SaveTheDate;
  specialAnnouncementData: SpecialAnnouncement;
  supportUsData: ContentPageContent;
  partnersData: PartnersType;
  settingsData: Settings;
};

export async function fetchCommonPageContent(): Promise<CommonPageData> {
  const supportUs = await fetchContentPageContent(routes.secondary.support.json);

  const partners = require('../../_content/partners/partners.json') as PartnersType;

  const specialAnnouncement =
    require('../../_content/specialAnnouncement/specialannouncement.json') as SpecialAnnouncement;

  const saveTheDate = require('../../_content/saveTheDate/saveTheDate.json') as SaveTheDate;

  const settings = require('../../_content/settings/settings.json') as Settings;

  return {
    saveTheDateData: saveTheDate,
    specialAnnouncementData: specialAnnouncement,
    supportUsData: supportUs,
    partnersData: partners,
    settingsData: settings,
  };
}
