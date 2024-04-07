import React from 'react';
import {Facebook, Google} from '../../../assets';
import {ButtonCT, SectionCT, SpaceCT, TextCT} from '../../../components';
import {fontFamilies} from '../../../constants/FontFamilies';
import {appColors} from '../../../constants/themeColor';

const SocialLogin = () => {
  return (
    <SectionCT>
      <TextCT
        styles={{textAlign: 'center'}}
        text="OR"
        color={appColors.gray4}
        size={16}
        font={fontFamilies.medium}
      />
      <SpaceCT height={16} />
      <ButtonCT
        type="primary"
        color={appColors.white}
        text="Login with Google"
        textColor={appColors.text}
        icon={<Google />}
        iconFlex="left"
        textFont={fontFamilies.medium}
      />
      <ButtonCT
        type="primary"
        color={appColors.white}
        text="Login with Facebook"
        textColor={appColors.text}
        icon={<Facebook />}
        iconFlex="left"
        textFont={fontFamilies.medium}
      />
    </SectionCT>
  );
};

export default SocialLogin;
