import { createSlice } from '@reduxjs/toolkit';

export interface uiStateType {
  ui: {
    isNavigationOpened: boolean;
    isSupportUsOpened: boolean;
    supportUsToggleId: number;
  };
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isNavigationOpened: false,
    isSupportUsOpened: false,
    supportUsToggleId: 0,
  },
  reducers: {
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
  },
});

export default uiSlice;
