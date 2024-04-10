import {View, Text} from 'react-native';
import React from 'react';
import {ButtonCT, ContainerCT} from '../../../components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {removeAuth} from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
