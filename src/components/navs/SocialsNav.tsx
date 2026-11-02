import classNames from 'classnames';

import { NEWSLETTER_URL } from '@/utils/newsletter';

const socialsNavItems = [
  {
    title: 'Twitter',
    link: 'https://twitter.com/pornydays',
  },
  {
    title: 'Instagram',
    link: 'https://www.instagram.com/filmkunstfestival',
  },
  {
    title: 'Vimeo',
    link: 'https://vimeo.com/pornydays',
  },
  {
    title: 'Newsletter',
    link: NEWSLETTER_URL,
  },
];

type Props = {
  className?: string;
};

const SocialsNav: React.FC<Props> = ({ className }) => {
  return (
    <article className={classNames('nav-socials', className)}>
      <h3 className='hidden'>Bleiben Sie auf dem Laufenden.</h3>
      <ul>
        {socialsNavItems.map((item) => (
          <li key={item.title}>
            <a href={item.link} target='_blank' className='nav-socials__item text-link'>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default SocialsNav;
