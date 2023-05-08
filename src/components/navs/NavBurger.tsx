import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiActions } from '@/store/';
import { uiStateType } from '@/store/ui-slice';

const NavBurger = () => {
  const dispatch = useDispatch();
  const topBarHeight = useSelector((state: uiStateType) => state.ui.topbarHeight);

  const [isVisible, setIsVisible] = useState(false);
  const [hasText, setHasText] = useState(true);
  const lastScrollTopRef = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > lastScrollTopRef.current) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    if (currentScrollTop > 50) {
      setHasText(false);
    } else {
      setHasText(true);
    }

    lastScrollTopRef.current = currentScrollTop;
  }, []);

  useEffect(() => {
    console.log('add listener');
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
      className={`nav-burger${isVisible ? '' : ' nav-burger--hidden'}${
        hasText ? '' : ' nav-burger--no-text'
      }`}
      style={{ '--h-topbar': `${topBarHeight}px` } as React.CSSProperties}
      onClick={toggleNavigation}
    >
      <span className='nav-burger__text'>NAV</span>

      <span className='nav-burger__icon'></span>

      <span className='nav-burger__hand nav-burger__hand--tl'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'>
          <path d='M11.35 3.51c-.248-.118-1.8-.745-3.375-1.392C3.943 2.39-.241 3.648-1.192 5.6c-.951 1.954-4.17 11.079 2.75 16.421l1.339.437 1.157-.119s.342-.58.482-1.103c.14-.525-1.375-.854-1.375-.854l-.353-2.321.027-.102c.201-.09.985-.435 1.309-.482.37-.051.829.326.829.326s.428.877.533 1.621c.108.741 1.24 2.216 1.698 2.796.455.583 1.693 1.64 1.693 1.64s1.782.816 2.084.639c.3-.173 1.5-.547 1.52-1 .019-.452-2.138-1.974-2.335-2.38-.196-.408-1.155-2.235-1.269-2.571-.113-.337-.383-1.987-.383-1.987l.864-.177s3.735 2.986 4.077 3.232c.34.243 3.092 1.389 3.52 1.503.428.115 3.782 1.674 4.017 1.737.24.065 1.284.345 1.435-.022.148-.367-.477-1.451-.665-1.706-.188-.252-2.797-1.922-3.151-2.12-.357-.194-2.66-1.679-3.013-1.876-.355-.197-3.097-3.275-3.097-3.275l1.305-.944s3.283 1.511 3.862 1.819c.496.262 1.916 1.575 2.393 2.121.521.28 1.711.588 2.297-.405.732-1.243-.31-1.908-.838-2.553-.55-.682-1.34-1.611-1.47-1.785-.09-.124-5.297-2.679-6.226-3.301.19-1.488 4.093.775 4.093.775 1.306.453 2.474-.086 2.776-.26.3-.173.56-1.327.528-1.59-.031-.262-2.2-.54-2.2-.54s-.425-.319-.743-.452c-.32-.138-1.662-1.001-2.028-1.152-.367-.15-1.855-.701-2.15-.934-.296-.233-2.302-.92-2.75-1.147Z' />
        </svg>
      </span>
      <span className='nav-burger__hand nav-burger__hand--br'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'>
          <path d='M38.183 46.38c.226.156 1.66 1.016 3.116 1.901 4.025.358 8.354-.231 9.598-2.013 1.244-1.782 5.843-10.294-.159-16.65l-1.255-.639-1.161-.063s-.429.52-.649 1.015c-.22.496 1.226 1.058 1.226 1.058l-.013 2.347-.043.097c-.213.058-1.04.276-1.368.272-.372-.007-.768-.451-.768-.451s-.286-.933-.274-1.685c.009-.749-.88-2.382-1.242-3.026-.358-.647-1.417-1.884-1.417-1.884s-1.633-1.083-1.959-.955c-.323.124-1.567.306-1.657.75-.089.445 1.804 2.283 1.936 2.715.13.434.792 2.388.853 2.738.06.35.069 2.022.069 2.022l-.88.04s-3.225-3.531-3.525-3.827c-.298-.293-2.838-1.853-3.243-2.033-.405-.18-3.475-2.243-3.698-2.342-.226-.1-1.215-.54-1.42-.2-.204.339.244 1.507.39 1.788.147.277 2.465 2.334 2.783 2.585.322.247 2.365 2.072 2.684 2.322.32.25 2.55 3.717 2.55 3.717l-1.436.73s-3.009-2.005-3.532-2.398c-.449-.337-1.648-1.855-2.033-2.469-.472-.357-1.6-.847-2.333.043-.917 1.113.009 1.933.43 2.652.437.76 1.074 1.8 1.174 1.992.07.137 4.816 3.471 5.637 4.23-.42 1.441-3.922-1.403-3.922-1.403-1.22-.65-2.458-.3-2.784-.174-.324.123-.76 1.223-.769 1.487-.01.264 2.089.877 2.089.877s.37.38.663.562c.295.186 1.487 1.248 1.825 1.454.34.204 1.723.98 1.978 1.257.257.276 2.13 1.268 2.539 1.561Z' />
        </svg>
      </span>
    </button>
  );
};

export default NavBurger;
