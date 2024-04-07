import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import {TextCT} from '.';
import {globalStyles} from '../styles/globalStyles';
import {appColors} from '../constants/themeColor';
import {fontFamilies} from '../constants/FontFamilies';

interface Props {
  icon?: ReactNode;
  text: string;
  type?: 'primary' | 'text' | 'link';
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyles?: StyleProp<TextStyle>;
  textFont?: string;
  iconFlex?: 'right' | 'left';
  onPress?: () => void;
}
const ButtonCT = (props: Props) => {
  const {
    icon,
    text,
    type,
    color,
    styles,
    textColor,
    textStyles,
    textFont,
    onPress,
    iconFlex,
  } = props;
  return type === 'primary' ? (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          globalStyles.button,
          globalStyles.shadow,
          {
            backgroundColor: color ?? appColors.primary,
            marginBottom: 10,
            width: '90%',
          },

          styles,
        ]}>
        {icon && iconFlex === 'left' && icon}
        <TextCT
          text={text}
          color={textColor ?? appColors.white}
          styles={[
            textStyles,
            {marginLeft: icon ? 12 : 0, fontSize: 16, textAlign: 'center'},
          ]}
          flex={icon && iconFlex === 'right' ? 1 : 0}
          font={textFont ?? fontFamilies.medium}
        />
        {icon && iconFlex === 'right' && icon}
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <TextCT
        text={text}
        color={type === 'link' ? appColors.primary : appColors.text}
      />
    </TouchableOpacity>
  );
};

export default ButtonCT;
