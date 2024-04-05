import {View, Text} from 'react-native';
import React from 'react';
import {ButtonCT, SectionCT, SpaceCT, TextCT} from '../../../components';
import {appColors} from '../../../constants/themeColor';
import {fontFamilies} from '../../../constants/FontFamilies';
import {Facebook, Google} from '../../../assets';
import {AlignLeft} from 'iconsax-react-native';

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
        textFont={fontFamilies.regular}
      />
      <ButtonCT
        type="primary"
        color={appColors.white}
        text="Login with Google"
        textColor={appColors.text}
        icon={<Facebook />}
        iconFlex="left"
        textFont={fontFamilies.regular}
      />
    </SectionCT>
  );
};

export default SocialLogin;
