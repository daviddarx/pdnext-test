import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';

import eases from '@/utils/eases';
import { uiStateType } from '@/store/ui-slice';
import { SupportUsSlot } from '@/types/SupportUsSlot';
import { Timeout } from '@/types/Timeout';

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

type Props = {
  data: SupportUsSlot[];
};

const SupportUs = ({ data }: Props) => {
  const supportUsRef = useRef<HTMLDivElement>(null);

  const isSupportUsOpened = useSelector((state: uiStateType) => state.ui.isSupportUsOpened);

  data.sort((a, b) => a.position - b.position);

  const scrollIntoView = useCallback((isOpened: boolean): Timeout => {
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
          <h2 className='support-us__title text-link'>
            <span className='inline-block align-text-v'>
              <span className='support-us__headline'>Verhilf uns zu unserem Höhepunkt</span>
              <HeartIcon className='support-us__heart' />
            </span>
            <CloseIcon className='support-us__close' />
          </h2>
        }
        isOpenedExt={isSupportUsOpened}
        onToggle={onAccordionToggle}
      >
        <div className='support-us__content'>
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
                  <a
                    href='https://www.paypal.com/paypalme/pornydays?country.x=CH&locale.x=de_DE'
                    target='_blank'
                    className='support-us__paypal-button'
                  >
                    Mit PayPal spenden
                  </a>
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
