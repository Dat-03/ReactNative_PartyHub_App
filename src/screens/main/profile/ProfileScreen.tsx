import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React from 'react';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {ButtonCT, ContainerCT} from '../../../components';
import {removeAuth} from '../../../redux/reducers/authReducer';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  return (
    <ContainerCT back>
      <Text>ProfileScreen</Text>
      <ButtonCT
        text="Logout"
        onPress={async () => {
          await GoogleSignin.signOut();
          await AsyncStorage.clear();
          dispatch(removeAuth({}));
        }}
        type="primary"
      />
    </ContainerCT>
  );
};

export default ProfileScreen;
