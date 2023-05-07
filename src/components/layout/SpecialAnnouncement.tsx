import { SpecialAnnouncement } from '@/types/SpecialAnnouncement';

type Props = {
  data: SpecialAnnouncement;
};

const SpecialAnnouncement: React.FC<Props> = ({ data }) => {
  return (
    <article className='special-announcement'>
      <h2 className='special-announcement__title'>Special Announcement</h2>
      <button className='special-announcement__btn'>{data.buttonTitle}</button>
    </article>
  );
};

export default SpecialAnnouncement;
