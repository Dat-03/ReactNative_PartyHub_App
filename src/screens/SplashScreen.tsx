import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '../assets/images/png';

const SplashScreen = () => {
  return (
    <View>
      <Image source={images.bg_lobby} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
