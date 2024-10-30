import React, { useRef, useCallback } from 'react';

import { ContentPageContent } from '@/utils/fetch-content-page-content';
import { Timeout } from '@/types/Timeout';

import HeartIcon from '@/components/icons/HeartIcon';
import CloseIcon from '@/components/icons/CloseIcon';
import Accordion from '@/components/ui/Accordion';
import ContentSlot from '@/components/layout/ContentSlot';

type Props = {
  data: ContentPageContent;
};

const SupportUs = ({ data }: Props) => {
  const supportUsRef = useRef<HTMLDivElement>(null);

  const scrollIntoView = useCallback((isOpened: boolean): Timeout => {
    /* delay needed because accordion animation has influence on the scroll behavior */
    const scrollTimeout = setTimeout(() => {
      if (isOpened) {
        supportUsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);

    return scrollTimeout;
  }, []);

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
            <span className='inline-block'>
              <span className='support-us__headline'>Verhilf uns zu unserem Höhepunkt</span>
              <HeartIcon className='support-us__heart' />
            </span>
            <CloseIcon className='support-us__close' />
          </h2>
        }
        onToggle={onAccordionToggle}
      >
        <div className='support-us__content'>
          <div className='support-us__content-container content-page text-content mt-0 pt-0'>
            {data.contentSlot?.map((slot) => (
              <ContentSlot slot={slot} key={slot.title} className='mt-0' />
            ))}
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default SupportUs;
