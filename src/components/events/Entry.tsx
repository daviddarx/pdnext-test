import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Entry } from '@/types/Entry';

import LoadedImage from '@/components/ui/LoadedImage';

type Props = {
  entry: Entry;
};

const Entry: React.FC<Props> = ({ entry }) => {
  return (
    <article className='entry mt-gutter-2 pb-gutter'>
      <div className='-ml-gutter -mr-gutter'>
        <div className='relative aspect-video overflow:hidden'>
          {entry.image && (
            <LoadedImage
              src={entry.image}
              alt={entry.title}
              width={entry.imageWidth}
              height={entry.imageHeight}
              className='absolute top-0 left-0 w-full h-full object-cover'
            />
          )}
        </div>
      </div>
      {entry.videourl && <button>Play video</button>}

      {entry.pornypickof && <div>Favorite of: {entry.pornypickof}</div>}

      <h3 className='mt-gutter'>{entry.title}</h3>
      <p>
        {entry.entryType} {entry.typeComplement && <span> – {entry.typeComplement}</span>}
      </p>

      <ReactMarkdown className='mt-gutter' remarkPlugins={[remarkGfm]}>
        {entry.desc}
      </ReactMarkdown>
    </article>
  );
};

export default Entry;
