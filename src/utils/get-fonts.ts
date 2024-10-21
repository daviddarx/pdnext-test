import { Golos_Text } from 'next/font/google';

export const fontText = Golos_Text({
  subsets: ['latin'],
});

import localFont from 'next/font/local';

// export const fontTitle = localFont({
//   src: './../fonts/NaNHolo_TRIAL-Black.ttf',
//   variable: '--font-title',
// });

// export const fontTitle = localFont({
//   src: './../fonts/NaNFiascoTRIAL-Black.ttf',
//   variable: '--font-title',
// });

export const fontTitle = localFont({
  src: './../fonts/NaNFiascoTRIAL-ExtraBlack.ttf',
  variable: '--font-title',
});
