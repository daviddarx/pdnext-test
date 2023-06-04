import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Entry } from '@/types/Entry';

import LoadedImage from '@/components/ui/LoadedImage';
import EntryGallery from './EntryGallery';

type Props = {
  entry: Entry;
};

const Entry: React.FC<Props> = ({ entry }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoaded = () => {
    setIsImageLoaded(true);
  };

  return (
    <article className='entry'>
      <div className='entry__col-full'>
        <div className='entry__image-container'>
          {entry.image && (
            <LoadedImage
              src={entry.image}
              alt={entry.title}
              width={entry.imageWidth}
              height={entry.imageHeight}
              className='entry__image'
              onLoaded={handleImageLoaded}
            />
          )}

          {entry.additionalImages && entry.additionalImages.length > 0 && isImageLoaded && (
            <EntryGallery title={entry.title} images={entry.additionalImages} />
          )}
        </div>
      </div>

      {/* {entry.videourl && <button>Play video</button>} */}

      {/* {entry.pornypickof && <div>Favorite of: {entry.pornypickof}</div>} */}

      <h3 className='entry__title'>{entry.title}</h3>
      <div className='entry__type'>
        {entry.entryType} {entry.typeComplement && <span> – {entry.typeComplement}</span>}
      </div>

      <ReactMarkdown className='text-content entry__desc' remarkPlugins={[remarkGfm]}>
        {entry.desc}
      </ReactMarkdown>
    </article>
  );
};

export default Entry;
