import {ArrowRight2} from 'iconsax-react-native';
import React from 'react';
import {RowCT, TextCT} from '.';
import {appColors} from '../constants/themeColor';

interface Props {
  title: string;
  onPress?: () => void;
}

const TabBarCT = (props: Props) => {
  const {title, onPress} = props;

  return (
    <RowCT onPress={onPress} styles={{marginBottom: 12, paddingHorizontal: 16}}>
      <TextCT numberOfLine={1} size={18} title text={title} flex={1} />
      {onPress && (
        <RowCT>
          <TextCT text="See All " color={appColors.gray} />
          <ArrowRight2 variant="Bold" size={14} color={appColors.gray} />
        </RowCT>
      )}
    </RowCT>
  );
};

export default TabBarCT;
