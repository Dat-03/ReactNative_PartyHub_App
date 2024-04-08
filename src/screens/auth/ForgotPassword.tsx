import {ArrowRight, Sms, UserEdit} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonCT,
  ContainerCT,
  InputCT,
  SectionCT,
  SpaceCT,
  TextCT,
} from '../../components';
import {appColors} from '../../constants/themeColor';
import {Validate} from '../../utils/Validate';
import {LoadingModal} from '../../modal';
import authenticationAPI from '../../apis/authApi';
import {Alert} from 'react-native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleCheckEmail = () => {
    const isValidEmail = Validate.email(email);
    setIsDisable(!isValidEmail);
  };
  const handleForgotPassword = async () => {
    const api = '/forgotPassword';
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );
      console.log(res);
      Alert.alert('Success', 'Please check your email to reset password');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(`can not send email ${error}`);
    }
  };

  return (
    <ContainerCT isImageBackground back isScroll>
      <SectionCT>
        <TextCT text="Resset Password" title />
        <TextCT text="Please enter your email address to request a password reset" />
        <SpaceCT height={26} />
        <InputCT
          value={email}
          onChange={val => setEmail(val)}
          affix={<Sms size={22} color={appColors.gray} />}
          placeholder="abc@gmail.com"
          onEnd={handleCheckEmail}
        />
      </SectionCT>
      <SectionCT>
        <ButtonCT
          disable={isDisable}
          text="Send"
          type="primary"
          icon={<ArrowRight size={20} color={appColors.white} />}
          iconFlex="right"
          onPress={handleForgotPassword}
        />
      </SectionCT>
      <LoadingModal visible={isLoading} />
    </ContainerCT>
  );
};

export default ForgotPassword;
