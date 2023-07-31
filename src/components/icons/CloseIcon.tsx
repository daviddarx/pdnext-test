import classNames from 'classnames';

type Props = {
  className?: string;
};

const CloseIcon = ({ className }: Props) => {
  return <span className={classNames('close-icon', className)}></span>;
};

export default CloseIcon;
