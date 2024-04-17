import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ButtonCT, InputCT, RowCT, SpaceCT, TextCT} from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {appColors} from '../constants/themeColor';
import {SearchNormal, SearchNormal1} from 'iconsax-react-native';
import axios from 'axios';
import {LocationModel} from '../models/LocationModel';
interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (val: string) => void;
}

const LocationModal = (props: Props) => {
  const {visible, onClose, onSelect} = props;
  const [searchKey, setSearchKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState<LocationModel[]>([]);

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
      <View style={{paddingVertical: 42, paddingHorizontal: 20}}>
        <RowCT justify="flex-end" styles={{marginVertical: 20}}>
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
          <SpaceCT width={12} />
          <ButtonCT text="Cancel" type="link" onPress={handleClose} />
        </RowCT>
        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : locations.length > 0 ? (
            <FlatList
              data={locations}
              renderItem={({item}) => (
                <>
                  <TextCT text={item.address.label} />
                </>
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
      </View>
    </Modal>
  );
};

export default LocationModal;
