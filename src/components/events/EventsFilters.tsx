import { useSelector, useDispatch } from 'react-redux';

import { eventsActions } from './../../../store/index.js';

const EventsFilters = () => {
  const dispatch = useDispatch();

  const typeFilters = useSelector((state: any) => state.events.typeFilters);
  const currentTypeFilter = useSelector((state: any) => state.events.currentTypeFilter);
  const dateFilters = useSelector((state: any) => state.events.dateFilters);
  const currentDateFilter = useSelector((state: any) => state.events.currentDateFilter);

  const filterType = (filterID: string) => {
    dispatch(eventsActions.filterType(filterID));
  };

  const filterDay = (filterID: string) => {
    dispatch(eventsActions.filterDay(filterID));
  };

  return (
    <div className='events-filters'>
      <div className='filters space-x-4'>
        {typeFilters.map((filter: any) => (
          <button
            key={filter}
            className={currentTypeFilter === filter ? 'bg-black text-white' : ''}
            onClick={filterType.bind(null, filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      {dateFilters.length > 2 && (
        <div className='filters space-x-4'>
          {dateFilters.map((filter: any) => (
            <button
              key={filter}
              className={currentDateFilter === filter ? 'bg-black text-white' : ''}
              onClick={filterDay.bind(null, filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsFilters;
