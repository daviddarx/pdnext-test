import Image from 'next/image';

const LogoMarinello = () => {
  return (
    <Image
      className='partner__logo partner__logo-img'
      src='/images/logo_marinello.png'
      alt='Marinello'
      width={800}
      height={480}
    />
  );
};

export default LogoMarinello;
