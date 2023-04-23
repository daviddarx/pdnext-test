import { createSlice, current } from '@reduxjs/toolkit';

/**
 * Importing events
 */
const eventsList = [
  {
    id: 'e1',
    title: 'My event 1',
    date: new Date(2023, 10, 29, 20, 30),
    type: 'Film',
  },
  {
    id: 'e2',
    title: 'My event 2',
    date: new Date(2023, 10, 28, 20, 30),
    type: 'Film',
  },
  {
    id: 'e3',
    title: 'My event 3',
    date: new Date(2023, 10, 29, 21, 30),
    type: 'Musik',
  },
  {
    id: 'e4',
    title: 'My event 4',
    date: new Date(2023, 10, 28, 21, 30),
    type: 'Musik',
  },
  {
    id: 'e5',
    title: 'My event 5',
    date: new Date(2023, 10, 30, 21, 30),
    type: 'Workshop',
  },
];

/**
 * Completing events
 */

eventsList.sort((a, b) => a.date - b.date);

const eventsListCompleted = eventsList.map((event) => {
  return {
    ...event,
    date: {
      readable: event.date.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      filter: event.date
        .toLocaleDateString('de-DE', {
          weekday: 'short',
          day: 'numeric',
          month: 'numeric',
        })
        .replace('.,', '')
        .slice(0, -1),
      hour: event.date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
    },
  };
});

/**
 * Setting Filters
 */

const allTypesFilter = 'Alle';

const typeFilters = eventsListCompleted.reduce(
  (current, event) => {
    if (!current.includes(event.type)) {
      current.push(event.type);
    }
    return current;
  },
  [allTypesFilter],
);

const allDatesFilter = 'Alle Tage';

const dateFilters = eventsListCompleted.reduce(
  (current, event) => {
    if (!current.includes(event.date.filter)) {
      current.push(event.date.filter);
    }
    return current;
  },
  [allDatesFilter],
);

/**
 * Filtering functions
 */

const updateDateFilters = (typeFilter) => {
  const dateFilters = eventsListCompleted.reduce(
    (current, event) => {
      if (!current.includes(event.date.filter)) {
        if (event.type === typeFilter || typeFilter === allTypesFilter) {
          current.push(event.date.filter);
        }
      }
      return current;
    },
    [allDatesFilter],
  );

  return dateFilters;
};

const clusterEventsByDates = (currentType, currentDate, currentDatesFilters) => {
  let dateClusteredEvents;

  if (currentDate === allDatesFilter) {
    const currentDatesFiltersCopy = [...currentDatesFilters];
    currentDatesFiltersCopy.shift();

    dateClusteredEvents = currentDatesFiltersCopy.reduce((current, dateFilter) => {
      const dateItemEvents = eventsListCompleted.filter((event) => {
        if (currentType === allTypesFilter && currentDate == allDatesFilter) {
          return event.date.filter === dateFilter;
        } else {
          return event.date.filter === dateFilter && event.type === currentType;
        }
      });

      current.push({
        title: dateItemEvents[0].date.readable,
        events: dateItemEvents,
      });

      return current;
    }, []);
  } else {
    const events = eventsListCompleted.filter((event) => {
      if (currentType === allTypesFilter) {
        return event.date.filter === currentDate;
      } else {
        return event.type === currentType && event.date.filter === currentDate;
      }
    });
    dateClusteredEvents = [
      {
        title: events[0].date.readable,
        events: events,
      },
    ];
  }

  return dateClusteredEvents;
};

/**
 * Create slice
 */

const dateClusteredEvents = clusterEventsByDates(allTypesFilter, allDatesFilter, dateFilters);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    list: dateClusteredEvents,
    typeFilters: typeFilters,
    currentTypeFilter: allTypesFilter,
    dateFilters: dateFilters,
    currentDateFilter: allDatesFilter,
  },
  reducers: {
    filterType: (state, action) => {
      state.dateFilters = updateDateFilters(action.payload);
      state.currentTypeFilter = action.payload;
      state.currentDateFilter = allDatesFilter;
      state.list = clusterEventsByDates(
        state.currentTypeFilter,
        state.currentDateFilter,
        state.dateFilters,
      );
    },
    filterDay: (state, action) => {
      state.currentDateFilter = action.payload;
      state.list = clusterEventsByDates(
        state.currentTypeFilter,
        state.currentDateFilter,
        state.dateFilters,
      );
    },
  },
});

export default eventsSlice;
