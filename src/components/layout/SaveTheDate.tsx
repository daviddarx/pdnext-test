import { SaveTheDate } from '@/types/SaveTheDate';

type Props = {
  data: SaveTheDate;
};

const SaveTheDate: React.FC<Props> = ({ data }) => {
  return (
    <article className='save-the-date'>
      <h2 className='save-the-date__title header__top-bar-title'>{data.title}</h2>
      <span>{data.message}</span>
    </article>
  );
};

export default SaveTheDate;
