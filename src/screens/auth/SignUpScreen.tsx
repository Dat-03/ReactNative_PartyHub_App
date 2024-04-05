import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ButtonCT,
  ContainerCT,
  InputCT,
  RowCT,
  SectionCT,
  SpaceCT,
  TextCT,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {Lock, Sms, User} from 'iconsax-react-native';
import {appColors} from '../../constants/themeColor';
import {images} from '../../assets/images/png';
import {SocialLogin} from './components';

const initValue = {
  username: '',
  password: '',
  email: '',
  confirmPassword: '',
};

const SignUpScreen: React.FC = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);
  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  return (
    <ContainerCT isImageBackground isScroll back>
      <SectionCT>
        <TextCT text="Sign up" size={24} title />
        <SpaceCT height={21} />
        <InputCT
          value={values.username}
          placeholder="User name"
          OnChange={val => handleChangeValue('username', val)}
          allowClear
          affix={<User size={22} color={appColors.gray} />}
        />
        <InputCT
          value={values.email}
          placeholder="abc@gmail.com"
          OnChange={val => handleChangeValue('email', val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputCT
          value={values.password}
          placeholder="Password"
          OnChange={val => handleChangeValue('password', val)}
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
          isPassword
        />
        <InputCT
          value={values.confirmPassword}
          placeholder="Confirm password"
          OnChange={val => handleChangeValue('confirmPassword', val)}
          allowClear
          affix={<Lock size={22} color={appColors.gray} />}
          isPassword
        />
      </SectionCT>
      <SpaceCT height={16} />
      <SectionCT styles={{alignItems: 'center'}}>
        <ButtonCT text="SIGN UP" type="primary" />
      </SectionCT>
      <SocialLogin />
      <SectionCT>
        <RowCT justify="center">
          <TextCT text="Don't have an acccount? " />
          <ButtonCT
            text="Sign in"
            type="link"
            onPress={() => navigation.navigate('LoginScreen')}
          />
        </RowCT>
      </SectionCT>
    </ContainerCT>
  );
};

export default SignUpScreen;
