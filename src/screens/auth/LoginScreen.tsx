import {Lock, Sms} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, Image, Switch} from 'react-native';
import authenticationAPI from '../../apis/authApi';
import {
  ButtonCT,
  ContainerCT,
  InputCT,
  RowCT,
  SectionCT,
  SpaceCT,
  TextCT,
} from '../../components';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addAuth} from '../../redux/reducers/authReducer';
import {images} from '../../assets';
import {appColors} from '../../constants/themeColor';
import {SocialLogin} from './components';
import {Validate} from '../../utils/Validate';

const LoginScreen: React.FC = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(true);
  const dispatch = useDispatch();
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const emailValidation = Validate.email(email);

    if (!email || !password || !emailValidation) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [email, password]);

  const handleLogin = async () => {
    const emailValidation = Validate.email(email);
    if (emailValidation) {
      setIsLoading(true);
      try {
        const res = await authenticationAPI.HandleAuthentication(
          '/login',
          {email, password},
          'post',
        );
        dispatch(addAuth(res.data));
        await AsyncStorage.setItem(
          'auth',
          isRemember ? JSON.stringify(res.data) : email,
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    } else {
      Alert.alert('Email is not valid');
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
        <Image source={images.signIn} style={{width: 162, height: 114}} />
      </SectionCT>
      <SectionCT>
        <TextCT text="Sign In" size={24} title />
        <SpaceCT height={21} />
        <InputCT
          value={email}
          placeholder="Email"
          onChange={val => setEmail(val)}
          allowClear
          affix={<Sms size={22} color={appColors.gray} />}
        />
        <InputCT
          value={password}
          placeholder="Password"
          onChange={val => setPassword(val)}
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
            <SpaceCT width={4} />
            <TextCT text="Remember me" />
          </RowCT>
          <ButtonCT
            text="Forgot Password?"
            onPress={() => navigation.navigate('ForgotPassword')}
            type="text"
          />
        </RowCT>
      </SectionCT>

      <SectionCT>
        <ButtonCT
          disable={isLoading || isDisable}
          onPress={handleLogin}
          text="SIGN IN"
          type="primary"
        />
      </SectionCT>

      <SocialLogin />
      <SectionCT>
        <RowCT justify="center">
          <TextCT text="Don't have an acccount? " />
          <ButtonCT
            type="link"
            text="Sign up"
            onPress={() => navigation.navigate('SignUpScreen')}
          />
        </RowCT>
      </SectionCT>
    </ContainerCT>
  );
};

export default LoginScreen;
