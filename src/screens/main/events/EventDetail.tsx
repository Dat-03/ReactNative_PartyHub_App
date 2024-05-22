import {ArrowLeft, ArrowRight, Calendar, Location} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
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
import {useSelector} from 'react-redux';
import {authSelector} from '../../../redux/reducers/authReducer';
import eventAPI from '../../../apis/eventApi';
import {LoadingModal} from '../../../modal';

const EventDetail = ({navigation, route}: any) => {
  const {item}: {item: EventModel} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState<string[]>([]);
  const auth = useSelector(authSelector);

  useEffect(() => {
    item && getFollowersbyId();
  }, [item]);
  const handleFollower = () => {
    const items = [...followers];
    if (items.includes(auth.id)) {
      const index = items.findIndex(element => element === auth.id);
      if (index !== -1) {
        items.splice(index, 1);
      }
    } else {
      items.push(auth.id);
    }
    setFollowers(items);
    handleUpdateFollowers(items);
  };
  console.log(followers);
  const handleUpdateFollowers = async (data: string[]) => {
    const api = `/update-followes`;
    setIsLoading(true);
    try {
      await eventAPI.HandleEvent(
        api,
        {
          id: item._id,
          followers: data,
        },
        'post',
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const getFollowersbyId = async () => {
    const api = `/followers?id=${item._id}`;

    try {
      const res = await eventAPI.HandleEvent(api);
      res && res.data && setFollowers(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: appColors.white}}>
      <ImageBackground
        source={{uri: item.photoUrl}}
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
                onPress={handleFollower}
                styles={[globalStyles.noSpaceCard, {width: 36, height: 36}]}
                color={
                  followers.includes(auth.id)
                    ? appColors.white6
                    : appColors.white4
                }>
                <MaterialIcons
                  name="bookmark"
                  color={
                    followers.includes(auth.id)
                      ? appColors.danger2
                      : appColors.white
                  }
                  size={22}
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
          {item.users.length > 0 ? (
            <SectionCT>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
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
                  <AvatarGroup userIds={item.users} size={36} />
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
          ) : (
            <>
              <ButtonCT
                text="Invite"
                type="primary"
                styles={{borderRadius: 100}}
              />
            </>
          )}

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
                    text={item.locationTitle}
                    font={fontFamilies.medium}
                    size={16}
                  />
                  <TextCT text={item.locationAddress} color={appColors.gray} />
                </View>
              </RowCT>
              <RowCT styles={{marginBottom: 20}}>
                <Image
                  source={{
                    uri: item.photoUrl,
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
      <LoadingModal visible={isLoading} />
    </View>
  );
};

export default EventDetail;
