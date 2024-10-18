const setFullScreen = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'f') {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
};

export const addFullscreenShortcut = () => {
  if (document) {
    document.removeEventListener('keydown', setFullScreen);
    document.addEventListener('keydown', setFullScreen);
  }
};
