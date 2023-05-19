import { Fragment, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';

import drawerChildreMotionVariants from '@/utils/drawer-children-animation';
import { SpecialAnnouncement } from '@/types/SpecialAnnouncement';

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
        <h2 className='special-announcement__title'>Special Announcement</h2>
        <button className='special-announcement__btn' onClick={open}>
          <span className='special-announcement__btn-text'>{data.buttonTitle}</span>{' '}
          <ArrowIcon className='special-announcement__btn-icon' />
        </button>
      </article>
      <Drawer isOpened={isOpened} onClose={close}>
        <div className='special-announcement-panel'>
          <motion.div
            key='header'
            initial='initial'
            animate='animate'
            variants={drawerChildreMotionVariants}
            custom={0}
          >
            <span className='special-announcement-panel__subline'>Special Announcement</span>
            <h2 className='special-announcement-panel__title'>{data.title}</h2>
          </motion.div>
          <motion.div
            key='desc'
            initial='initial'
            animate='animate'
            variants={drawerChildreMotionVariants}
            custom={1}
          >
            <ReactMarkdown
              className='text-content special-announcement-panel__desc'
              remarkPlugins={[remarkGfm]}
            >
              {data.desc}
            </ReactMarkdown>
          </motion.div>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default SpecialAnnouncement;
