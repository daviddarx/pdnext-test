import { createSlice } from '@reduxjs/toolkit';
import { FormatedEvent } from '@/types/FormatedEvent';
export interface uiStateType {
  ui: {
    isNavigationOpened: boolean;
    isSupportUsOpened: boolean;
    isBurgerVisible: boolean;
    isBurgerTextVisible: boolean;
    openedEvent: FormatedEvent | undefined;
    previousEvent: FormatedEvent | undefined;
    eventNavUsed: boolean;
    eventSwitchDirection: 'prev' | 'next';
    openedVideo: string | undefined;
    isDark: boolean;
    system: {
      os: string | undefined;
      browser: string | undefined;
    };
  };
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isNavigationOpened: false,
    isSupportUsOpened: false,
    isBurgerVisible: true,
    isBurgerTextVisible: true,
    openedEvent: undefined as FormatedEvent | undefined,
    eventNavUsed: false,
    eventSwitchDirection: 'next',
    openedVideo: undefined,
    isDark: false,
    system: {
      os: undefined,
      browser: undefined,
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
    openSupportUs: (state) => {
      state.isSupportUsOpened = true;
    },
    closeSupportUs: (state) => {
      state.isSupportUsOpened = false;
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
    setSystem: (state, action) => {
      state.system = action.payload;
    },
  },
});

export default uiSlice;
