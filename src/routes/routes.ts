export type Route = {
  title: string;
  slug: string;
  complement?: string;
  json?: string;
};

export type RoutesCollection = {
  [key: string]: Route;
};

export type Routes = {
  main: RoutesCollection;
  secondary: RoutesCollection;
  footer: RoutesCollection;
};

export type BottomNavRoutes = {
  about: RoutesCollection;
  press: RoutesCollection;
};

export const routes = {
  main: {
    festival: {
      slug: 'festival-program',
      title: 'Festival Programm',
      complement: '29. Nov. bis 3. Dez. 2023',
    },
    ons: {
      slug: 'one-night-stands',
      title: 'One Night Stands',
      complement: 'Saisonales Programm',
    },
  },
  secondary: {
    about: { slug: 'festival', title: 'Das Festival', json: 'contentpage-das-festival.json' },
    news: { slug: 'news', title: 'News' },
    submissions: {
      slug: 'submissions',
      title: 'Submissions',
      json: 'contentpage-submissions.json',
    },
    impressions: { slug: 'impressions', title: 'Impressions' },
    press: { slug: 'press', title: 'Press', json: 'contentpage-presse.json' },
  },
  footer: {
    impressum: {
      slug: 'impressum',
      title: 'Impressum',
      json: 'contentpage-impressum.json',
    },
    pricacy: {
      slug: 'privacy',
      title: 'Datenschutz',
      json: 'contentpage-datenschutz.json',
    },
    cookies: {
      slug: 'cookies',
      title: 'Cookie-Richtlinie',
      json: 'contentpage-cookie-richtlinie.json',
    },
  },
};

export function findRouteBySlug(routes: Routes, slug: string): Route | null {
  for (const key of Object.keys(routes) as (keyof Routes)[]) {
    if (typeof routes[key] === 'object') {
      for (const subKey of Object.keys(routes[key]) as (keyof RoutesCollection)[]) {
        const route = routes[key][subKey];
        if (route.slug === slug) {
          return route;
        }
      }
    }
  }

  return null; // Route with the given slug not found
}

export const bottomNavRoutes = {
  about: {
    about: {
      slug: 'festival#uber-uns',
      title: 'Über uns',
    },
    mainfesto: {
      slug: 'festival#manifesto',
      title: 'Manifesto',
    },
    team: {
      slug: 'festival#team',
      title: 'Team',
    },
    contact: {
      slug: 'festival#kontakt',
      title: 'Kontakt',
    },
  },
  press: {
    contact: {
      slug: 'press#presse-kontakt',
      title: 'Presse-Kontakt',
    },
    releases: {
      slug: 'press#medienmitteilungen',
      title: 'Medienmitteilungen',
    },
    review: {
      slug: 'press#pressespiegel',
      title: 'Pressespiegel',
    },
  },
};
