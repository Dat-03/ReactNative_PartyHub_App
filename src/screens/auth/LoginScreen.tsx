import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ButtonCT} from '../../components';
import {globalStyles} from '../../styles/globalStyles';

const LoginScreen: React.FC = () => {
  return (
    <View
      style={[globalStyles.container]}>
      <Text>LoginScreen</Text>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={async () => await AsyncStorage.setItem('assetToken', 'fafafafa')}
      /> */}
      <ButtonCT
        text="Login"
        onPress={() => console.log('login')}
        type='link'
        icon={
          <View>
            <Text>N</Text>
          </View>
        }
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});
