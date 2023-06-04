import React, { useState } from 'react';
import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onLoaded?: () => void;
};

const LoadedImage: React.FC<Props> = ({ src, alt, width, height, className, onLoaded }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = () => {
    if (onLoaded) onLoaded();
    setIsLoaded(true);
  };

  return (
    <div className={`loaded-image ${isLoaded ? 'loaded-image--loaded' : ''} ${className}`.trim()}>
      <Image src={src} alt={alt} width={width} height={height} onLoad={handleLoaded} />
    </div>
  );
};

export default LoadedImage;
