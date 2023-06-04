import { useState, useEffect } from 'react';

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
          className={`entry__gallery-image ${
            i + 1 === currentId ? 'entry__gallery-image--active' : ''
          } ${i === images.length - 1 ? 'entry__gallery-image--last' : ''}`.trim()}
        />
      ))}
    </div>
  );
};

export default EntryGallery;
