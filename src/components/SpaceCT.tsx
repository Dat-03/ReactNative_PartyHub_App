import React from 'react';
import {View} from 'react-native';

interface Props {
  width?: number;
  height?: number;
}

const SpaceCT = (props: Props) => {
  const {width, height} = props;
  return <View style={{width, height}}></View>;
};

export default SpaceCT;
