import Image from 'next/image';

const LogoRiffRaff = () => {
  return (
    <Image
      className='partner__logo partner__logo-img'
      src='/images/logo_riffraff.png'
      alt='Riff Raff'
      width={800}
      height={480}
    />
  );
};

export default LogoRiffRaff;
