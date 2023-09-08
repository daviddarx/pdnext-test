import React, { useRef, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '@/store';
import { CommonPageData } from '@/utils/fetch-common-page-content';

import ActiveLink from '@/components/ui/ActiveLink';
import SaveTheDate from '@/components/layout/SaveTheDate';
import SpecialAnnouncement from '@/components/layout/SpecialAnnouncement';
import PornyLogo from '@/components/logos/PornyLogo';

type Props = {
  commonPageData: CommonPageData;
};

const Header: React.FC<Props> = ({ commonPageData }) => {
  const dispatch = useDispatch();

  const topbarHeight = useRef(0);
  const lastScrollTopRef = useRef(0);
  const topBarRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const currentScrollTop = Math.max(window.scrollY, 0);

    if (currentScrollTop > lastScrollTopRef.current) {
      dispatch(uiActions.setBurgerVisibility(false));
    } else {
      dispatch(uiActions.setBurgerVisibility(true));
    }

    if (currentScrollTop > 50) {
      dispatch(uiActions.setBurgerTextVisibility(false));
    } else {
      dispatch(uiActions.setBurgerTextVisibility(true));
    }

    lastScrollTopRef.current = currentScrollTop;

    let visibleTopbarHeight = topbarHeight.current - window.scrollY;

    if (visibleTopbarHeight < 0) {
      visibleTopbarHeight = 0;
    } else if (visibleTopbarHeight > topbarHeight.current) {
      visibleTopbarHeight = topbarHeight.current;
    }

    if (document?.body) {
      document.body.style.setProperty('--height-topbar', visibleTopbarHeight + 'px');
    }
  }, [dispatch]);

  const handleResize = useCallback(() => {
    if (topBarRef.current) {
      topbarHeight.current = topBarRef.current.offsetHeight;

      handleScroll();
    }
  }, [handleScroll]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleResize();
    handleScroll();

    dispatch(uiActions.setBurgerVisibility(true));

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleResize, handleScroll, dispatch]);

  return (
    <header className='header'>
      {(!commonPageData.saveTheDateData.disable ||
        !commonPageData.specialAnnouncementData.disable) && (
        <div className='header__top-bar' ref={topBarRef}>
          {!commonPageData.saveTheDateData.disable && (
            <SaveTheDate data={commonPageData.saveTheDateData} />
          )}
          {!commonPageData.specialAnnouncementData.disable && (
            <SpecialAnnouncement data={commonPageData.specialAnnouncementData} />
          )}
        </div>
      )}
      <ActiveLink
        href='/festival-program'
        className='header__logo-link'
        aria-label='Zur Startseite'
      >
        <h2 className='hidden'>Porny Days – Film Kunst Festival Zürich</h2>
        <PornyLogo className='header__logo' />
      </ActiveLink>
    </header>
  );
};

export default React.memo(Header);
