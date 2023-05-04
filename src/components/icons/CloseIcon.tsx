type Props = {
  className?: string;
};

const CloseIcon = ({ className }: Props) => {
  return <span className={`close-icon ${className ? className : ''}`}></span>;
};

export default CloseIcon;
