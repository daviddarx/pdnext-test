import { createSlice } from '@reduxjs/toolkit';

type Props = {
  isNavigationOpened: boolean;
  isSupportUsOpened: boolean;
  supportUsToggleId: number;
};

export type uiStateType = {
  ui: Props;
};

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
