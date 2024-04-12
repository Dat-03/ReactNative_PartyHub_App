import React, {useState} from 'react';
import {Facebook, Google} from '../../../assets';
import {ButtonCT, SectionCT, SpaceCT, TextCT} from '../../../components';
import {fontFamilies} from '../../../constants/FontFamilies';
import {appColors} from '../../../constants/themeColor';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import authenticationAPI from '../../../apis/authApi';
import {addAuth} from '../../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoadingModal} from '../../../modal';
import {
  Settings,
  LoginButton,
  LoginManager,
  Profile,
} from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId:
    '483037659079-fn327u7lp3ider59bqvjsnr8hs3jahcv.apps.googleusercontent.com',
});
Settings.setAppID('1472262400367909');
const SocialLogin = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const api = `/google-signin`;

  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo.user;
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        user,
        'post',
      );

      dispatch(addAuth(res.data));
      await AsyncStorage.setItem('auth', JSON.stringify(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);

      if (result.isCancelled) {
        console.log('Login cancel');
      } else {
        const profile = await Profile.getCurrentProfile();

        if (profile) {
          setIsLoading(true);
          const data = {
            name: profile.name,
            givenName: profile.firstName,
            familyName: profile.lastName,
            email: profile.userID,
            photo: profile.imageURL,
          };

          const res: any = await authenticationAPI.HandleAuthentication(
            api,
            data,
            'post',
          );

          dispatch(addAuth(res.data));

          await AsyncStorage.setItem('auth', JSON.stringify(res.data));

          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log('error login with facebook', error);
    }
  };

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
        onPress={handleLoginWithGoogle}
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Google"
        textFont={fontFamilies.regular}
        iconFlex="left"
        icon={<Google />}
      />
   
      <ButtonCT
        type="primary"
        color={appColors.white}
        textColor={appColors.text}
        text="Login with Facebook"
        textFont={fontFamilies.regular}
        onPress={handleLoginWithFacebook}
        iconFlex="left"
        icon={<Facebook />}
      />
      <LoadingModal visible={isLoading} />
    </SectionCT>
  );
};

export default SocialLogin;
