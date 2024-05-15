import {Calendar, Clock} from 'iconsax-react-native';
import React, {useState} from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {fontFamilies} from '../constants/fontFamilies';
import {appColors} from '../constants/themeColor';
import {globalStyles} from '../styles/globalStyles';
import {DateTime} from '../utils/DateTime';
import RowCT from './RowCT';
import TextCT from './TextCT';

interface Props {
  selected?: Date;
  type: 'date' | 'time';
  onSelect: (val: Date) => void;
  label?: string;
}

const DateTimePicker = (props: Props) => {
  const {type, onSelect, selected, label} = props;
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);

  return (
    <View style={{flex: 1}}>
      {label && <TextCT text={label} styles={{marginBottom: 8}} />}

      <RowCT
        styles={[globalStyles.inputContainer]}
        onPress={() => setIsShowDatePicker(true)}>
        <TextCT
          text={` ${
            selected
              ? type === 'time'
                ? DateTime.GetTime(selected)
                : DateTime.GetDate(selected)
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
        open={isShowDatePicker}
        date={new Date()}
        modal
        onCancel={() => setIsShowDatePicker(false)}
        onConfirm={val => {
          setIsShowDatePicker(false);
          onSelect(val);
        }}
      />
    </View>
  );
};

export default DateTimePicker;
