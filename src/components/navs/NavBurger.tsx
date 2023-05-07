import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { uiActions } from '@/store/';

const NavBurger = () => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
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

  return (
    <button
      className={`nav-burger${isVisible ? '' : ' nav-burger--hidden'}`}
      onClick={toggleNavigation}
    >
      <span className='nav-burger__text'>Navigation</span>
      <span className='nav-burger__icon'></span>
    </button>
  );
};

export default NavBurger;
