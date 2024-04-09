import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ArrowDown,
  ArrowRight,
  HambergerMenu,
  Notification,
} from 'iconsax-react-native';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonCT, CircleCT, RowCT, TextCT} from '../../../components';
import {appColors} from '../../../constants/themeColor';
import {authSelector, removeAuth} from '../../../redux/reducers/authReducer';
import {globalStyles} from '../../../styles/globalStyles';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {fontFamilies} from '../../../constants/FontFamilies';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  return (
    <View style={[globalStyles.container, {}]}>
      <StatusBar barStyle={'light-content'} />

      <View
        style={{
          backgroundColor: appColors.primary,
          height: 179,
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
          paddingHorizontal: 16,
        }}>
        <RowCT>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <HambergerMenu size={24} color={appColors.white} />
          </TouchableOpacity>
          <View style={[{flex: 1, alignItems: 'center'}]}>
            <RowCT>
              <TextCT
                text="Current Location"
                color={appColors.white2}
                size={12}
              />
              <MaterialIcon
                name="arrow-drop-down"
                size={18}
                color={appColors.white}
              />
            </RowCT>
            <TextCT
              text="New York, USA"
              flex={0}
              color={appColors.white}
              font={fontFamilies.medium}
              size={13}
            />
          </View>

          <CircleCT color={appColors.purple} size={36}>
            <View>
              <Notification size={18} color={appColors.white} />
              <View
                style={{
                  backgroundColor: appColors.blue,
                  width: 10,
                  height: 10,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: appColors.purple,
                  position: 'absolute',
                  top: -2,
                  right: -2,
                }}></View>
            </View>
          </CircleCT>
        </RowCT>
      </View>
      <View style={[{flex: 1}]}></View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({});
