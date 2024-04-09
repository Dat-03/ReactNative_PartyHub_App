import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {ReactNode} from 'react';
import ExploreNavigator from './ExploreNavigator';
import EventNavigator from './EventNavigator';
import {AddNewScreen} from '../screens';
import MapNavigator from './MapNavigator';
import ProfileNavigator from './ProfileNavigator';
import {appColors} from '../constants/themeColor';
import {AddSquare, Calendar, Home2, Location, User} from 'iconsax-react-native';
import {CircleCT, TextCT} from '../components';
import {Platform, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {globalStyles} from '../styles/globalStyles';
import DrawerNavigator from './DrawerNavigator';
const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 68,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: appColors.white,
        },
        tabBarIcon: ({focused, color, size}) => {
          let icon: ReactNode;
          color: focused ? appColors.primary : appColors.gray5;
          size = 24;
          switch (route.name) {
            case 'Explore':
              icon = <MaterialIcon name="explore" size={size} color={color} />;
              break;
            case 'Event':
              icon = <Calendar size={size} variant="Bold" color={color} />;
              break;
            case 'Map':
              icon = <Location size={size} variant="Bold" color={color} />;
              break;
            case 'Profile':
              icon = <User size={size} variant="Bold" color={color} />;
              break;
            case 'Add':
              icon = (
                <CircleCT
                  size={52}
                  styles={{marginTop: Platform.OS === 'ios' ? -50 : -60}}>
                  <AddSquare size={24} color={appColors.white} variant="Bold" />
                </CircleCT>
              );
              break;
          }

          return icon;
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarLabel: ({focused, color}) => {
          return route.name === 'Add' ? null : (
            <TextCT
              text={route.name}
              flex={0}
              size={12}
              color={focused ? appColors.primary : appColors.gray}
              styles={{
                marginBottom: Platform.OS === 'android' ? 12 : 0,
              }}
            />
          );
        },
      })}>
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Event" component={EventNavigator} />
      <Tab.Screen name="Add" component={AddNewScreen} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
