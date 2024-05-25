import {ArrowLeft, ArrowRight, Calendar, Location} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import eventAPI from '../../../apis/eventApi';
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
import {appInfo} from '../../../constants/appInfos';
import {fontFamilies} from '../../../constants/fontFamilies';
import {appColors} from '../../../constants/themeColor';
import {LoadingModal} from '../../../modal';
import {EventModel} from '../../../models/EventModel';
import {AuthState, authSelector} from '../../../redux/reducers/authReducer';
import {globalStyles} from '../../../styles/globalStyles';
import {DateTime} from '../../../utils/DateTime';
import {UserHanlde} from '../../../utils/UserHandle';

const EventDetail = ({navigation, route}: any) => {
  const {item}: {item: EventModel} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [followers, setFollowers] = useState<string[]>([]);
  const auth: AuthState = useSelector(authSelector);
  const dispatch = useDispatch();

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
    await UserHanlde.getFollowerById(auth.id, dispatch);
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
    } catch (error) {
      console.log(error);
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
      <View
        style={{position: 'absolute', top: 0, right: 0, zIndex: 1, left: 0}}>
        <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}>
          <RowCT
            styles={{
              padding: 16,
              alignItems: 'flex-end',
              paddingTop: 42,
            }}>
            <RowCT styles={{flex: 1}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.canGoBack()
                    ? navigation.goBack()
                    : navigation.navigate('HomeScreen')
                }
                style={{
                  width: 48,
                  height: 48,
                  justifyContent: 'center',
                }}>
                <ArrowLeft size={28} color={appColors.white} />
              </TouchableOpacity>
              <TextCT
                flex={1}
                text="Event Details"
                title
                color={appColors.white}
              />

              <SpaceCT width={12} />
              <CardCT
                onPress={handleFollower}
                styles={[globalStyles.noSpaceCard, {width: 36, height: 36}]}
                color={
                  auth.follow_events && auth.follow_events.includes(item._id)
                    ? '#ffffffB3'
                    : '#ffffff4D'
                }>
                <MaterialIcons
                  name="bookmark"
                  color={
                    auth.follow_events && auth.follow_events.includes(item._id)
                      ? appColors.danger2
                      : appColors.white
                  }
                  size={22}
                />
              </CardCT>
            </RowCT>
          </RowCT>
        </LinearGradient>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        <Image
          source={{uri: item.photoUrl}}
          style={{width: appInfo.sizes.WIDTH, height: 240, resizeMode: 'cover'}}
        />
        <SectionCT styles={{marginTop: -20}}>
          {item.users.length > 0 ? (
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
          ) : (
            <>
              <ButtonCT
                text="Invite"
                styles={{borderRadius: 100}}
                type="primary"
              />
            </>
          )}
        </SectionCT>
        <View
          style={{
            backgroundColor: appColors.white,
          }}>
          <SectionCT>
            <TextCT
              title
              size={34}
              font={fontFamilies.medium}
              text={item.title}
            />
          </SectionCT>
          <SectionCT>
            <RowCT styles={{marginBottom: 20}}>
              <CardCT
                styles={[globalStyles.noSpaceCard, {width: 48, height: 48}]}
                color={`${appColors.primary}4D`}>
                <Calendar variant="Bold" color={appColors.primary} size={24} />
              </CardCT>
              <SpaceCT width={16} />
              <View
                style={{
                  flex: 1,
                  height: 48,
                  justifyContent: 'space-around',
                }}>
                <TextCT
                  text={`${DateTime.GetDate(new Date(item.date))}`}
                  font={fontFamilies.medium}
                  size={16}
                />
                <TextCT
                  text={`${
                    appInfo.dayNames[new Date(item.date).getDay()]
                  }, ${DateTime.GetStartAndEnd(item.startAt, item.endAt)}`}
                  color={appColors.gray}
                />
              </View>
            </RowCT>
            <RowCT styles={{marginBottom: 20, alignItems: 'flex-start'}}>
              <CardCT
                styles={[globalStyles.noSpaceCard, {width: 48, height: 48}]}
                color={`${appColors.primary}4D`}>
                <Location variant="Bold" color={appColors.primary} size={24} />
              </CardCT>
              <SpaceCT width={16} />
              <View
                style={{
                  flex: 1,
                  minHeight: 48,
                  justifyContent: 'space-around',
                }}>
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
        <SpaceCT height={80} />
      </ScrollView>

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
