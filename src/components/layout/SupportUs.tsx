import ReactMarkdown from 'react-markdown';

import { SupportUsSlot } from '@/types/SupportUsSlot';

type Props = {
  supportUsData: SupportUsSlot[];
};

const SupportUs = ({ supportUsData }: Props) => {
  supportUsData.sort((a, b) => a.position - b.position);

  return (
    <div className='support-us'>
      <h2 className='support-us__title '>
        Unterstützen Sie uns
        <svg
          className='support-us__icon'
          xmlns='http://www.w3.org/2000/svg'
          width='422.169'
          height='364.685'
          viewBox='0.5 600.5 422.169 364.685'
        >
          <path d='M111.825 600.5c-28.543 0-57.021 11.011-78.75 32.85-43.459 43.68-43.405 114.392 0 158.101l168.15 169.5c5.615 5.633 14.733 5.648 20.367.033l.033-.033c56.133-56.416 112.317-112.783 168.45-169.2 43.458-43.678 43.458-114.571 0-158.25-43.459-43.678-114.19-43.68-157.65 0l-20.7 21-21-21.15c-21.73-21.84-50.358-32.851-78.9-32.851z' />
        </svg>
      </h2>

      {supportUsData.map((item) => (
        <div className='support-us__slot' key={item.title}>
          <h3 className='support-us__slot-title'>{item.title}</h3>
          <ReactMarkdown className='support-us__slot-desc'>{item.desc}</ReactMarkdown>
          {item.paypal && (
            <form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>
              <input type='hidden' name='cmd' value='_s-xclick' />
              <input type='hidden' name='hosted_button_id' value='J96E96JPAAKPE' />
              <input
                type='image'
                src='https://www.paypalobjects.com/de_DE/CH/i/btn/btn_subscribeCC_LG.gif'
                name='submit'
                alt='Jetzt einfach, schnell und sicher online bezahlen – mit PayPal.'
              />
            </form>
          )}
        </div>
      ))}
    </div>
  );
};

export default SupportUs;
