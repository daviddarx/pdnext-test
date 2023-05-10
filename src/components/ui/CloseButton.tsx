import CloseIcon from '@/components/icons/CloseIcon';

type Props = {
  className: string;
  onClick: () => void;
};

const CloseButton: React.FC<Props> = ({ className, onClick }) => {
  return (
    <div className={`close-button is-opened ${className}`.trim()} onClick={onClick}>
      <CloseIcon className='close-button__icon' />
      <span className='close-button__text'>Schliessen</span>
    </div>
  );
};

export default CloseButton;
