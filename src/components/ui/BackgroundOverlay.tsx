import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { uiStateType } from '@/store/ui-slice';
import eases from '@/utils/eases';

const motionVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: eases.outQuint,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.35,
    },
  },
};

type Props = {
  dark?: boolean;
  onClick: () => void;
};

const BackgroundOverlay: React.FC<Props> = ({ dark, onClick }) => {
  const isDark = useSelector((state: uiStateType) => state.ui.isDark);

  return (
    <motion.button
      className={classNames('background-overlay', {
        'background-overlay__dark': dark,
        'background-overlay__black': isDark,
      })}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={motionVariants}
      onClick={onClick}
    >
      <span className='sr-only'>Schliessen</span>
    </motion.button>
  );
};

export default BackgroundOverlay;
