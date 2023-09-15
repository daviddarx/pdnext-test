import { useState, useEffect } from 'react';
import classNames from 'classnames';

import { EntryImage } from '@/types/Entry';
import LoadedImage from '@/components/ui/LoadedImage';

type Props = {
  title: string;
  images: EntryImage[];
};

const EntryGallery: React.FC<Props> = ({ title, images }) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    const galleryInterval = setInterval(() => {
      setCurrentId((previousId) => {
        return previousId < images.length ? previousId + 1 : 0;
      });
    }, 2500);
    return () => {
      clearInterval(galleryInterval);
    };
  }, [images, setCurrentId]);

  return (
    <div className='entry__gallery'>
      {images.map((image, i) => (
        <LoadedImage
          key={image.image + i}
          src={image.image}
          alt={title + ' ' + i}
          width={image.imageWidth}
          height={image.imageHeight}
          sizes='(min-width: 1280px) 50vw, 100vw'
          className={classNames('entry__gallery-image', {
            'entry__gallery-image--active': i + 1 === currentId,
            'entry__gallery-image--last': i === images.length - 1,
          })}
        />
      ))}
    </div>
  );
};

export default EntryGallery;
