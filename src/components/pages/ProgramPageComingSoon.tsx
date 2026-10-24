import React, { Fragment } from 'react';
import ProgramPageLayout from '@/components/layout/ProgramPageLayout';

const ProgramPageComingSoon: React.FC = () => {
  return (
    <ProgramPageLayout
      header={
        <Fragment>
          <h1>
            <span className='program-page__subtitle'>
              14. Porny Days <span className='program-page__subtitle-separation'>·</span>{' '}
              <span className='program-page__subtitle-date'>27. – 29. November 2026</span>
            </span>
            <span>Festival Programm</span>
          </h1>
        </Fragment>
      }
    >
      <div className='program-page__coming-soon text-content'>
        <p>Das Programm der 14. Porny Days wird Anfang November veröffentlicht.</p>
        <p>
          Das vollständige Programm der 13. Ausgabe ist{' '}
          <a href='https://archive-2025.pornydays.love' target='_blank'>
            im Archiv verfügbar
          </a>
        </p>
      </div>
    </ProgramPageLayout>
  );
};

export default React.memo(ProgramPageComingSoon);
