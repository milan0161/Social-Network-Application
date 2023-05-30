import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import { apiSlice } from './api/apiSlice';
import { messagesSlice } from '../features/messages/messagesSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    msg: messagesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
