import { useDispatch } from 'react-redux';

import { uiActions } from '@/store';
import { ImpressionsContent } from '@/utils/fetch-impressions-content';

import PageHeader from '@/components/layout/PageHeader';
import LoadedImage from '@/components/ui/LoadedImage';
import ActiveLink from '@/components/ui/ActiveLink';

type Props = {
  data: ImpressionsContent;
};

const ImpressionsPage: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const checkIfGalleryLink = (e: React.MouseEvent) => {
    const href = e.currentTarget.getAttribute('href');

    if (href && !href.includes('/gallery')) {
      if (
        href.indexOf('youtube') !== -1 ||
        href.indexOf('vimeo') !== -1 ||
        href.indexOf('pornydays') !== -1
      ) {
        dispatch(uiActions.openVideo(href));
        e.preventDefault();
      }
      e.preventDefault();
    }
  };

  return (
    <section className='content-page impressions-page'>
      <PageHeader subline='Impressionen' title="Wenn niemand zuschaut, macht's keinen Spass" />
      <div className='impressions-page__impressions'>
        {data.impressions.map((item) => (
          <article key={item.date + item.title} className='impression'>
            <ActiveLink href={item.link} onClick={checkIfGalleryLink} className='impression__link'>
              <div className='impression__image'>
                <LoadedImage
                  src={item.image}
                  alt={item.title}
                  width={item.imageWidth}
                  height={item.imageHeight}
                  sizes='(min-width: 1920px) 33vw, (min-width: 768px) 50vw, 100vw'
                />
              </div>
              <div className='impression__infos'>
                <span className='impression__details'>
                  {item.date} – {item.type}
                </span>
                <h2 className='impression__title'>{item.titleFormated}</h2>
              </div>
            </ActiveLink>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ImpressionsPage;
