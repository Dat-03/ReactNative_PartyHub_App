import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {ProfileScreen} from '../screens';

const ProfileNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
