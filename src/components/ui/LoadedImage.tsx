import React, { useState } from 'react';
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

  const handleLoaded = () => {
    if (onLoaded) onLoaded();
    setIsLoaded(true);
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
        onLoad={handleLoaded}
      />
    </div>
  );
};

export default LoadedImage;
