import {StyleSheet} from 'react-native';
import {appColors} from '../constants/themeColor';
import { fontFamilies } from '../constants/FontFamilies';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  text:{
    fontFamily:fontFamilies.regular,
    fontSize:14,
    color:appColors.text
  }
});
