type EventProps = {
  title: String;
  hour: String;
  location: String;
  types: Array<String>;
  specialState: String;
};

const Event = ({ title, hour, location, types, specialState }: EventProps) => {
  return (
    <article className='event'>
      <h3 className='event__title '>{`${hour} - ${title}`}</h3>
      <div className='event__types'>{types.join(', ')}</div>
      <div className='event__location'>{location}</div>
      {specialState && <div className='event__special-state'>{specialState}</div>}
    </article>
  );
};

export default Event;
