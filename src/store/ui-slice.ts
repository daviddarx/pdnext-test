import { createSlice } from '@reduxjs/toolkit';

export interface uiStateType {
  ui: {
    isNavigationOpened: boolean;
    isSupportUsOpened: boolean;
    topbarHeight: number;
  };
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isNavigationOpened: false,
    isSupportUsOpened: false,
    topbarHeight: 0,
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
    setTopBarHeight: (state, action) => {
      state.topbarHeight = action.payload;
    },
  },
});

export default uiSlice;
