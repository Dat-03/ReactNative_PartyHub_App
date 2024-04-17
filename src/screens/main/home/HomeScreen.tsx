import {
  HambergerMenu,
  Notification,
  SearchNormal1,
  Sort,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  ButtonCT,
  CardCT,
  CategoriesList,
  CircleCT,
  EventItem,
  RowCT,
  SectionCT,
  SpaceCT,
  TabBarCT,
  TextCT,
} from '../../../components';
import {fontFamilies} from '../../../constants/FontFamilies';
import {appColors} from '../../../constants/themeColor';
import {authSelector} from '../../../redux/reducers/authReducer';
import {globalStyles} from '../../../styles/globalStyles';
import {images} from '../../../assets';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {AddressModel} from '../../../models/AddressModel';
import Geocoder from 'react-native-geocoding';
// APP ID: 3VgR8g9SmufJ2K4rMVHF
// KEY API: oRgDXZViwTLwpt4zC4tQQUJgb_EJxV95qEW_hxRHDT8
// AIzaSyA0EoaUbRecSYIPIfpfEslYbBckTRmF_yM
Geocoder.init(process.env.MAP_API_KEY as string);
const HomeScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const [currentLocation, setCurrentLocation] = useState<AddressModel>();
  
  // 10.857783, 106.619719
  // useEffect(() => {
  //   reverseGeocode({lat: 10.857783, long: 106.619719});
  // }, []);

  // console.log(process.env.MAP_API_KEY);
  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      if (position.coords) {
        reverseGeocode({
          long: position.coords.longitude,
          lat: position.coords.latitude,
        });
      }
    });
  }, []);
  const reverseGeocode = async ({long, lat}: {lat: number; long: number}) => {
    const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=vi-VI&apikey=oRgDXZViwTLwpt4zC4tQQUJgb_EJxV95qEW_hxRHDT8`;
    try {
      const res = await axios(api);
      if (res && res.status === 200 && res.data) {
        const items = res.data.items;
        setCurrentLocation(items[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const itemEvent = {
    title: 'International Band Music Concert',
    description:
      'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
    location: {
      title: 'Gala Convention Center',
      address: '36 Guild Street London, UK ',
    },
    imageUrl: '',
    users: '',
    authorId: '',
    startAt: Date.now(),
    endAt: Date.now(),
    Date: Date.now(),
  };
  return (
    <View style={[globalStyles.container]}>
      <StatusBar barStyle={'light-content'} />

      <View style={[styles.header]}>
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
                <MaterialIcons
                  name="arrow-drop-down"
                  size={18}
                  color={appColors.white}
                />
              </RowCT>
              {currentLocation && (
                <TextCT
                  text={`${currentLocation.address.city}, ${currentLocation.address.county}`}
                  flex={0}
                  color={appColors.white}
                  font={fontFamilies.medium}
                  size={13}
                />
              )}
            </View>

            <CircleCT color={appColors.purple} size={36}>
              <View>
                <Notification size={18} color={appColors.white} />
                <View style={[styles.iconNotification]} />
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
              <View style={[styles.searchTxt]} />
              <TextCT text="Search..." color={appColors.purple2} flex={1} />
            </RowCT>
            <RowCT
              onPress={() =>
                navigation.navigate('SearchEvents', {
                  isFilter: true,
                })
              }
              styles={[styles.btnFilter]}>
              <CircleCT size={19.3} color={appColors.purple2}>
                <Sort size={12} color={appColors.primary} />
              </CircleCT>
              <SpaceCT width={8} />
              <TextCT text="Filters" color={appColors.white} />
            </RowCT>
          </RowCT>
          <SpaceCT height={24} />
        </View>
        <View style={{marginBottom: -16}}>
          <CategoriesList isColor />
        </View>
      </View>
      <ScrollView
        style={[
          {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 22 : 18,
          },
        ]}>
        <SectionCT styles={{paddingHorizontal: 0, paddingTop: 24}}>
          <TabBarCT title="Upcoming Events" onPress={() => {}} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem
                key={`event${index}`}
                //@ts-ignore
                item={itemEvent}
                type="card"
              />
            )}
          />
        </SectionCT>

        <SectionCT>
          <View style={styles.ticket}>
            <SpaceCT height={15} />
            <View style={{gap: 10}}>
              <TextCT text="Invite your friends" title size={20} />
              <TextCT text="Get $20 for ticket" />
            </View>

            <RowCT justify="flex-start">
              <TouchableOpacity
                style={[
                  globalStyles.button,
                  {marginTop: 12, backgroundColor: appColors.blue1},
                ]}>
                <TextCT text="INVITE" color={appColors.white} />
              </TouchableOpacity>
            </RowCT>

            <Image source={images.icon_invite2} style={styles.img} />
          </View>
        </SectionCT>

        <SectionCT styles={{paddingHorizontal: 0, paddingTop: 24}}>
          <TabBarCT title="Upcoming Events" onPress={() => {}} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={Array.from({length: 5})}
            renderItem={({item, index}) => (
              <EventItem
                key={`event${index}`}
                //@ts-ignore
                item={itemEvent}
                type="card"
              />
            )}
          />
        </SectionCT>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  header: {
    backgroundColor: appColors.primary,
    height: 178 + (Platform.OS === 'ios' ? 16 : 0),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 52,
  },
  btnFilter: {
    backgroundColor: appColors.purple3,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 100,
  },
  searchTxt: {
    width: 1,
    height: 18,
    marginHorizontal: 12,
    backgroundColor: appColors.purple2,
  },
  iconNotification: {
    backgroundColor: appColors.blue,
    width: 10,
    height: 10,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: appColors.purple,
    position: 'absolute',
    top: -2,
    right: -2,
  },
  img: {
    position: 'absolute',
    right: 0,
    top: 22,
    bottom: 0,
    height: 155,
    width: 200,
  },
  ticket: {
    backgroundColor: appColors.blue3,
    width: '99%',
    minHeight: 127,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  btnInvite: {
    width: 72,
    height: 32,
    backgroundColor: appColors.blue1,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
