import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '@/store/';
import { uiStateType } from '@/store/ui-slice';

const NavBurger = () => {
  const dispatch = useDispatch();
  const topBarHeight = useSelector((state: uiStateType) => state.ui.topbarHeight);

  const [isVisible, setIsVisible] = useState(false);
  const lastScrollTopRef = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > lastScrollTopRef.current) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    lastScrollTopRef.current = currentScrollTop;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const toggleNavigation = () => {
    dispatch(uiActions.toggleNavigation());
  };

  useEffect(() => {
    setIsVisible(true);
  }, [topBarHeight]);

  return (
    <button
      className={`nav-burger${isVisible ? '' : ' nav-burger--hidden'}`}
      style={{ '--h-topbar': `${topBarHeight}px` } as React.CSSProperties}
      onClick={toggleNavigation}
    >
      <span className='nav-burger__text'>Navigation</span>

      <span className='nav-burger__icon'></span>
    </button>
  );
};

export default NavBurger;
