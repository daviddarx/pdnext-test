import ReactMarkdown from 'react-markdown';

import { SupportUsSlot } from '@/types/SupportUsSlot';
import IconHeart from '@/components/icons/IconHeart';

type Props = {
  supportUsData: SupportUsSlot[];
};

const SupportUs = ({ supportUsData }: Props) => {
  supportUsData.sort((a, b) => a.position - b.position);

  return (
    <div className='support-us'>
      <h2 className='support-us__title '>
        Unterstützen Sie uns
        <IconHeart className='support-us__icon' />
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
