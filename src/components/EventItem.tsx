import {View, Text, ImageBackground} from 'react-native';
import React from 'react';
import CardCT from './CardCT';
import TextCT from './TextCT';
import {EventModel} from '../models/EventModel';
import {appInfo} from '../constants/appInfos';
import AvatarGroup from './AvatarGroup';
import RowCT from './RowCT';
import {Bookmark, Bookmark2, Car, Location} from 'iconsax-react-native';
import {appColors} from '../constants/themeColor';
import SpaceCT from './SpaceCT';
import {images} from '../assets';
import {fontFamilies} from '../constants/FontFamilies';
import {globalStyles} from '../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface Props {
  item: EventModel;
  type: 'card' | 'list';
}

const EventItem = (props: Props) => {
  const {item, type} = props;
  return (
    <CardCT
      isShadow
      styles={{width: appInfo.sizes.WIDTH * 0.7}}
      onPress={() => {}}>
      <ImageBackground
        style={{flex: 1, marginTop: 12, height: 131, padding: 10}}
        source={images.itemCard1}
        imageStyle={{resizeMode: 'cover', borderRadius: 12}}>
        <RowCT justify="space-between">
          <CardCT styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
            <TextCT
              color={appColors.danger2}
              font={fontFamilies.bold}
              size={18}
              text="10"
            />
            <TextCT
              color={appColors.danger2}
              font={fontFamilies.semiBold}
              size={10}
              text="JUNE"
            />
          </CardCT>
          <CardCT styles={[globalStyles.noSpaceCard,{justifyContent:'center'}]} color="#ffffffB3">
            <MaterialIcons name='bookmark' color={appColors.danger2} size={25} />
          </CardCT>
        </RowCT>
      </ImageBackground>
      <TextCT text={item.title} title size={18} numberOfLine={1} />
      <AvatarGroup />
      <RowCT>
        <Location size={18} color={appColors.text3} variant="Bold" />
        <SpaceCT width={8} />
        <TextCT
          text={item.location.address}
          size={12}
          color={appColors.text2}
          numberOfLine={1}
        />
      </RowCT>
    </CardCT>
  );
};

export default EventItem;
