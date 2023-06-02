import { OnsContent } from '@/utils/fetch-ons-content';
import { registerClusteredEvents } from '@/utils/set-clustered-events-prev-next';
import useScrollToEventOnPageLoad from '@/hooks/useScrollToEventOnPageLoad';

import ProgramPageLayout from '@/components/layout/ProgramPageLayout';
import EventsList from '@/components/events/EventsList';

type Props = {
  data: OnsContent;
};

const OnsPage: React.FC<Props> = ({ data }) => {
  useScrollToEventOnPageLoad(data.dateClusteredEvents);
  registerClusteredEvents(data.dateClusteredEvents);

  return (
    <ProgramPageLayout
      header={
        <h1>
          <span className='program-page__subtitle'>One Night Stands</span>
          <span>Saisonales Programm</span>
        </h1>
      }
    >
      <EventsList dateClusteredEvents={data.dateClusteredEvents} dateVisible={true} />
    </ProgramPageLayout>
  );
};

export default OnsPage;
