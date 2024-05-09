import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {SearchNormal1} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import GetCoder from 'react-native-geocoding';
import MapView from 'react-native-maps';
import {ButtonCT, InputCT, RowCT, SpaceCT, TextCT} from '../components';
import {appInfo} from '../constants/appInfos';
import {appColors} from '../constants/themeColor';
import {LocationModel} from '../models/LocationModel';

GetCoder.init(process.env.MAP_API_KEY as string);
interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (val: {
    address: string;
    position?: {
      lat: number;
      long: number;
    };
  }) => void;
}

const LocationModal = (props: Props) => {
  const {visible, onClose, onSelect} = props;
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);
  const [addressSelected, setAddressSelected] = useState('');
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    long: number;
  }>();

  useEffect(() => {
    Geolocation.getCurrentPosition(position => {
      if (position.coords) {
        setCurrentLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      }
    });
  }, []);

  useEffect(() => {
    GetCoder.from(addressSelected).then(res => {
      const position = res.results[0].geometry.location;

      setCurrentLocation({
        lat: position.lat,
        long: position.lng,
      });
    });
  }, [addressSelected]);
  useEffect(() => {
    if (!searchKey) {
      setLocations([]);
    }
  }, [searchKey]);

  const handleClose = () => {
    onClose();
  };
  const handleSearchLocation = async () => {
    const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=20&apiKey=oRgDXZViwTLwpt4zC4tQQUJgb_EJxV95qEW_hxRHDT8`;

    try {
      setIsLoading(true);
      const res = await axios(api);
      if (res && res.data && res.status === 200) {
        setLocations(res.data.items);
      }
      console.log(locations);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal animationType="slide" visible={visible} style={{flex: 1}}>
      <View style={{paddingVertical: 40}}>
        <RowCT
          justify="flex-end"
          styles={{marginVertical: 20, paddingHorizontal: 20}}>
          <View style={{flex: 1}}>
            <InputCT
              styles={{marginBottom: 0}}
              affix={<SearchNormal1 color={appColors.gray} size={20} />}
              value={searchKey}
              onChange={val => setSearchKey(val)}
              placeholder="Search location"
              allowClear
              onEnd={handleSearchLocation}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 58,
              left: 10,
              right: 10,
              backgroundColor: appColors.white,
              zIndex: 5,
              padding: 20,
            }}>
            {isLoading ? (
              <ActivityIndicator />
            ) : locations.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{maxHeight: 1000}}
                data={locations}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={{marginBottom: 20}}
                    onPress={() => {
                      setAddressSelected(item.address.label);
                      setSearchKey('');
                    }}>
                    <TextCT text={item.address.label} />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View>
                <TextCT
                  text={searchKey ? 'Location not found' : 'Search Location'}
                />
              </View>
            )}
          </View>
          <SpaceCT width={12} />
          <ButtonCT text="Cancel" type="link" onPress={handleClose} />
        </RowCT>
        {currentLocation && (
          <MapView
            showsMyLocationButton
            showsUserLocation
            style={{
              width: appInfo.sizes.WIDTH,
              height: 500,
              marginVertical: 40,
              zIndex: -1,
            }}
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
            mapType="standard"
            onRegionChange={val => console.log(val)}
          />
        )}
        <ButtonCT
          text="Confirm"
          type="primary"
          onPress={() => {
            onSelect({
              address: addressSelected,
              position: currentLocation,
            });
            onClose();
          }}
        />
      </View>
    </Modal>
  );
};

export default LocationModal;
