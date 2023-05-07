import { Fragment, useState, useEffect } from 'react';
import { Portal } from 'react-portal';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { SpecialAnnouncement } from '@/types/SpecialAnnouncement';

import Drawer from '@/components/ui/Drawer';

type Props = {
  data: SpecialAnnouncement;
};

const SpecialAnnouncement: React.FC<Props> = ({ data }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const open = () => {
    setIsOpened(true);
  };

  const close = () => {
    setIsOpened(false);
  };

  return (
    <Fragment>
      <article className='special-announcement'>
        <h2 className='special-announcement__title'>Special Announcement</h2>
        <button className='special-announcement__btn' onClick={open}>
          {data.buttonTitle}
        </button>
      </article>
      {isMounted && (
        <Portal>
          <Drawer isOpened={isOpened} onClose={close}>
            <div className='special-announcement-panel'>
              <span className='special-announcement-panel__subline'>Special Announcement</span>
              <h2 className='special-announcement-panel__title'>{data.title}</h2>
              <ReactMarkdown
                className='special-announcement-panel__desc'
                remarkPlugins={[remarkGfm]}
              >
                {data.desc}
              </ReactMarkdown>
            </div>
          </Drawer>
        </Portal>
      )}
    </Fragment>
  );
};

export default SpecialAnnouncement;
