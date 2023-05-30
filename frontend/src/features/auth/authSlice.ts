import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialState, InitalUserState } from './types';

const initialState: InitialState = {
  user: {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    mainImage: '',
    allImages: [],
    followers: [],
    following: [],
    informations: {
      // id: '',
      age: undefined,
      city: '',
      dateOfBirth: undefined,
      employed: undefined,
      phoneNumber: undefined,
      placeOfBirth: undefined,
      workPlace: '',
    },
  },
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as InitialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: InitalUserState }>) => {
      const { user } = action.payload;
      state.user = user;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setUser, setIsAuth } = authSlice.actions;
