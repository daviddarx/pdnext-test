import Image from 'next/image';
import Link from 'next/link';

import { ImpressionsContent } from '@/utils/fetch-impressions-content';

import PageHeader from '@/components/layout/PageHeader';

type Props = {
  data: ImpressionsContent;
};

const ImpressionsPage: React.FC<Props> = ({ data }) => {
  const checkIfGalleryLink = (e: React.MouseEvent) => {
    const href = e.currentTarget.getAttribute('href');

    if (!href?.includes('/gallery')) {
      alert('video player');
      e.preventDefault();
    }
  };

  return (
    <section className='impressions-page'>
      <PageHeader subline='Impressionen' title="Wenn niemand zuschaut, macht's kein Spass" />
      <div className='impressions-page__impressions'>
        {data.impressions.map((item) => (
          <article key={item.date + item.title} className='impression'>
            <Link href={item.link} onClick={checkIfGalleryLink}>
              <div className='impression__image'>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={item.imageWidth}
                  height={item.imageHeight}
                />
              </div>
              <div className='impression__infos'>
                <span className='impression__details'>
                  {item.date} – {item.type}
                </span>
                <h2 className='impression__title'>{item.titleFormated}</h2>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ImpressionsPage;
