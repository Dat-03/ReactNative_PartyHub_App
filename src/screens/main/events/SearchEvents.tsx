import React from 'react';
import { Text, View } from 'react-native';

const SearchEvents = ({navigation, route}: any) => {
  const {isFilter}: {isFilter: boolean} = route.params;
  console.log(isFilter);
  return (
    <View>
      <Text>SearchEvents</Text>
    </View>
  );
};

export default SearchEvents;
