import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AuthNavigator from './src/navigators/AuthNavigator';
import {SplashScreen} from './src/screens';
import {StatusBar} from 'react-native';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import MainNavigator from './src/navigators/MainNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import RootNavigator from './src/navigators/RootNavigator';

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Provider store={store}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor="transparent"
          translucent
        />

        {isShowSplash ? (
          <SplashScreen />
        ) : (
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        )}
      </Provider>
    </>
  );
};

export default App;
