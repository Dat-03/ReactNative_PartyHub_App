import React, {ReactNode} from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {TextCT} from '.';
import {fontFamilies} from '../constants/fontFamilies';
import {appColors} from '../constants/themeColor';
import {globalStyles} from '../styles/globalStyles';

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
  disable?: boolean;
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
    disable,
  } = props;
  return type === 'primary' ? (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disable}
        onPress={onPress}
        style={[
          globalStyles.button,
          globalStyles.shadow,
          {
            backgroundColor: color
              ? color
              : disable
              ? appColors.gray4
              : appColors.primary,
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
        flex={0}
        text={text}
        color={type === 'link' ? appColors.primary : appColors.text}
      />
    </TouchableOpacity>
  );
};

export default ButtonCT;
