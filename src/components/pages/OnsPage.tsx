import { OnsContent } from '@/utils/fetch-ons-content';
import { useScrollToEventOnPageLoad } from '@/utils/scrollToEventOnPageLoad';

import ProgramPageLayout from '@/components/layout/ProgramPageLayout';
import EventsList from '@/components/events/EventsList';

type Props = {
  data: OnsContent;
};

const OnsPage: React.FC<Props> = ({ data }) => {
  useScrollToEventOnPageLoad(data.dateClusteredEvents);

  return (
    <ProgramPageLayout
      header={
        <h1>
          <span>One Night Stands</span>
          <span className='block'>Saisonales Programm</span>
        </h1>
      }
    >
      <EventsList dateClusteredEvents={data.dateClusteredEvents} dateVisible={true} />
    </ProgramPageLayout>
  );
};

export default OnsPage;
