import React, { useState } from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  unoptimized?: boolean;
  className?: string;
};

const LoadedImage: React.FC<Props> = ({
  src,
  alt,
  width,
  height,
  unoptimized = false,
  className,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`loaded-image ${isLoaded ? 'loaded-image--loaded' : ''} ${className}`.trim()}
      onLoad={handleLoaded}
      unoptimized={unoptimized}
    />
  );
};

export default LoadedImage;
