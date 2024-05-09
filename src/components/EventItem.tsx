import {useNavigation} from '@react-navigation/native';
import {Location} from 'iconsax-react-native';
import React from 'react';
import {ImageBackground} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {images} from '../assets';
import {fontFamilies} from '../constants/FontFamilies';
import {appInfo} from '../constants/appInfos';
import {appColors} from '../constants/themeColor';
import {EventModel} from '../models/EventModel';
import {globalStyles} from '../styles/globalStyles';
import AvatarGroup from './AvatarGroup';
import CardCT from './CardCT';
import RowCT from './RowCT';
import SpaceCT from './SpaceCT';
import TextCT from './TextCT';
interface Props {
  item: EventModel;
  type: 'card' | 'list';
}

const EventItem = (props: Props) => {
  const {item, type} = props;
  const navigation: any = useNavigation();
  return (
    <CardCT
      isShadow
      styles={{width: appInfo.sizes.WIDTH * 0.7}}
      onPress={() => navigation.navigate('EventDetail', {item})}>
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
          <CardCT
            styles={[globalStyles.noSpaceCard, {justifyContent: 'center'}]}
            color="#ffffffB3">
            <MaterialIcons
              name="bookmark"
              color={appColors.danger2}
              size={25}
            />
          </CardCT>
        </RowCT>
      </ImageBackground>
      <TextCT text={item.title} title size={18} numOfLine={1} />
      <AvatarGroup />

      <RowCT>
        <Location size={18} color={appColors.text3} variant="Bold" />
        <SpaceCT width={8} />
        <TextCT
          text={item.location.address}
          size={12}
          color={appColors.text2}
          numOfLine={1}
          styles={{marginRight: 45}}
        />
      </RowCT>
    </CardCT>
  );
};

export default EventItem;
