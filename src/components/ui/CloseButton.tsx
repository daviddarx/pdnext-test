import CloseIcon from '@/components/icons/CloseIcon';

type Props = {
  className: string;
  onClick?: () => void;
  renderAsDiv?: boolean;
};

const CloseButton: React.FC<Props> = ({ className = '', onClick, renderAsDiv = false }) => {
  const Component = renderAsDiv ? 'div' : 'button';

  return (
    <Component className={`close-button is-opened ${className}`.trim()} onClick={onClick}>
      <CloseIcon className='close-button__icon' />
      <span className='close-button__text'>Schliessen</span>
    </Component>
  );
};

export default CloseButton;
