import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {LoadingModal} from '../../modal';
import authenticationAPI from '../../apis/authApi';
import {Validate} from '../../utils/Validate';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/auth.Reducer';

const initValue = {
  username: '',
  password: '',
  email: '',
  confirmPassword: '',
};

const SignUpScreen: React.FC = ({navigation}: any) => {
  const [values, setValues] = useState(initValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMesage, setErrorMesage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (values.email || values.password || values.confirmPassword) {
      setErrorMesage('');
    }
  }, [values.email, values.password, values.confirmPassword, values.username]);

  const handleChangeValue = (key: string, value: string) => {
    const data: any = {...values};
    data[`${key}`] = value;
    setValues(data);
  };

  const HanldeRegister = async () => {
    const {email, password, confirmPassword} = values;
    const emailValidation = Validate.email(email);
    const passwordValidation = Validate.Password(password);

    if (email && password && confirmPassword) {
      if (emailValidation && passwordValidation) {
        setErrorMesage('');
        setIsLoading(true);
        try {
          const res = await authenticationAPI.HandleAuthentication(
            '/register',
            {
              username: values.username,
              email,
              password,
            },
            'post',
          );
          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      } else {
        setErrorMesage('Email or password is invalid');
      }
    } else {
      setErrorMesage('Please fill all fields');
    }
  };

  return (
    <>
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

        {errorMesage && (
          <SectionCT>
            <TextCT text={errorMesage} color={appColors.danger} />
          </SectionCT>
        )}

        <SectionCT>
          <ButtonCT text="SIGN UP" type="primary" onPress={HanldeRegister} />
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
      <LoadingModal visible={isLoading} />
    </>
  );
};

export default SignUpScreen;
