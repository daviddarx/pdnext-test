import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';

import eases from '@/utils/eases';
import Accordion from '@/components/ui/Accordion';
import CloseIcon from '@/components/icons/CloseIcon';

type Props = {
  className?: string;
  title: string;
  markdown: string;
};

const motionVariants = {
  initial: {
    opacity: 0,
    transform: 'translateY(calc(var(--gutter)*2)) translateZ(0)',
  },
  animate: {
    opacity: 1,
    transform: 'translateY(0) translateZ(0)',
    transition: {
      delay: 0.3,
      duration: 0.75,
      ease: eases.outQuart,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: eases.outQuart,
    },
  },
};

const ExpansableText: React.FC<Props> = ({ className = '', title, markdown }) => {
  return (
    <Accordion
      className={`expandable-text ${className}`}
      header={
        <h3 className='expandable-text__title content-page__column-left text-link'>
          <span className='align-text-v'>{title}</span>
          <CloseIcon className='expandable-text__close' />
        </h3>
      }
    >
      <motion.div initial='initial' animate='animate' exit='exit' variants={motionVariants}>
        <ReactMarkdown
          className='expandable-text__copy text-content content-page__column-left'
          remarkPlugins={[remarkGfm]}
        >
          {markdown}
        </ReactMarkdown>
      </motion.div>
    </Accordion>
  );
};

export default ExpansableText;
