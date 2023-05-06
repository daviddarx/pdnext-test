import React from 'react';

type Props = {
  typeFilters: string[];
  currentType: string;
  onFilterByType: (type: string) => void;
  dateFilters: string[];
  currentDate: string;
  onFilterByDate: (date: string) => void;
};

const EventsFilters: React.FC<Props> = (props) => {
  return (
    <div className='events-filters'>
      <div className='events-filters__filter'>
        {props.typeFilters.map((filter) => (
          <button
            key={filter}
            className={props.currentType === filter ? 'bg-black text-white' : ''}
            onClick={props.onFilterByType.bind(null, filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      {props.dateFilters.length > 2 && (
        <div className='events-filters__filter'>
          {props.dateFilters.map((filter) => (
            <button
              key={filter}
              className={props.currentDate === filter ? 'bg-black text-white' : ''}
              onClick={props.onFilterByDate.bind(null, filter)}
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
