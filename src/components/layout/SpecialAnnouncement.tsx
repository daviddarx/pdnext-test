import { Fragment, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import classNames from 'classnames';

import type { SpecialAnnouncement } from '@/types/SpecialAnnouncement';
import rehypeEmailObfuscate from '@/utils/rehype-email-obfuscate';

import Drawer from '@/components/ui/Drawer';
import ArrowIcon from '@/components/icons/ArrowIcon';

type Props = {
  data: SpecialAnnouncement;
};

const SpecialAnnouncement: React.FC<Props> = ({ data }) => {
  const [isOpened, setIsOpened] = useState(false);

  const open = () => {
    setIsOpened(true);
  };

  const close = () => {
    setIsOpened(false);
  };

  return (
    <Fragment>
      <article className='special-announcement'>
        <h2
          className={classNames('special-announcement__title header__top-bar-title', {
            'sr-only': data.hideTitle,
          })}
        >
          Special Announcement
        </h2>
        <button className='special-announcement__btn tag' onClick={open}>
          <span className='special-announcement__btn-text'>{data.buttonTitle}</span>{' '}
          <ArrowIcon className='special-announcement__btn-icon' />
        </button>
      </article>
      <Drawer isOpened={isOpened} onClose={close}>
        <div className='special-announcement-panel'>
          <span className='special-announcement-panel__subline'>Special Announcement</span>
          <h2 className='special-announcement-panel__title'>{data.title}</h2>

          <ReactMarkdown
            className='text-content special-announcement-panel__desc'
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeEmailObfuscate]}
          >
            {data.desc}
          </ReactMarkdown>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default SpecialAnnouncement;
