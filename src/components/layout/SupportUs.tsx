import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import { SupportUsSlot } from '@/types/SupportUsSlot';

import HeartIcon from '@/components/icons/HeartIcon';
import CloseIcon from '@/components/icons/CloseIcon';
import Accordion from '@/components/ui/Accordion';

type Props = {
  supportUsData: SupportUsSlot[];
};

const SupportUs = ({ supportUsData }: Props) => {
  const isSupportUsOpened = useSelector((state: any) => state.ui.isSupportUsOpened);

  console.log('run support-us', isSupportUsOpened);

  supportUsData.sort((a, b) => a.position - b.position);

  return (
    <Accordion
      className='support-us'
      title={
        <h2 className='support-us__title '>
          Unterstützen Sie uns
          <HeartIcon className='support-us__heart' />
          <CloseIcon className='support-us__close' />
        </h2>
      }
    >
      <div className='support-us__content'>
        {supportUsData.map((item) => (
          <div className='support-us__slot' key={item.title}>
            <h3 className='support-us__slot-title'>{item.title}</h3>
            <ReactMarkdown className='support-us__slot-desc'>{item.desc}</ReactMarkdown>
            {item.paypal && (
              <form
                className='support-us__paypal'
                action='https://www.paypal.com/cgi-bin/webscr'
                method='post'
                target='_top'
                style={{ height: '47px' }}
              >
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
    </Accordion>
  );
};

export default SupportUs;
