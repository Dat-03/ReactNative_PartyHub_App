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
import {Lock, Sms} from 'iconsax-react-native';
import {appColors} from '../../constants/themeColor';
import {images} from '../../assets/images/png';
import {SocialLogin} from './components';
import authenticationAPI from '../../apis/authApi';

const LoginScreen: React.FC = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);

  const handleLogin = async () => {
    try {
      const res = await authenticationAPI.HandleAuthentication('/hello');
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ContainerCT isImageBackground isScroll>
      <SectionCT
        styles={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 25,
        }}>
        <Image
          source={images.signIn}
          style={{width: 162, height: 114, marginStart: 18}}
        />
      </SectionCT>
      <SectionCT>
        <TextCT text="Sign In" size={24} title />
        <SpaceCT height={21} />
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
        <RowCT justify="space-between">
          <RowCT onPress={() => setIsRemember(!isRemember)}>
            <Switch
              trackColor={{true: appColors.primary}}
              thumbColor={appColors.white}
              value={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <TextCT text="Remember me" />
          </RowCT>
          <ButtonCT
            text="Forgot Password?"
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </RowCT>
      </SectionCT>

      <SectionCT>
        <ButtonCT text="SIGN IN" type="primary" onPress={handleLogin} />
      </SectionCT>

      <SocialLogin />
      <SectionCT>
        <RowCT justify="center">
          <TextCT text="Don't have an acccount? " />
          <ButtonCT
            text="Sign Up"
            type="link"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowCT>
      </SectionCT>
    </ContainerCT>
  );
};

export default LoginScreen;
