import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addAuth,
  addFollowedEvent,
  authSelector,
} from '../redux/reducers/authReducer';
import {SplashScreen} from '../screens';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import userAPI from '../apis/userApi';
import {UserHanlde} from '../utils/UserHandle';

const RootNavigator = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  const {getItem} = useAsyncStorage('auth');

  const auth = useSelector(authSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    hanldeGetDatas();
  }, []);
  useEffect(() => {
    UserHanlde.getFollowerById(auth.id, dispatch);
  }, [auth.id]);

  const hanldeGetDatas = async () => {
    await checkLogin();
    setIsShowSplash(false);
  };

  const checkLogin = async () => {
    const res = await getItem();
    res && dispatch(addAuth(JSON.parse(res)));
  };

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : auth.accesstoken ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </>
  );
};

export default RootNavigator;
