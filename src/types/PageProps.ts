import { ProgramContent } from '@/utils/fetch-program-content';
import { ContentPageContent } from '@/types/ContentPageContent';
import { NewsContent } from '@/types/NewsContent';
import { ImpressionsContent } from '@/types/ImpressionsContent';
import { OnsContent } from '@/types/OnsContent';
import { SupportUsSlot } from '@/types/SupportUsSlot';

// retirer le ? de pageCotent aussi
// mettres les types contents dans un sous-dossier
// bouger cela dans le template de page?
export interface PageProps {
  page: {
    type: string;
    title: string;
    content?:
      | ProgramContent
      | ContentPageContent
      | NewsContent
      | NewsContent
      | ImpressionsContent
      | OnsContent;
  };
  supportUsData: SupportUsSlot[];
}
