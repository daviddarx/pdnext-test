import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  onLoaded?: () => void;
};

const LoadedImage: React.FC<Props> = ({ src, alt, width, height, sizes, className, onLoaded }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (!loadingStartTime) {
      setLoadingStartTime(performance.now());
    }
  }, [loadingStartTime]);

  const handleLoaded = () => {
    if (onLoaded) onLoaded();
    setIsLoaded(true);

    if (loadingStartTime !== null) {
      console.log(
        `Loaded: ${src.split('/').slice(-1)} / ${performance.now() - loadingStartTime} ms`,
      );
    }
  };

  return (
    <div
      className={classNames(
        'loaded-image',
        {
          'loaded-image--loaded': isLoaded,
        },
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        quality={75}
        placeholder='blur'
        onLoad={handleLoaded}
      />
    </div>
  );
};

export default LoadedImage;
