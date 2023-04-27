import { useSelector, useDispatch } from 'react-redux';

import { eventsActions } from '../../../store/index.js';

const EventsFilters = ({
  typeFilters,
  currentType,
  onFilterByType,
  dateFilters,
  currentDate,
  onFilterByDate,
}) => {
  return (
    <div className='events-filters'>
      <div className='filters space-x-4'>
        {typeFilters.map((filter) => (
          <button
            key={filter}
            className={currentType === filter ? 'bg-black text-white' : ''}
            onClick={onFilterByType.bind(null, filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      {dateFilters.length > 2 && (
        <div className='filters space-x-4'>
          {dateFilters.map((filter) => (
            <button
              key={filter}
              className={currentDate === filter ? 'bg-black text-white' : ''}
              onClick={onFilterByDate.bind(null, filter)}
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
