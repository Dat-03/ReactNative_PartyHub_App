import {View, Text} from 'react-native';
import React from 'react';
import {ButtonCT, SectionCT, TextCT} from '../../../components';
import {appColors} from '../../../constants/themeColor';
import {fontFamilies} from '../../../constants/FontFamilies';
import {Google} from 'iconsax-react-native';

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
      <ButtonCT
        type="primary"
        color={appColors.white}
        text="Login with Google"
        textColor={appColors.text}
        icon={<Google size={24} color={appColors.primary} />}
        iconFlex="left"
      />
    </SectionCT>
  );
};

export default SocialLogin;
