import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {TextCT} from '.';

interface Props {
  isLoading: boolean;
  values: number;
  mess?: string;
}

const LoadingItem = (props: Props) => {
  const {isLoading, values, mess} = props;
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        values === 0 && <TextCT text={mess ?? 'data not found!!'} />
      )}
    </View>
  );
};

export default LoadingItem;
