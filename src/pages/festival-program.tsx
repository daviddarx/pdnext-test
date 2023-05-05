import { useState } from 'react';
import { GetStaticProps, NextPage } from 'next';

import { fetchProgramContent } from '@/utils/fetch-program-content';
import { fetchCommonPageContent } from '@/utils/fetch-common-page-content';

import { PageProps } from '@/types/PageProps';
import { DateClusteredEvents } from '@/types/DateClusteredEvents';

import Layout from '@/components/layout/Layout';
import Metas from '@/components/layout/Metas';
import EventsFilters from '@/components/events/EventsFilters';
import EventsList from '@/components/events/EventsList';

const allTypesFilter = 'Alle';
const allDatesFilter = 'Alle Tage';

const Page: NextPage<PageProps> = ({ pageData, supportUsData }) => {
  const dateClusteredEvents = pageData.pageContent!.dateClusteredEvents;
  const entryTypes = pageData.pageContent!.entryTypes;

  const [currentType, setCurrentType] = useState(allTypesFilter);
  const [currentDate, setCurrentDate] = useState(allDatesFilter);

  const typeFilters = entryTypes.reduce(
    (current, type) => {
      current.push(type.titlePlurial);
      return current;
    },
    [allTypesFilter],
  );

  const currentTypeTitle = entryTypes.find(
    (type) => type.titlePlurial === currentType,
  )?.title; /* returns undefined for allTypesFilter, which isn't an object */

  const dateFilters = dateClusteredEvents.reduce(
    (current, date) => {
      if (
        currentTypeTitle === undefined ||
        date.events.some((event) => event.types.includes(currentTypeTitle))
      ) {
        if (date.dateFilter) current.push(date.dateFilter);
      }
      return current;
    },
    [allDatesFilter],
  );

  const filteredEvents = dateClusteredEvents.reduce(
    (current: DateClusteredEvents[], date: DateClusteredEvents) => {
      if (currentDate === allDatesFilter || date.dateFilter === currentDate) {
        const processedDate = { ...date };

        if (currentTypeTitle) {
          processedDate.events = date.events.filter((event) =>
            event.types.includes(currentTypeTitle),
          );
        }

        if (processedDate.events.length > 0) {
          current.push(processedDate);
        }
      }
      return current;
    },
    [],
  );

  const filterByType = (type: string) => {
    setCurrentType(type);
    setCurrentDate(allDatesFilter);
  };

  const filterByDate = (date: string) => {
    setCurrentDate(date);
  };

  return (
    <Layout supportUsData={supportUsData}>
      <Metas title={pageData.pageTitle} />
      <section>
        <h1>
          <span>
            10. Porny Days
            <br />
            23. — 27. Nov. 2022
          </span>
          <span className='block'>Festival Programm</span>
        </h1>
        <EventsFilters
          typeFilters={typeFilters}
          currentType={currentType}
          onFilterByType={filterByType}
          dateFilters={dateFilters}
          currentDate={currentDate}
          onFilterByDate={filterByDate}
        />
        <EventsList dateClusteredEvents={filteredEvents} />
      </section>
    </Layout>
  );
};

export default Page;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const programContent = await fetchProgramContent();
  const commonPageContent = await fetchCommonPageContent();

  const pageContent: PageProps = {
    pageData: {
      pageTitle: 'Festival Programm',
      pageContent: programContent,
    },
    supportUsData: commonPageContent.supportUsData,
  };

  return {
    props: pageContent,
  };
};
