import {ArrowRight, Sms} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  ButtonCT,
  ContainerCT,
  InputCT,
  SectionCT,
  SpaceCT,
  TextCT,
} from '../../components';
import {appColors} from '../../constants/themeColor';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  return (
    <ContainerCT isImageBackground back>
      <SectionCT>
        <TextCT text="Resset Password" title />
        <TextCT text="Please enter your email address to request a password reset" />
        <SpaceCT height={26} />
        <InputCT
          value={email}
          OnChange={val => setEmail(val)}
          affix={<Sms size={22} color={appColors.gray} />}
          placeholder="abc@gmail.com"
        />
      </SectionCT>
      <SectionCT>
        <ButtonCT
          text="Send"
          type="primary"
          icon={<ArrowRight size={20} color={appColors.white} />}
          iconFlex="right"
        />
      </SectionCT>
    </ContainerCT>
  );
};

export default ForgotPassword;
