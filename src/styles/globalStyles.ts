import {StyleSheet} from 'react-native';
import {appColors} from '../constants/themeColor';
import {fontFamilies} from '../constants/FontFamilies';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  text: {
    fontFamily: fontFamilies.regular,
    fontSize: 14,
    color: appColors.text,
  },
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
    flexDirection: 'row',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  row:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
  }
});