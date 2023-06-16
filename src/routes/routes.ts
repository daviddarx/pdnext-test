export type Route = {
  title: string;
  link: string;
  complement?: string;
};

export type RoutesCollection = {
  [key: string]: Route;
};

export type Routes = {
  main: RoutesCollection;
  secondary: RoutesCollection;
  footer: RoutesCollection;
  bottomNav: {
    about: RoutesCollection;
    press: RoutesCollection;
  };
};

const routes = {
  main: {
    festival: {
      title: 'Festival Programm',
      complement: ' 23. — 27. Nov. 2022',
      link: '/festival-program',
    },
    ons: {
      title: 'One Night Stands',
      complement: 'Saisonales Programm',
      link: '/one-night-stands',
    },
  },
  secondary: {
    about: { title: 'Das Festival', link: '/festival' },
    news: { title: 'News', link: '/news' },
    submissions: { title: 'Submissions', link: '/submissions' },
    impressions: { title: 'Impressions', link: '/impressions' },
    press: { title: 'Press', link: '/press' },
  },
  bottomNav: {
    about: {
      about: {
        title: 'Über uns',
        link: '/festival#uber-uns',
      },
      mainfesto: {
        title: 'Manifesto',
        link: '/festival#manifesto',
      },
      team: {
        title: 'Team',
        link: '/festival#team',
      },
      contact: {
        title: 'Kontakt',
        link: '/festival#kontakt',
      },
    },
    press: {
      contact: {
        title: 'Presse-Kontakt',
        link: '/press#presse-kontakt',
      },
      releases: {
        title: 'Medienmitteilungen',
        link: '/press#medienmitteilungen',
      },
      review: {
        title: 'Pressespiegel',
        link: '/press#pressespiegel',
      },
    },
  },
  footer: {
    impressum: {
      title: 'Impressum',
      link: '/impressum',
    },
    pricacy: {
      title: 'Datenschutz',
      link: '/privacy',
    },
    cookies: {
      title: 'Cookie-Richtlinie',
      link: '/cookies',
    },
  },
};

export default routes;
