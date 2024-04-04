import {View, Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {appColors} from '../constants/themeColor';
import {fontFamilies} from '../constants/FontFamilies';
import {globalStyles} from '../styles/globalStyles';
interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
}
const TextCT = (props: Props) => {
  const {text, color, size, flex, font, styles, title} = props;
  return (
    <Text
      style={[
        globalStyles.text,
        {
          color: color ?? appColors.text,
          fontSize: size ?? title ? 24 : 16,
          flex: flex ?? 0,
          fontFamily: font ?? title ? fontFamilies.bold : fontFamilies.regular,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextCT;
