import React from 'react';
import {Image} from 'react-native';
import {fontFamilies} from '../constants/fontFamilies';
import {appColors} from '../constants/themeColor';
import RowCT from './RowCT';
import SpaceCT from './SpaceCT';
import TextCT from './TextCT';

interface Props {
  size?: number;
  userIds: string[];
}

const AvatarGroup = (props: Props) => {
  const {size, userIds} = props;
  const photoUrl =
    'https://i.pinimg.com/736x/61/76/5b/61765bf86da23dda12932c820296d413.jpg';
  return (
    <RowCT justify="flex-start" styles={{marginVertical: 12}}>
      {userIds.length > 0 && (
        <>
          {Array.from({length: 3}).map((item:any, index) => (
            <Image
              key={`img${index}`}
              source={{uri: photoUrl}}
              style={{
                width: size ?? 24,
                height: size ?? 24,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: appColors.white,
                marginLeft: index > 0 ? -8 : 0,
              }}
            />
          ))}
          <SpaceCT width={12} />
          <TextCT
            text="+20 Going"
            size={12 + (size ? (size - 24) / 5 : 0)}
            color={appColors.primary}
            font={fontFamilies.semiBold}
          />
        </>
      )}
    </RowCT>
  );
};

export default AvatarGroup;
