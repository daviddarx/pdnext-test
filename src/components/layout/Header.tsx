import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { uiActions } from '@/store';
import { CommonPageData } from '@/utils/fetch-common-page-content';

import SaveTheDate from '@/components/layout/SaveTheDate';
import SpecialAnnouncement from '@/components/layout/SpecialAnnouncement';
import PornyLogo from '@/components/logos/PornyLogo';

type Props = {
  commonPageData: CommonPageData;
};

const Header: React.FC<Props> = ({ commonPageData }) => {
  const dispatch = useDispatch();
  const topBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      dispatch(uiActions.setTopBarHeight(topBarRef.current?.offsetHeight));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return (
    <header className='header'>
      <div className='header__top-bar' ref={topBarRef}>
        <SaveTheDate data={commonPageData.saveTheDateData} />
        <SpecialAnnouncement data={commonPageData.specialAnnouncementData} />
      </div>

      <Link href='/festival-program' className='header__logo-link'>
        <h2 className='hidden'>Porny Days – Film Kunst Festival Zürich</h2>
        <PornyLogo className='header__logo' />
      </Link>
    </header>
  );
};

export default React.memo(Header);
