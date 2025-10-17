import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { uiActions } from '@/store';
import type { Entry } from '@/types/Entry';

import LoadedImage from '@/components/ui/LoadedImage';
import EntryGallery from './EntryGallery';

type Props = {
  entry: Entry;
};

const Entry: React.FC<Props> = ({ entry }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const dispatch = useDispatch();

  const handleImageLoaded = () => {
    setIsImageLoaded(true);
  };

  const buildDescriptionContent = () => {
    let authorPart = '';
    if (entry.authorName || entry.authorCountry || entry.yearOfProduction || entry.duration) {
      if (entry.authorName) {
        authorPart += `${entry.authorName}  \n`;
      }
      if (entry.authorCountry || entry.yearOfProduction || entry.duration) {
        const parts = [entry.authorCountry, entry.yearOfProduction, entry.duration].filter(Boolean);
        authorPart += parts.join(', ') + '.\n\n';
      }
    }

    return authorPart + entry.desc;
  };

  const launchVideo = (e: React.MouseEvent<HTMLAnchorElement>, videoURL: string) => {
    //check if entry's video forces video to open in a blank window (because of vimeo confidentiality)
    if (entry.forceBlank !== true) {
      if (
        videoURL.indexOf('youtube') !== -1 ||
        videoURL.indexOf('vimeo') !== -1 ||
        videoURL.indexOf('pornydays') !== -1
      ) {
        dispatch(uiActions.openVideo(videoURL));
        e.preventDefault();
      }
    }
  };

  return (
    <article className='entry'>
      <div className='entry__col-full'>
        <div className='entry__medias'>
          <div className='entry__image-container'>
            {entry.image && (
              <LoadedImage
                src={entry.image}
                alt={entry.title}
                width={entry.imageWidth}
                height={entry.imageHeight}
                sizes='(min-width: 1920px) 1280px, (min-width: 1280px) 50vw, 100vw'
                priority={true}
                className='entry__image'
                onLoaded={handleImageLoaded}
              />
            )}

            {entry.additionalImages && entry.additionalImages.length > 0 && isImageLoaded && (
              <EntryGallery title={entry.title} images={entry.additionalImages} />
            )}
          </div>

          {entry.videourl && (
            <a
              href={entry.videourl}
              onClick={(e) => launchVideo(e, entry.videourl!)}
              target='_blank'
              className='entry__play-button'
            >
              <span className='play-button'>{entry.videourl}</span>
            </a>
          )}

          {/* {entry.pornypickof && <div>Favorite of: {entry.pornypickof}</div>} */}
        </div>
      </div>

      <h3 className='entry__title title-effect'>{entry.title}</h3>
      <div className='entry__type'>
        {entry.entryType} {entry.typeComplement && <span> – {entry.typeComplement}</span>}
      </div>

      <ReactMarkdown className='text-content entry__desc' remarkPlugins={[remarkGfm]}>
        {buildDescriptionContent()}
      </ReactMarkdown>

      {entry.warning && (
        <ReactMarkdown className='text-content entry__warning' remarkPlugins={[remarkGfm]}>
          {entry.warning}
        </ReactMarkdown>
      )}
    </article>
  );
};

export default Entry;
