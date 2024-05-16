import {Bookmark, Bookmark2, Location} from 'iconsax-react-native';
import React from 'react';
import {AvatarGroup, CardCT, RowCT, SpaceCT, TextCT} from '.';
import {appInfo} from '../constants/appInfos';
import {EventModel} from '../models/EventModel';
import {Image, ImageBackground, View} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {DateTime} from '../utils/DateTime';
import {appColors} from '../constants/themeColor';
import {fontFamilies} from '../constants/fontFamilies';
import {images} from '../assets';
import {useSelector} from 'react-redux';
import {authSelector} from '../redux/reducers/authReducer';
import {numberToString} from '../utils/NumberofString';

interface Props {
  item: EventModel;
  type: 'card' | 'list';
}

const EventItem = (props: Props) => {
  const {item, type} = props;
  const auth = useSelector(authSelector);
  const navigation: any = useNavigation();

  // console.log(new Date(item.date).toISOString());

  return (
    <CardCT
      isShadow
      styles={{width: appInfo.sizes.WIDTH * 0.7}}
      onPress={() => navigation.navigate('EventDetail', {item})}>
      {type === 'card' ? (
        <>
          <ImageBackground
            style={{flex: 1, marginBottom: 12, height: 131, padding: 10}}
            source={{uri: item.photoUrl}}
            imageStyle={{
              resizeMode: 'cover',
              borderRadius: 12,
            }}>
            <RowCT justify="space-between">
              <CardCT styles={[globalStyles.noSpaceCard]} color="#ffffffB3">
                <TextCT
                  color={appColors.danger2}
                  font={fontFamilies.bold}
                  size={18}
                  text={numberToString(new Date(item.date).getDate())}
                />
                <TextCT
                  color={appColors.danger2}
                  font={fontFamilies.semiBold}
                  size={10}
                  text={appInfo.monthNames[
                    new Date(item.date).getMonth()
                  ].substring(0, 3)}
                />
              </CardCT>
              {item.followers && item.followers.includes(auth.id) && (
                <CardCT
                  styles={[globalStyles.noSpaceCard]}
                  color={appColors.white6}>
                  <MaterialIcons
                    name="bookmark"
                    color={appColors.danger2}
                    size={22}
                  />
                </CardCT>
              )}
            </RowCT>
          </ImageBackground>
          <TextCT numOfLine={1} text={item.title} title size={18} />
          <AvatarGroup userIds={item.users} />
          <RowCT>
            <Location size={18} color={appColors.text3} variant="Bold" />
            <SpaceCT width={8} />
            <TextCT
              flex={1}
              numOfLine={1}
              text={item.locationAddress}
              size={12}
              color={appColors.text2}
            />
          </RowCT>
        </>
      ) : (
        <>
          <RowCT>
            <Image
              source={{uri: item.photoUrl}}
              style={{
                width: 79,
                height: 92,
                borderRadius: 12,
                resizeMode: 'cover',
              }}
            />
            <SpaceCT width={12} />
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                height: '100%',
              }}>
              <TextCT
                color={appColors.primary}
                text={`${DateTime.GetDayString(item.date)} • ${DateTime.GetTime(
                  new Date(item.startAt),
                )}`}
              />
              <TextCT text={item.title} title size={19} numOfLine={2} />
              <RowCT>
                <Location size={18} color={appColors.text3} variant="Bold" />
                <SpaceCT width={8} />
                <TextCT
                  flex={1}
                  numOfLine={1}
                  text={item.locationAddress}
                  size={12}
                  color={appColors.text2}
                />
              </RowCT>
            </View>
          </RowCT>
        </>
      )}
    </CardCT>
  );
};

export default EventItem;
