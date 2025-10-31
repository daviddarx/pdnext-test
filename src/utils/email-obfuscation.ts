/**
 * Email obfuscation using JS Conversion technique
 * Based on https://spencermortensen.com/articles/email-obfuscation/
 * This technique blocks 100% of spammers while keeping emails readable and clickable
 */

/**
 * Simple character substitution for email obfuscation
 * Maps characters to their obfuscated versions
 */
const OBFS_CHAR_MAP: Record<string, string> = {
  a: 'z',
  b: 'y',
  c: 'x',
  d: 'w',
  e: 'v',
  f: 'u',
  g: 't',
  h: 's',
  i: 'r',
  j: 'q',
  k: 'p',
  l: 'o',
  m: 'n',
  n: 'm',
  o: 'l',
  p: 'k',
  q: 'j',
  r: 'i',
  s: 'h',
  t: 'g',
  u: 'f',
  v: 'e',
  w: 'd',
  x: 'c',
  y: 'b',
  z: 'a',
  A: 'Z',
  B: 'Y',
  C: 'X',
  D: 'W',
  E: 'V',
  F: 'U',
  G: 'T',
  H: 'S',
  I: 'R',
  J: 'Q',
  K: 'P',
  L: 'O',
  M: 'N',
  N: 'M',
  O: 'L',
  P: 'K',
  Q: 'J',
  R: 'I',
  S: 'H',
  T: 'G',
  U: 'F',
  V: 'E',
  W: 'D',
  X: 'C',
  Y: 'B',
  Z: 'A',
  '0': '9',
  '1': '8',
  '2': '7',
  '3': '6',
  '4': '5',
  '5': '4',
  '6': '3',
  '7': '2',
  '8': '1',
  '9': '0',
  '@': '#',
  '.': '_',
  '-': '+',
  _: '-',
};

/**
 * Reverse map for decoding
 */
const DEOBFS_CHAR_MAP: Record<string, string> = Object.entries(OBFS_CHAR_MAP).reduce(
  (acc, [key, value]) => {
    acc[value] = key;
    return acc;
  },
  {} as Record<string, string>,
);

/**
 * Obfuscate an email address by substituting characters
 */
export function obfuscateEmail(email: string): string {
  return email
    .split('')
    .map((char) => OBFS_CHAR_MAP[char] ?? char)
    .join('');
}

/**
 * Deobfuscate an email address
 */
export function deobfuscateEmail(obfuscated: string): string {
  return obfuscated
    .split('')
    .map((char) => DEOBFS_CHAR_MAP[char] ?? char)
    .join('');
}

/**
 * Scan the document for obfuscated emails and restore them (client-side only)
 */
export function deobfuscateEmails(): void {
  if (typeof window === 'undefined') return;

  const elements = document.querySelectorAll('[data-obfuscated-email]');

  elements.forEach((element) => {
    const obfuscated = element.getAttribute('data-obfuscated-email');
    if (!obfuscated) return;

    const email = deobfuscateEmail(obfuscated);

    if (element.textContent === obfuscated) {
      element.textContent = email;
    }

    if (element instanceof HTMLAnchorElement) {
      const href = element.getAttribute('href');
      if (href && href.startsWith('mailto:')) {
        const currentEmail = href.substring(7);
        if (currentEmail === obfuscated) {
          element.href = `mailto:${email}`;
        }
      }
    }

    if (element.childNodes.length > 0) {
      element.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent === obfuscated) {
          node.textContent = email;
        }
      });
    }

    element.removeAttribute('data-obfuscated-email');
  });
}

let emailObserver: MutationObserver | null = null;

/**
 * Observe DOM changes and deobfuscate emails when new nodes are added
 */
export function startEmailDeobfuscationObserver(): void {
  if (typeof window === 'undefined') return;
  if (emailObserver) return; // already started

  emailObserver = new MutationObserver((mutations) => {
    let shouldScan = false;
    for (const m of mutations) {
      if (m.type === 'childList' && (m.addedNodes.length > 0 || m.removedNodes.length > 0)) {
        shouldScan = true;
        break;
      }
    }
    if (shouldScan) {
      // Run on next frame to allow layout/paint
      requestAnimationFrame(() => deobfuscateEmails());
    }
  });

  try {
    emailObserver.observe(document.body, { childList: true, subtree: true });
  } catch {
    requestAnimationFrame(() => {
      try {
        emailObserver?.observe(document.body, { childList: true, subtree: true });
      } catch {
        console.log('body mutation observation failed');
      }
    });
  }
}
