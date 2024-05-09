import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {appColors} from '../constants/themeColor';

interface Props {
  size?: number;
  color?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>;
}

const CircleCT = (props: Props) => {
  const {size, color, children, onPress, styles} = props;
  const localStyles: any = {
    width: size ?? 40,
    height: size ?? 40,
    backgroundColor: color ?? appColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  };
  return onPress ? (
    <TouchableOpacity style={[localStyles, styles]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[localStyles, styles]}>{children}</View>
  );
};

export default CircleCT;
