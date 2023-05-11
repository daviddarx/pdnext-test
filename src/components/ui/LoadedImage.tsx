import React, { useState } from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

const LoadedImage: React.FC<Props> = ({ src, alt, width, height, className }) => {
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
    />
  );
};

export default LoadedImage;
