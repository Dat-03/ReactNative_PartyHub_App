import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {images} from '../assets/images/png';
import {appInfo} from '../constants/appInfos';
import {SpaceCT} from '../components';
import {appColors} from '../constants/themeColor';

const SplashScreen = () => {
  return (
    <ImageBackground
      source={images.bg_lobby}
      style={styles.container}
      imageStyle={{flex: 1}}>
      <Image source={images.lobby} style={styles.logo} />
      <SpaceCT height={16} />
      <ActivityIndicator color={appColors.gray} size={40} // loading
      /> 
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: appInfo.sizes.WIDTH * 0.7,

    resizeMode: 'contain',
  },
});
