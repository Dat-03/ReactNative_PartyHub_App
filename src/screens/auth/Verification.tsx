import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ButtonCT,
  ContainerCT,
  RowCT,
  SectionCT,
  SpaceCT,
  TextCT,
} from '../../components';
import {appColors} from '../../constants/themeColor';
import {fontFamilies} from '../../constants/FontFamilies';
import {ArrowRight} from 'iconsax-react-native';
import {globalStyles} from '../../styles/globalStyles';
import authenticationAPI from '../../apis/authApi';
import {LoadingModal} from '../../modal';
import {useDispatch} from 'react-redux';
import {addAuth} from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Verification = ({navigation, route}: any) => {
  const {code, email, password, username} = route.params;
  const [currentCode, setCurrentCode] = useState<string>(code);
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');
  const [limit, setLimit] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();
  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);

  useEffect(() => {
    let item = '';
    console.log(codeValues);
    codeValues.forEach(val => (item += val));
    console.log(item);
    setNewCode(item);
  }, [codeValues]);

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;
    setCodeValues(data);
  };

  const handleResendCode = async () => {
    setCodeValues(['', '', '', '']);
    setNewCode('');
    const api = '/verification';
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );
      setLimit(120);
      setCurrentCode(res.data.code);
      setIsLoading(false);
      console.log(res.data.code);
    } catch (error) {
      setIsLoading(false);
      console.log(`can not send verification code ${error}`);
    }
  };

  const handleVerification = async () => {
    if (limit > 0) {
      if (parseInt(newCode) !== parseInt(currentCode)) {
        setErrorMessage('Invalid code !!!!');
      } else {
        setErrorMessage('');
        const api = '/register';
        const data = {email, password, username: username ?? ''};
        try {
          const res: any = await authenticationAPI.HandleAuthentication(
            api,
            data,
            'post',
          );
          console.log(res.data);
          dispatch(addAuth(res.data));
          await AsyncStorage.setItem('auth', JSON.stringify(res.data));
        } catch (error) {
          setErrorMessage('Email is already exist, please try another email');

          console.log(`Can not register user ${error}`);
        }
      }
    } else {
      setErrorMessage('Time out verification code, please resend new code');
    }
  };

  return (
    <ContainerCT back isImageBackground isScroll>
      <SectionCT>
        <TextCT text="Verification" title />
        <SpaceCT height={12} />
        <TextCT
          text={`We’ve send you the verification code on ${email.replace(
            /.{1,5}/,
            (m: any) => '*'.repeat(m.length),
          )}`}
        />
        <SpaceCT height={26} />
        <RowCT justify="space-around">
          <TextInput
            keyboardType="number-pad"
            ref={ref1}
            value={codeValues[0]}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
            onChangeText={val => {
              val.length > 0 && ref2.current.focus();
              handleChangeCode(val, 0);
            }}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref2}
            value={codeValues[1]}
            onChangeText={val => {
              val.length > 0 && ref3.current.focus();
              handleChangeCode(val, 1);
            }}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref3}
            value={codeValues[2]}
            onChangeText={val => {
              ref4.current.focus();
              handleChangeCode(val, 2);
              val.length > 0 && ref4.current.focus();
            }}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref4}
            value={codeValues[3]}
            onChangeText={val => {
              handleChangeCode(val, 3);
            }}
            style={[styles.input]}
            placeholder="-"
            maxLength={1}
          />
        </RowCT>
      </SectionCT>
      <SectionCT styles={{marginTop: 40}}>
        <ButtonCT
          text="Continue"
          disable={newCode.length !== 4}
          onPress={handleVerification}
          type="primary"
          iconFlex="right"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor:
                    newCode.length === 4 ? appColors.primary2 : appColors.gray,
                },
              ]}>
              <ArrowRight size={18} color={appColors.white} />
            </View>
          }
        />
      </SectionCT>
      {errorMessage && (
        <SectionCT>
          <TextCT
            text={errorMessage}
            flex={0}
            styles={{textAlign: 'center'}}
            color={appColors.danger}
          />
        </SectionCT>
      )}
      <SectionCT>
        {limit > 0 ? (
          <RowCT justify="center">
            <TextCT text="Re-send code in " flex={0} />
            <TextCT
              text={`${(limit - (limit % 60)) / 60}: ${
                limit - (limit - (limit % 60))
              }`}
              flex={0}
              color={appColors.link}
            />
          </RowCT>
        ) : (
          <RowCT>
            <ButtonCT
              type="link"
              text="Resend Email verification"
              onPress={handleResendCode}
            />
          </RowCT>
        )}
      </SectionCT>
      <LoadingModal visible={isLoading} />
    </ContainerCT>
  );
};

export default Verification;

const styles = StyleSheet.create({
  input: {
    height: 55,
    width: 55,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: appColors.gray2,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontFamily: fontFamilies.bold,
    textAlign: 'center',
  },
});
