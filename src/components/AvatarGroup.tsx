import {View, Text, Image} from 'react-native';
import React from 'react';
import RowCT from './RowCT';
import TextCT from './TextCT';
import {appColors} from '../constants/themeColor';
import {fontFamilies} from '../constants/FontFamilies';
import CircleCT from './CircleCT';
import SpaceCT from './SpaceCT';

const AvatarGroup = () => {
  const imgUrl =
    'https://i.pinimg.com/736x/61/76/5b/61765bf86da23dda12932c820296d413.jpg';
  return (
    <RowCT justify="flex-start" styles={{marginVertical: 12}}>
      {Array.from({length: 3}).map((item, index) => (
        <Image
          key={`img${index}`}
          source={{uri: imgUrl}}
          style={{
            width: 24,
            height: 24,
            borderRadius: 100,
            borderWidth: 2,
            marginLeft: index > 0 ? -8 : 0,
            borderColor: appColors.white,
          }}
        />
      ))}
      <SpaceCT width={12} />
      <TextCT
        text="+20 Going"
        size={12}
        color={appColors.primary}
        font={fontFamilies.semiBold}
      />
    </RowCT>
  );
};

export default AvatarGroup;
