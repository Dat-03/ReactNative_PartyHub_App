import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ArrowDown,
  ArrowRight,
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React from 'react';
import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonCT, CircleCT, RowCT, SpaceCT, TextCT} from '../../../components';
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
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />

      <View
        style={{
          backgroundColor: appColors.primary,
          height: 178 + (Platform.OS === 'ios' ? 16 : 0),
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
        }}>
        <View style={{paddingHorizontal: 16}}>
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

            <CircleCT color="#524CE0" size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View
                  style={{
                    backgroundColor: '#02E9FE',
                    width: 10,
                    height: 10,
                    borderRadius: 4,
                    borderWidth: 2,
                    borderColor: '#524CE0',
                    position: 'absolute',
                    top: -2,
                    right: -2,
                  }}
                />
              </View>
            </CircleCT>
          </RowCT>
          <SpaceCT height={24} />
          <RowCT>
            <RowCT
              styles={{flex: 1}}
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: false,
                })
              }>
              <SearchNormal1
                variant="TwoTone"
                size={22}
                color={appColors.white}
              />
              <View
                style={{
                  width: 1,
                  height: 18,
                  marginHorizontal: 12,
                  backgroundColor: '#A29EF0',
                }}
              />
              <TextCT text="Search..." color={`#A29EF0`} flex={1} />
            </RowCT>
            <RowCT
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: true,
                })
              }
              styles={{
                backgroundColor: '#5D56F3',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 100,
              }}>
              <CircleCT size={19.3} color={`#A29EF0`}>
                <Sort size={12} color={appColors.primary} />
              </CircleCT>
              <SpaceCT width={8} />
              <TextCT text="Filters" color={appColors.white} />
            </RowCT>
          </RowCT>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({});
