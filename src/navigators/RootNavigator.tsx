import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addAuth, authSelector} from '../redux/reducers/auth.Reducer';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const RootNavigator = () => {
  const {getItem} = useAsyncStorage('auth');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  console.log(auth);
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const res = await getItem();
    console.log(res)
    res && dispatch(addAuth(JSON.parse(res)));
  };
  console.log(auth.accesstoken);

  return <>{auth.accesstoken ? <MainNavigator /> : <AuthNavigator />}</>;
};

export default RootNavigator;
