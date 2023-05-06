import { PartnersType } from '@/types/Partners';
import dynamic from 'next/dynamic';

type Props = {
  partnersData: PartnersType;
};

const Partners = ({ partnersData }: Props) => {
  return (
    <section className='partners'>
      <h2>Partners</h2>
      <ul className='partners__list'>
        {partnersData.map((partner) => {
          const LogoComponent = dynamic(
            () => import(`@/components/logos/partners/${partner.logo}`),
          );
          return (
            <li key={partner.title} className='partner'>
              <a href={partner.link} className='partner__link' target='_blank'>
                <LogoComponent />
                <h3 className='hidden'>{partner.title}</h3>
                <span className='partner__label'>{partner.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Partners;
