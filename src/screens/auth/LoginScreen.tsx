import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen:React.FC = () => {
  return (
    <View>
      <Text>LoginScreen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => await AsyncStorage.setItem('assetToken', 'fafafafa')}
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
