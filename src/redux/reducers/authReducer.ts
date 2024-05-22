import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  id: string;
  email: string;
  accesstoken: string;
  follow_events?: string[];
}

const initialState: AuthState = {
  id: '',
  email: '',
  accesstoken: '',
  follow_events: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },

    removeAuth: (state, action) => {
      state.authData = initialState;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {addAuth, removeAuth} = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.authData;
