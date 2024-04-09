import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {MapScreen} from '../screens';

const MapNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};

export default MapNavigator;
