import {View, Text} from 'react-native';
import React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const SpaceCT = (props: Props) => {
  const {width, height} = props;
  return <View style={{width, height}}></View>;
};

export default SpaceCT;
