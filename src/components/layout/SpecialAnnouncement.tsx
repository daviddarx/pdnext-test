import { SpecialAnnouncement } from '@/types/SpecialAnnouncement';

type Props = {
  data: SpecialAnnouncement;
};

const SpecialAnnouncement: React.FC<Props> = ({ data }) => {
  return (
    <article className='special-announcement'>
      <h2>Special Announcement</h2>
      <button>{data.buttonTitle}</button>
    </article>
  );
};

export default SpecialAnnouncement;
