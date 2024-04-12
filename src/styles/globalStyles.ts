import {Platform, StyleSheet} from 'react-native';
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
    // minHeight: 56,
    flexDirection: 'row',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  shadow: {
    shadowColor: Platform.OS === 'ios' ? 'rgba (0,0,0,0.3)' : 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColors.iconRight,
    width: 30,
    height: 30,
    borderRadius: 99,
  },
  tag: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: appColors.white,
    borderRadius: 100,
    marginRight: 12,
  },

  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: appColors.white,
    margin: 12,
  },
  noSpaceCard: {
    alignItems: 'center',
    width: 45,
    height: 45,
    padding: 0,
    margin: 0,
    marginVertical: 0,
    marginHorizontal: 0,
  },
});
