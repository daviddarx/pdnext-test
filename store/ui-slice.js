import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isNavigationOpened: true,
  },
  reducers: {
    toggleNavigation: (state) => {
      state.isNavigationOpened = !state.isNavigationOpened;
    },
  },
});

export default uiSlice;
