import { createSlice } from '@reduxjs/toolkit';
import { FormatedEvent } from '@/types/FormatedEvent';
export interface uiStateType {
  ui: {
    isNavigationOpened: boolean;
    isSupportUsOpened: boolean;
    isBurgerVisible: boolean;
    isBurgerTextVisible: boolean;
    openedEvent: FormatedEvent | undefined;
  };
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isNavigationOpened: false,
    isSupportUsOpened: false,
    isBurgerVisible: true,
    isBurgerTextVisible: true,
    openedEvent: undefined,
  },
  reducers: {
    openEvent: (state, action) => {
      state.openedEvent = action.payload;
    },
    closeEvent: (state) => {
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
