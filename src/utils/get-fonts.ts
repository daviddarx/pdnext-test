import { Golos_Text } from 'next/font/google';

export const fontText = Golos_Text({
  subsets: ['latin'],
});

import localFont from 'next/font/local';

export const fontTitle = localFont({
  src: './../fonts/Agrandir_Variable.ttf',
  variable: '--font-title',
});
