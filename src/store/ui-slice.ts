import { createSlice } from '@reduxjs/toolkit';
import { FormatedEvent } from '@/types/FormatedEvent';
export interface uiStateType {
  ui: {
    isNavigationOpened: boolean;
    isBurgerVisible: boolean;
    isBurgerTextVisible: boolean;
    openedEvent: FormatedEvent | undefined;
    previousEvent: FormatedEvent | undefined;
    eventNavUsed: boolean;
    eventSwitchDirection: 'prev' | 'next';
    openedVideo: string | undefined;
    isDark: boolean;
    isContentPage: boolean;
    system: {
      os: string | undefined;
      browser: string | undefined;
    };
    settings: {
      reducedPriceText: string;
    };
  };
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isNavigationOpened: false,
    isBurgerVisible: true,
    isBurgerTextVisible: true,
    openedEvent: undefined as FormatedEvent | undefined,
    eventNavUsed: false,
    eventSwitchDirection: 'next',
    openedVideo: undefined,
    isDark: false,
    isContentPage: false,
    system: {
      os: undefined,
      browser: undefined,
    },
    settings: {
      reducedPriceText: '',
    },
  },
  reducers: {
    openEvent: (state, action) => {
      const params = new URLSearchParams(window.location.search);
      params.set('e', action.payload.event.id);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, '', newUrl);

      state.eventNavUsed = action.payload.nextPrev;
      state.openedEvent = action.payload.event;
    },
    setEventSwitchDirection: (state, action) => {
      if (state.openedEvent) {
        state.eventSwitchDirection =
          new Date(state.openedEvent.date.bare) < new Date(action.payload.date.bare)
            ? 'next'
            : 'prev';
      }
    },
    closeEvent: (state) => {
      if (state.openedEvent) {
        const url = new URL(window.location.href);
        url.search = '';
        history.replaceState({}, document.title, url.toString());
      }

      state.eventSwitchDirection = 'next';
      state.openedEvent = undefined;
    },
    toggleNavigation: (state) => {
      state.isNavigationOpened = !state.isNavigationOpened;
    },
    closeNavigation: (state) => {
      state.isNavigationOpened = false;
    },
    setBurgerVisibility: (state, action) => {
      state.isBurgerVisible = action.payload;
    },
    setBurgerTextVisibility: (state, action) => {
      state.isBurgerTextVisible = action.payload;
    },
    openVideo: (state, action) => {
      state.openedVideo = action.payload;
    },
    closeVideo: (state) => {
      state.openedVideo = undefined;
    },
    setDark: (state, action) => {
      state.isDark = action.payload;
    },
    setContentPage: (state, action) => {
      state.isContentPage = action.payload;
    },
    setSystem: (state, action) => {
      state.system = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
  },
});

export default uiSlice;
