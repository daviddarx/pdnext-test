/* see https://zellwk.com/blog/keyboard-focusable-elements/ */

let localFocusables: HTMLElement[] | undefined;

export const getFocusables = (element: HTMLElement): HTMLElement[] => {
  const elements = Array.from(
    element.querySelectorAll(
      'a[href], button, input:not([type="hidden"]), textarea, select, details,[tabindex]:not([tabindex="-1"])',
    ),
  );

  return elements.filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      !el.getAttribute('aria-hidden') &&
      window.getComputedStyle(el).display !== 'none',
  ) as HTMLElement[];
};

export const setFocusables = (element: HTMLElement): void => {
  localFocusables = getFocusables(element);

  const scrollY = window.scrollY;

  const firstFocusable = localFocusables[0] as HTMLInputElement | undefined;
  firstFocusable?.focus?.({ preventScroll: true });

  window.scrollTo({ top: scrollY });
};

export const resetFocusables = (): void => {
  localFocusables = undefined;
};

export const loopFocusables = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (localFocusables && e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === localFocusables[0]) {
        e.preventDefault();
        localFocusables[localFocusables.length - 1].focus();
      }
    } else {
      if (document.activeElement === localFocusables[localFocusables.length - 1]) {
        e.preventDefault();
        localFocusables[0].focus();
      }
    }
  }
};
