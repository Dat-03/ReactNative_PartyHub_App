import AsyncStorage from '@react-native-async-storage/async-storage';
import {ArrowRight} from 'iconsax-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonCT} from '../../../components';
import {appColors} from '../../../constants/themeColor';
import {authSelector, removeAuth} from '../../../redux/reducers/authReducer';
import {globalStyles} from '../../../styles/globalStyles';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  return (
    <View style={styles.container}>
      <ButtonCT
        text="LogOut"
        type="primary"
        onPress={async () => {
          await AsyncStorage.clear();
          await GoogleSignin.signOut();

          dispatch(removeAuth({}));
        }}
        iconFlex="right"
        icon={
          <View style={[globalStyles.iconContainer]}>
            <ArrowRight size={18} color={appColors.white} />
          </View>
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
