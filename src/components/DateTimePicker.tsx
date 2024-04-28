import {View, Text} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import TextCT from './TextCT';
import {ArrowDown2, Calendar, Clock} from 'iconsax-react-native';
import {appColors} from '../constants/themeColor';
import RowCT from './RowCT';
import {globalStyles} from '../styles/globalStyles';
import {fontFamilies} from '../constants/FontFamilies';
import {DateTime} from '../utils/DateTime';

interface Props {
  Selected?: Date;
  type: 'date' | 'time';
  onSelect: (val: Date) => void;
  label?: string;
}

const DateTimePicker = (props: Props) => {
  const {Selected, type, onSelect, label} = props;
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  console.log(Selected);
  return (
    <View style={{flex: 1}}>
      {label && (
        <TextCT
          text={label}
          font={fontFamilies.medium}
          styles={{marginBottom: 5}}
        />
      )}
      <RowCT
        styles={[globalStyles.inputContainer]}
        onPress={() => setIsShowDatePicker(true)}>
        <TextCT
          text={`${
            Selected
              ? type === 'time'
                ? DateTime.GetTime(Selected)
                : DateTime.GetDate(Selected)
              : 'Choice'
          }`}
          flex={1}
          font={fontFamilies.medium}
          styles={{textAlign: 'center'}}
        />
        {type === 'time' ? (
          <Clock size={22} color={appColors.gray} />
        ) : (
          <Calendar size={22} color={appColors.gray} />
        )}
      </RowCT>
      <DatePicker
        mode={type}
        date={new Date()}
        modal
        open={isShowDatePicker}
        onConfirm={val => {
          setIsShowDatePicker(false);
          onSelect(val);
        }}
      />
    </View>
  );
};

export default DateTimePicker;
