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
  },
  reducers: {
    openEvent: (state, action) => {
      window.location.hash = action.payload.event.id;

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
      // use this hack because window.history & react-router.replace/push cause problems.
      const scrollPosition = window.scrollY;
      window.location.hash = '';
      window.scrollTo(0, scrollPosition);

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
  },
});

export default uiSlice;
