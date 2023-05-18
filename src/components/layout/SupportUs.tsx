import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';

import eases from '@/utils/eases';
import { uiStateType } from '@/store/ui-slice';
import { SupportUsSlot } from '@/types/SupportUsSlot';

import HeartIcon from '@/components/icons/HeartIcon';
import CloseIcon from '@/components/icons/CloseIcon';
import Accordion from '@/components/ui/Accordion';

const motionVariants = {
  initial: {
    opacity: 0,
    transform: 'translateY(calc(var(--gutter)*2)) translateZ(0)',
  },
  animate: (x: number) => ({
    opacity: 1,
    transform: 'translateY(0) translateZ(0)',
    transition: {
      delay: 0.3 + x * 0.1,
      duration: 0.75,
      ease: eases.outQuart,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: eases.outQuart,
    },
  },
};

type TimeoutType = ReturnType<typeof setTimeout>;

type Props = {
  data: SupportUsSlot[];
};

const SupportUs = ({ data }: Props) => {
  const supportUsRef = useRef<HTMLDivElement>(null);

  const isSupportUsOpened = useSelector((state: uiStateType) => state.ui.isSupportUsOpened);

  data.sort((a, b) => a.position - b.position);

  const scrollIntoView = useCallback((isOpened: boolean): TimeoutType => {
    /* delay needed because accordion animation has influence on the scroll behavior */
    const scrollTimeout = setTimeout(() => {
      if (isOpened) {
        supportUsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);

    return scrollTimeout;
  }, []);

  useEffect(() => {
    const scrollTimeout = scrollIntoView(isSupportUsOpened);

    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [scrollIntoView, isSupportUsOpened]);

  const onAccordionToggle = (isOpened: boolean) => {
    if (isOpened) {
      scrollIntoView(true);
    }
  };

  return (
    <div className='support-us dark' ref={supportUsRef}>
      <Accordion
        header={
          <h2 className='support-us__title '>
            Unterstützen Sie uns
            <HeartIcon className='support-us__heart' />
            <CloseIcon className='support-us__close' />
          </h2>
        }
        isOpenedExt={isSupportUsOpened}
        onToggle={onAccordionToggle}
      >
        <div className='support-us__content '>
          <div className='support-us__content-container'>
            {data.map((item, index) => (
              <motion.div
                className='support-us__slot'
                key={item.title}
                initial='initial'
                animate='animate'
                exit='exit'
                variants={motionVariants}
                custom={index}
              >
                <h3 className='support-us__slot-title'>{item.title}</h3>
                <ReactMarkdown
                  className='text-content support-us__slot-desc'
                  remarkPlugins={[remarkGfm]}
                >
                  {item.desc}
                </ReactMarkdown>
                {item.paypal && (
                  <form
                    className='support-us__paypal'
                    action='https://www.paypal.com/cgi-bin/webscr'
                    method='post'
                    target='_top'
                    style={{ height: '47px' }}
                  >
                    <input type='hidden' name='cmd' value='_s-xclick' />
                    <input type='hidden' name='hosted_button_id' value='J96E96JPAAKPE' />
                    <input
                      type='image'
                      src='https://www.paypalobjects.com/de_DE/CH/i/btn/btn_subscribeCC_LG.gif'
                      name='submit'
                      alt='Jetzt einfach, schnell und sicher online bezahlen – mit PayPal.'
                    />
                  </form>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default SupportUs;
