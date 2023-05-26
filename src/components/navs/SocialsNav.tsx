const socialsNavItems = [
  {
    title: 'Facebook',
    link: 'https://www.facebook.com/pornydays',
  },
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
    link: 'https://pornydays.us10.list-manage.com/subscribe/post?u=9c7ed05ab79d08599fd3d90ee&id=7073021cc1',
  },
];

type Props = {
  className?: string;
};

const SocialsNav: React.FC<Props> = ({ className }) => {
  return (
    <article className={`nav-socials ${className}`}>
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
