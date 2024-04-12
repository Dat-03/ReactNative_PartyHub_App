import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {EventScreen} from '../screens';

const EventNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="EventsScreen" component={EventScreen} />
    </Stack.Navigator>
  );
};

export default EventNavigator;
