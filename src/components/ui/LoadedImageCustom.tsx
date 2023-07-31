import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

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
    <div className={classNames('loaded-image', { 'loaded-image--loaded': isLoaded }, className)}>
      <img src={src} alt={alt} />
    </div>
  );
};

export default LoadedImage;
