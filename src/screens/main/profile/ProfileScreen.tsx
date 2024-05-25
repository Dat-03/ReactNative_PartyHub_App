import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useState} from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonCT, ContainerCT} from '../../../components';
import {
  AuthState,
  authSelector,
  removeAuth,
} from '../../../redux/reducers/authReducer';
import {LoginManager} from 'react-native-fbsdk-next';
import {HandleNotification} from '../../../utils/HandleNotification';
import {LoadingModal} from '../../../modal';

const ProfileScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const auth: AuthState = useSelector(authSelector);

  const handleLogOut = async () => {
    setIsLoading(true);
    const fcmToken = await AsyncStorage.getItem('fcmToken');
    if (fcmToken) {
      if (auth.fcmTokens && auth.fcmTokens.length > 0) {
        const items = [...auth.fcmTokens];
        const index = auth.fcmTokens.findIndex(element => element === fcmToken);

        if (index !== -1) {
          items.splice(index, 1);
        }
        await HandleNotification.Update(auth.id, items);
      }
    }
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem('auth');
    LoginManager.logOut();
    dispatch(removeAuth({}));
    setIsLoading(false);
  };
  return (
    <ContainerCT back>
      <Text>ProfileScreen</Text>
      <ButtonCT text="Logout" type="primary" onPress={handleLogOut} />
      <LoadingModal visible={isLoading} />
    </ContainerCT>
  );
};

export default ProfileScreen;
