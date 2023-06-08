import { motion } from 'framer-motion';
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
  return (
    <motion.button
      className={`background-overlay${dark ? ' background-overlay__dark' : ''}`}
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
