import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {appInfo} from '../../../constants/appInfos';
import Geolocation from '@react-native-community/geolocation';
import {
  ButtonCT,
  CardCT,
  CategoriesList,
  InputCT,
  MarkerCT,
  RowCT,
  SpaceCT,
  TextCT,
} from '../../../components';
import {ArrowLeft2, Location} from 'iconsax-react-native';
import {appColors} from '../../../constants/themeColor';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../../../styles/globalStyles';
import {Food_color} from '../../../assets';
import eventAPI from '../../../apis/eventApi';
import {EventModel} from '../../../models/EventModel';

const MapScreen = ({navigation}: any) => {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    long: number;
  }>();
  const [events, setEvents] = useState<EventModel[]>([]);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        if (position.coords) {
          setCurrentLocation({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        }
      },
      error => {
        console.log(error);
      },
      {},
    );
  }, []);

  useEffect(() => {
    currentLocation && getNearbyEvents();
  }, [currentLocation]);

  const getNearbyEvents = async () => {
    const api = `/get-events?lat=${currentLocation?.lat}&long=${
      currentLocation?.long
    }&distance=${5}`;
    try {
      const res = await eventAPI.HandleEvent(api);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} />

      {currentLocation ? (
        <MapView
          style={{
            width: appInfo.sizes.WIDTH,
            height: appInfo.sizes.HEIGHT,
          }}
          showsMyLocationButton
          showsUserLocation
          initialRegion={{
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: currentLocation.lat,
            longitude: currentLocation.long,
            latitudeDelta: 0.001,
            longitudeDelta: 0.015,
          }}
          mapType="standard">
          {events.length > 0 &&
            events.map((event, index) => (
              <Marker
                key={`event${index}`}
                title={event.title}
                description=""
                coordinate={{
                  latitude: event.position.lat,
                  longitude: event.position.long,
                }}
                onPress={() => console.log('pressed')}>
                <View
                  style={{
                    padding: 12,
                    backgroundColor: appColors.white,
                    borderRadius: 12,
                    width: 56,
                    height: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Food_color />
                </View>
                <MarkerCT type={event.category} onPress={() => {}} />
              </Marker>
            ))}
        </MapView>
      ) : (
        <></>
      )}
      <View
        style={{
          backgroundColor: 'rgba(255,255,255,0.5)',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          paddingTop: 48,
          padding: 20,
        }}>
        <RowCT>
          <View style={{flex: 1}}>
            <InputCT
              styles={{marginBottom: 0}}
              placeholder="Search"
              value=""
              onChange={val => console.log(val)}
              affix={
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Explore', {screen: 'HomeScreen'})
                  }>
                  <ArrowLeft2 size={24} color={appColors.text} />
                </TouchableOpacity>
              }
            />
          </View>
          <SpaceCT width={12} />
          <CardCT
            onPress={getNearbyEvents}
            styles={[
              globalStyles.noSpaceCard,
              {justifyContent: 'center', width: 56, height: 56},
            ]}
            color={appColors.white}>
            <MaterialIcons
              name="my-location"
              size={28}
              color={appColors.primary}
            />
          </CardCT>
        </RowCT>
        <SpaceCT height={20} />
        <CategoriesList />
      </View>
    </View>
  );
};

export default MapScreen;
