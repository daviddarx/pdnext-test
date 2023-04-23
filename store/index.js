import { configureStore } from '@reduxjs/toolkit';
import eventsSlice from './events-slice';

const store = configureStore({
  reducer: {
    events: eventsSlice.reducer,
  },
});

export default store;

export const eventsActions = eventsSlice.actions;
