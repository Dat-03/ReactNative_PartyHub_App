import {ArrowRight2, Location} from 'iconsax-react-native';
import React, {useState} from 'react';
import {RowCT, SpaceCT, TextCT} from '.';
import {appColors} from '../constants/themeColor';
import {LocationModal} from '../modal';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  onSelect: (val: any) => void;
}

const ChoiceLocation = (props: Props) => {
  const {onSelect} = props;

  const [isVibleModalLocation, setIsVibleModalLocation] = useState(false);
  const [addressSelected, setAddressSelected] = useState<{
    address: string;
    position?: {
      lat: number;
      long: number;
    };
  }>();

  return (
    <>
      <RowCT
        onPress={() => setIsVibleModalLocation(!isVibleModalLocation)}
        styles={[globalStyles.inputContainer]}>
        <Location variant="Bold" size={22} color={`${appColors.primary}80`} />

        <SpaceCT width={12} />

        <TextCT
          numOfLine={1}
          text={addressSelected ? addressSelected.address : 'Choice'}
          flex={1}
        />
        <ArrowRight2 color={appColors.primary} size={22} />
      </RowCT>

      <LocationModal
        visible={isVibleModalLocation}
        onClose={() => setIsVibleModalLocation(false)}
        onSelect={val => {
          setAddressSelected(val);
          onSelect(val);
        }}
      />
    </>
  );
};

export default ChoiceLocation;
