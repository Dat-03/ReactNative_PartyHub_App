import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {EventScreen} from '../screens';

const EventNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="EventScreen" component={EventScreen} />
    </Stack.Navigator>
  );
};

export default EventNavigator;
