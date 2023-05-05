import { ContentPageContent } from '@/types/ContentPageContent';
import { SupportUsSlot } from '@/types/SupportUsSlot';
import { ProgramContent } from '@/utils/fetch-program-content';

export interface PageProps {
  pageData: {
    pageTitle: string;
    pageContent?: ProgramContent | ContentPageContent;
  };
  supportUsData: SupportUsSlot[];
}
