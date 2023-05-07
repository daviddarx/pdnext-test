import { OnsContent } from '@/utils/fetch-ons-content';

import EventsList from '@/components/events/EventsList';

type Props = {
  data: OnsContent;
};

const OnsPage: React.FC<Props> = ({ data }) => {
  return (
    <section>
      <h1>
        <span>One Night Stands</span>
        <span className='block'>Saisonales Programm</span>
      </h1>

      <EventsList dateClusteredEvents={data.dateClusteredEvents} dateVisible={true} />
    </section>
  );
};

export default OnsPage;
