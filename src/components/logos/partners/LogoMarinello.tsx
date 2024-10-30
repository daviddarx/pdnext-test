import Image from 'next/image';
import React from 'react';

const LogoMarinello = () => {
  return (
    <React.Fragment>
      <Image
        className='partner__logo partner__logo-img partner__logo-marinello--black'
        src='/images/logo_marinello_black.png'
        alt='Marinello'
        width={800}
        height={480}
      />
      <Image
        className='partner__logo partner__logo-img hidden partner__logo-marinello--white'
        src='/images/logo_marinello_beige.png'
        alt='Marinello'
        width={800}
        height={480}
      />
    </React.Fragment>
  );
};

export default LogoMarinello;
