import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {images} from '../../assets/images/png';
import Swiper from 'react-native-swiper';
import {appInfo} from '../../constants/appInfos';
import {appColors} from '../../constants/themeColor';

const OnbroadingScreen: React.FC = ({navigation}: any) => {
  const [index, setindex] = useState(0);
  return (
    <View style={[globalStyles.container]}>
      <Swiper
        style={{}}
        loop={false}
        index={index}
        onIndexChanged={num => setindex(num)}
        activeDotColor={appColors.white}
        dotColor={appColors.dotOnboard}>
        <Image source={images.onBoard1} style={styles.img} />
        <Image source={images.onBoard2} style={styles.img} />
        <Image source={images.onBoard3} style={styles.img} />
      </Swiper>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.txt}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            index < 2 ? setindex(index + 1) : navigation.navigate('LoginScreen')
          }>
          <Text style={styles.txt}>Next</Text>
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
    bottom: 0,
    right: 0,
    left: 0,
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
