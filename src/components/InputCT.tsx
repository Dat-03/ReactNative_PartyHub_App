import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {EyeSlash} from 'iconsax-react-native';
import {appColors} from '../constants/themeColor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  value: string;
  onChange: (val: string) => void;
  affix?: ReactNode;
  placeholder?: string;
  suffix?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
  onEnd?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  styles?: StyleProp<ViewStyle>;
}

const InputCT = (props: Props) => {
  const {
    value,
    onChange,
    affix,
    placeholder,
    suffix,
    isPassword,
    type,
    allowClear,
    onEnd,
    multiline,
    numberOfLines,
    styles,
  } = props;
  const [isShowPassword, setIsShowPassword] = useState(isPassword ?? false);

  return (
    <View
      style={[
        globalStyles.inputContainer,
        {alignItems: multiline ? 'flex-start' : 'center'},
        styles,
      ]}>
      {affix ?? affix}
      <TextInput
        style={[
          globalStyles.input,
          globalStyles.text,
          {
            paddingHorizontal: affix || suffix ? 12 : 0,
          },
        ]}
        numberOfLines={numberOfLines}
        multiline={multiline}
        value={value}
        placeholder={placeholder ?? ''}
        onChangeText={val => onChange(val)}
        secureTextEntry={isShowPassword}
        placeholderTextColor={appColors.text2}
        keyboardType={type ?? 'default'}
        autoCapitalize="none"
        onEndEditing={onEnd}
      />
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={
          isPassword
            ? () => setIsShowPassword(!isShowPassword)
            : () => onChange('')
        }>
        {isPassword ? (
          <FontAwesome
            name={isShowPassword ? 'eye-slash' : 'eye'}
            size={22}
            color={appColors.gray}
          />
        ) : (
          value.length > 0 &&
          allowClear && (
            <AntDesign name="close" size={22} color={appColors.text} />
          )
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputCT;
