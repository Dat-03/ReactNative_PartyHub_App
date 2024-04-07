import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ButtonCT} from '../../components';
import {useDispatch} from 'react-redux';
import {removeAuth} from '../../redux/reducers/auth.Reducer';

const HomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <ButtonCT text="LogOut" onPress={() => dispatch(removeAuth({}))} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
