type Props = {
  className?: string;
};

const ArrowIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      className={`arrow-icon ${className}`.trim()}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 23 11'
    >
      <g stroke='currentColor' strokeLinecap='round' clipPath='url(#a)'>
        <path strokeWidth='1px' vectorEffect='non-scaling-stroke' d='M1 5.5h21' />
        <path
          strokeWidth='1px'
          vectorEffect='non-scaling-stroke'
          in='round'
          d='m18 10 4-4.5L18 1'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path d='M0 0h23v11H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowIcon;
