type EventProps = {
  title: String;
  hour: String;
  type: String;
};

const Event = ({ title, hour, type }: EventProps) => {
  return (
    <article className='event'>
      <h2 className='event__title '>
        {hour} - {title}
      </h2>
      <div className='event__hour'>{type}</div>
    </article>
  );
};

export default Event;
