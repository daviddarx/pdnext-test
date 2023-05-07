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
      <svg className='nav-burger__icon' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'>
        <path
          fill='#070D0D'
          fillRule='evenodd'
          d='M24.443 48a23.89 23.89 0 0 0 11.898-3.153c-.06-.028-.11-.053-.147-.072-.188-.095-.633-.411-1.056-.712-.374-.266-.731-.52-.876-.596-.306-.159-.705-.51-.705-.51s-2.14-.448-2.15-.712c-.01-.264.338-1.394.652-1.542.314-.15 1.521-.596 2.788-.041 0 0 3.713 2.564 4.019 1.095-.508-.401-2.392-1.56-3.906-2.492-1.102-.678-2.007-1.235-2.04-1.29-.055-.087-.245-.355-.483-.69-.262-.372-.583-.825-.842-1.204a6.363 6.363 0 0 0-.285-.368c-.481-.592-1.032-1.27-.35-2.244.663-.944 1.825-.542 2.323-.223.431.582 1.744 2.003 2.218 2.304.552.352 3.707 2.118 3.707 2.118l1.375-.84s-2.49-3.283-2.83-3.508c-.16-.107-.74-.541-1.34-.99-.657-.493-1.337-1.002-1.515-1.117-.337-.226-2.806-2.097-2.974-2.362-.168-.27-.705-1.399-.528-1.753.178-.354 1.198.007 1.432.09.097.035.738.385 1.473.787.991.541 2.154 1.177 2.394 1.262.418.148 3.071 1.507 3.391 1.776.322.272 3.81 3.543 3.81 3.543l.874-.108s-.139-1.666-.225-2.01c-.06-.236-.457-1.196-.755-1.915a47.305 47.305 0 0 1-.307-.75c-.069-.174-.458-.567-.887-.999-.604-.608-1.285-1.294-1.253-1.557.042-.342.759-.584 1.239-.746.152-.052.28-.095.355-.13.315-.154 2.027.8 2.027.8s1.151 1.152 1.558 1.768c.236.354.672 1.02 1.01 1.665.593-2.089.91-4.294.91-6.574 0-13.255-10.745-24-24-24a23.89 23.89 0 0 0-13.84 4.39l.681.28c1.027.419 1.853.756 2.028.84.181.091.616.258 1.089.44.7.267 1.485.568 1.662.707.24.19 1.275.592 1.847.815l.303.118c.194.08.663.36 1.108.627.394.236.77.46.92.526.318.133.744.452.744.452s2.168.278 2.2.54c.03.263-.228 1.417-.53 1.59-.3.174-1.469.713-2.776.26 0 0-3.903-2.263-4.092-.775.537.36 2.508 1.367 4.09 2.176 1.152.59 2.098 1.073 2.136 1.125.062.083.272.335.535.651.292.35.647.776.935 1.133.093.114.2.227.313.344.526.552 1.129 1.185.525 2.21-.586.993-1.776.684-2.297.405-.476-.546-1.897-1.859-2.393-2.122-.579-.307-3.863-1.818-3.863-1.818l-1.304.944s2.742 3.078 3.097 3.275c.169.094.782.482 1.415.882a59.81 59.81 0 0 0 1.598.994c.174.098.897.553 1.608 1.02a3 3 0 1 1-.731 2.172l-.027-.011c-1.03-.462-2.24-1.004-2.485-1.07-.429-.114-3.181-1.26-3.521-1.503-.342-.246-4.077-3.232-4.077-3.232l-.864.177s.27 1.65.383 1.987c.078.23.55 1.155.904 1.849.164.321.303.593.365.722.082.169.502.53.963.927.65.558 1.383 1.188 1.372 1.453-.015.344-.71.642-1.176.842a3.894 3.894 0 0 0-.344.158c-.302.177-2.084-.639-2.084-.639s-1.238-1.057-1.693-1.64c-.457-.58-1.59-2.055-1.698-2.796-.105-.744-.533-1.62-.533-1.62s-.46-.378-.83-.327c-.323.047-1.107.391-1.308.482l-.028.102.354 2.32s1.516.33 1.375.855c-.14.523-.482 1.103-.482 1.103l-1.157.119-1.34-.437c-1.269-.98-2.197-2.087-2.86-3.254A24.219 24.219 0 0 0 .442 24c0 13.255 10.745 24 24 24Z'
          clipRule='evenodd'
        />
      </svg>

      {/* <span className='nav-burger__icon'></span> */}
    </button>
  );
};

export default NavBurger;
