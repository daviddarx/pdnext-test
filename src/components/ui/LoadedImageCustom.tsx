import React, { useState, useEffect } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const LoadedImage: React.FC<Props> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const imageElement = new Image();
    imageElement.src = src;

    const handleLoaded = () => {
      setIsLoaded(true);
    };

    imageElement.addEventListener('load', handleLoaded);

    return () => {
      imageElement.removeEventListener('load', handleLoaded);
    };
  }, [src]);

  return (
    <img
      src={src}
      alt={alt}
      className={`loaded-image ${isLoaded ? 'loaded-image--loaded' : ''} ${className}`.trim()}
    />
  );
};

export default LoadedImage;
