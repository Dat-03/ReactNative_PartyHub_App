import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {images} from '../../assets/images/png';
import Swiper from 'react-native-swiper';
import {appInfo} from '../../constants/appInfos';
import {appColors} from '../../constants/themeColor';
import {TextCT} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';

const OnbroadingScreen: React.FC = ({navigation}: any) => {
  const [index, setIndex] = useState(0);
  return (
    <View style={[globalStyles.container]}>
      <Swiper
        style={{}}
        loop={false}
        index={index}
        onIndexChanged={num => setIndex(num)}
        activeDotColor={appColors.white}>
        <Image source={images.onBoard1} style={styles.img} />
        <Image source={images.onBoard2} style={styles.img} />
        <Image source={images.onBoard3} style={styles.img} />
      </Swiper>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <TextCT
            text="Skip"
            color={appColors.gray2}
            font={fontFamilies.medium}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')
          }>
          <TextCT
            text="Next"
            color={appColors.white}
            font={fontFamilies.medium}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnbroadingScreen;

const styles = StyleSheet.create({
  img: {
    flex: 1,
    width: appInfo.sizes.WIDTH,
    height: appInfo.sizes.HEIGHT,
    resizeMode: 'cover',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txt: {
    color: appColors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});
