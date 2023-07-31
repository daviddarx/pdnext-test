import classNames from 'classnames';

type Props = {
  className?: string;
};

const ChevronIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={classNames('arrow-icon', className)}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 11 11'
    >
      <g>
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1px'
          vectorEffect='non-scaling-stroke'
          d='M3.5.986 8.014 5.5 3.5 10.014'
        />
      </g>
    </svg>
  );
};

export default ChevronIcon;
