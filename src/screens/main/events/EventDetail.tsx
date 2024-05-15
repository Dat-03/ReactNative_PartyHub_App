import {ArrowLeft, ArrowRight, Calendar, Location} from 'iconsax-react-native';
import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {images} from '../../../assets';
import {
  AvatarGroup,
  ButtonCT,
  CardCT,
  RowCT,
  SectionCT,
  SpaceCT,
  TabBarCT,
  TextCT,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {appColors} from '../../../constants/themeColor';
import {EventModel} from '../../../models/EventModel';
import {globalStyles} from '../../../styles/globalStyles';

const EventDetail = ({navigation, route}: any) => {
  const {item}: {item: EventModel} = route.params;
  const avatarDefault =
    'https://i.pinimg.com/736x/61/76/5b/61765bf86da23dda12932c820296d413.jpg';
  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <ImageBackground
        source={images.img_EventDetail}
        style={{flex: 1, height: 244, zIndex: -1}}
        imageStyle={{
          resizeMode: 'cover',
        }}>
        <LinearGradient colors={[appColors.black1, appColors.white3]}>
          <RowCT
            styles={{
              padding: 16,
              paddingTop: 42,
              alignItems: 'flex-end',
            }}>
            <RowCT styles={{flex: 1}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{width: 48, height: 48, justifyContent: 'center'}}>
                <ArrowLeft size={28} color={appColors.white} />
              </TouchableOpacity>
              <TextCT
                text="Event Detail"
                title
                color={appColors.white}
                flex={1}
                size={20}
                styles={{letterSpacing: 1}}
              />
              <CardCT
                styles={[globalStyles.noSpaceCard, {width: 36, height: 36}]}
                color={appColors.white4}>
                <MaterialIcons
                  name="bookmark"
                  color={appColors.white}
                  size={25}
                />
              </CardCT>
            </RowCT>
          </RowCT>
        </LinearGradient>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            paddingTop: 244 - 153,
          }}>
          <SectionCT>
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <RowCT
                justify="space-between"
                styles={[
                  globalStyles.shadow,
                  {
                    backgroundColor: appColors.white,
                    borderRadius: 100,
                    paddingHorizontal: 12,
                    width: '90%',
                  },
                ]}>
                <AvatarGroup size={36} />
                <TouchableOpacity
                  style={[
                    globalStyles.button,
                    {backgroundColor: appColors.primary, paddingVertical: 8},
                  ]}>
                  <TextCT text="Invite" color={appColors.white} />
                </TouchableOpacity>
              </RowCT>
            </View>
          </SectionCT>
          <View style={{backgroundColor: appColors.white}}>
            <SectionCT>
              <TextCT
                text={item.title}
                title
                size={34}
                font={fontFamilies.medium}
              />
            </SectionCT>
            <SectionCT>
              <RowCT styles={{marginBottom: 20}}>
                <CardCT
                  styles={[globalStyles.noSpaceCard, {width: 48, height: 48}]}
                  color={`${appColors.primary}4D`}>
                  <Calendar
                    variant="Bold"
                    color={appColors.primary}
                    size={24}
                  />
                </CardCT>
                <SpaceCT width={16} />
                <View
                  style={{flex: 1, height: 48, justifyContent: 'space-around'}}>
                  <TextCT
                    text="14 December, 2021"
                    font={fontFamilies.medium}
                    size={16}
                  />
                  <TextCT
                    text="Tuesday, 4:00PM - 9:00PM"
                    color={appColors.gray}
                  />
                </View>
              </RowCT>
              <RowCT styles={{marginBottom: 20}}>
                <CardCT
                  styles={[globalStyles.noSpaceCard, {width: 48, height: 48}]}
                  color={`${appColors.primary}4D`}>
                  <Location
                    variant="Bold"
                    color={appColors.primary}
                    size={24}
                  />
                </CardCT>
                <SpaceCT width={16} />
                <View
                  style={{flex: 1, height: 48, justifyContent: 'space-around'}}>
                  <TextCT
                    text={item.location.title}
                    font={fontFamilies.medium}
                    size={16}
                  />
                  <TextCT text={item.location.address} color={appColors.gray} />
                </View>
              </RowCT>
              <RowCT styles={{marginBottom: 20}}>
                <Image
                  source={{
                    uri: avatarDefault,
                  }}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    resizeMode: 'cover',
                  }}
                />
                <SpaceCT width={16} />
                <View
                  style={{flex: 1, height: 48, justifyContent: 'space-around'}}>
                  <TextCT
                    text="Rimuru Tempest"
                    font={fontFamilies.medium}
                    size={16}
                  />
                  <TextCT
                    text="Tuesday, 4:00PM - 9:00PM"
                    color={appColors.gray}
                  />
                </View>
              </RowCT>
            </SectionCT>
            <TabBarCT title="About Event" />
            <SectionCT>
              <TextCT text={item.description} />
            </SectionCT>
            <SectionCT>
              <TextCT text={item.description} />
            </SectionCT>
            <SectionCT>
              <TextCT text={item.description} />
            </SectionCT>
            <SectionCT>
              <TextCT text={item.description} />
            </SectionCT>
          </View>
        </ScrollView>
      </ImageBackground>

      <LinearGradient
        colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.9)']}
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 12,
        }}>
        <ButtonCT
          text="BUY TICKET $120"
          onPress={() => {}}
          type="primary"
          iconFlex="right"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor: appColors.iconRight,
                },
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
        />
      </LinearGradient>
    </View>
  );
};

export default EventDetail;
