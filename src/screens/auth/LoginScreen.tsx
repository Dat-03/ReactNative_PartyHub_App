import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ButtonCT, InputCT} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {Lock, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/themeColor';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View
      style={[
        globalStyles.container,
        {justifyContent: 'center', alignItems: 'center', padding: 20},
      ]}>
      <InputCT
        value={email}
        placeholder="Email"
        OnChange={val => setEmail(val)}
        // isPassword
        allowClear
        affix={<Sms size={22} color={appColors.gray} />}
      />
      <InputCT
        value={password}
        placeholder="Password"
        OnChange={val => setPassword(val)}
        isPassword
        allowClear
        affix={<Lock size={22} color={appColors.gray} />}
      />
    </View>
  );
};

export default LoginScreen;
