import {View, Text} from 'react-native';
import React from 'react';
import {SelectModel} from '../models/SelectModel';
import TextCT from './TextCT';
import RowCT from './RowCT';
import {ArrowDown2} from 'iconsax-react-native';
import {appColors} from '../constants/themeColor';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  label?: string;
  value?: SelectModel[];
  selected?: string | string[];
  onSelect: (val: string) => void;
}

const DropDownPicker = (props: Props) => {
  const {label, value, selected, onSelect} = props;
  return (
    <View style={{marginBottom: 8}}>
      {label && <TextCT text={label} styles={{marginBottom: 8}} />}
      <RowCT styles={[globalStyles.inputContainer]} onPress={() => {}}>
        <RowCT styles={{flex: 1}}>
          <TextCT text="Select" />
        </RowCT>
        <ArrowDown2 size={22} color={appColors.gray} />
      </RowCT>
    </View>
  );
};

export default DropDownPicker;
