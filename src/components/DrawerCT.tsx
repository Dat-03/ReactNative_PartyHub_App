import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import RowCT from './RowCT';
import ButtonCT from './ButtonCT';
import {appColors} from '../constants/themeColor';
import TextCT from './TextCT';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SpaceCT from './SpaceCT';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector, removeAuth} from '../redux/reducers/authReducer';
import {Screen} from 'react-native-screens';
import {
  Bookmark2,
  Calendar,
  Logout,
  Message2,
  MessageQuestion,
  Setting2,
  Sms,
  User,
} from 'iconsax-react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginManager} from 'react-native-fbsdk-next';
const DrawerCT = ({navigation}: any) => {
  const user = useSelector(authSelector);
  const dispatch = useDispatch();
  const size = 20;
  const color = appColors.gray;
  const profileMenu = [
    {
      key: 'MyProfile',
      title: 'My Profile',
      icon: <User size={size} color={color} />,
    },
    {
      key: 'Message',
      title: 'Message',
      icon: <Message2 size={size} color={color} />,
    },
    {
      key: 'Calendar',
      title: 'Calendar',
      icon: <Calendar size={size} color={color} />,
    },
    {
      key: 'Bookmark',
      title: 'Bookmark',
      icon: <Bookmark2 size={size} color={color} />,
    },
    {
      key: 'ContactUs',
      title: 'Contact Us',
      icon: <Sms size={size} color={color} />,
    },
    {
      key: 'Settings',
      title: 'Settings',
      icon: <Setting2 size={size} color={color} />,
    },
    {
      key: 'HelpAndFAQs',
      title: 'Help & FAQs',
      icon: <MessageQuestion size={size} color={color} />,
    },
    {
      key: 'SignOut',
      title: 'Sign Out',
      icon: <Logout size={size} color={color} />,
    },
  ];
  const handleSignOut = async () => {
    await GoogleSignin.signOut();
    LoginManager.logOut();
    await AsyncStorage.clear();
    dispatch(removeAuth({}));
  };
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => {
          navigation.closeDrawer();
          navigation.navigate('Profile', {
            Screen: 'ProfileScreen',
          });
        }}>
        {user.photo ? (
          <Image source={{uri: user.photo}} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, {backgroundColor: appColors.gray}]}>
            <TextCT
              size={22}
              color={appColors.white}
              text={
                user.name
                  ? user.name
                      .split(' ')
                      [user.name.split(' ').length - 1].subString(0, 1)
                  : ' '
              }
            />
          </View>
        )}
        <TextCT text={user.name} title size={28} />
      </TouchableOpacity>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={profileMenu}
        style={{flex: 1, marginVertical: 20}}
        renderItem={({item, index}) => (
          <RowCT
            styles={[styles.listItem]}
            onPress={
              item.key === 'SignOut'
                ? () => handleSignOut()
                : () => {
                    console.log(item.key);
                    navigation.closeDrawer();
                  }
            }>
            {item.icon}
            <TextCT text={item.title} styles={[styles.listItemText]} />
          </RowCT>
        )}
      />

      <RowCT justify="flex-start">
        <TouchableOpacity
          style={[
            globalStyles.button,
            {backgroundColor: appColors.blue2, height: 'auto'},
          ]}>
          <MaterialCommunityIcons
            name="crown"
            size={22}
            color={appColors.blue2}
          />
          <SpaceCT width={8} />
          <TextCT text="Upgrade Pro" color={appColors.blue1} />
        </TouchableOpacity>
      </RowCT>
    </View>
  );
};

export default DrawerCT;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 48,
    flex: 1,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 99,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },
  listItemText: {
    paddingLeft: 12,
  },
});
