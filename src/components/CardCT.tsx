import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {appColors} from '../constants/themeColor';
import {globalStyles} from '../styles/globalStyles';
interface Props {
  onPress?: () => void;
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
  isShadow?: boolean;
  color?: string;
}

const CardCT = (props: Props) => {
  const {onPress, children, styles, isShadow, color} = props;
  const localStyle: StyleProp<ViewStyle>[] = [
    globalStyles.card,
    isShadow ? globalStyles.shadow : undefined,
    {backgroundColor: color ?? appColors.white},
    styles,
  ];
  return (
    <TouchableOpacity onPress={onPress} style={localStyle}>
      {children}
    </TouchableOpacity>
  );
};

export default CardCT;
