import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/auth.Reducer';

const store = configureStore({
  reducer: {
    authReducer,
  },
});
export default store;
