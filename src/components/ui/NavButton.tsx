import classNames from 'classnames';

import ChevronIcon from '@/components/icons/ChevronIcon';

type Props = {
  className: string;
  onClick?: () => void;
  isPrev?: boolean;
  renderAsDiv?: boolean;
};

const NavButton: React.FC<Props> = ({
  className = '',
  onClick,
  renderAsDiv = false,
  isPrev = false,
}) => {
  const Component = renderAsDiv ? 'div' : 'button';

  return (
    <Component
      className={classNames(
        'nav-button',
        isPrev ? 'nav-button--prev' : 'nav-button--next',
        className,
      )}
      onClick={onClick}
    >
      <ChevronIcon className='nav-button__icon' />
      <span className='nav-button__text'>{isPrev ? 'Previous' : 'Next'}</span>
    </Component>
  );
};

export default NavButton;
