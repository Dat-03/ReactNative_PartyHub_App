import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import RootNavigator from './src/navigators/RootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import {HandleNotification} from './src/utils/HandleNotification';

const App = () => {
  useEffect(() => {
    HandleNotification.checkNotificationPersion();
  }, []);
  return (
    <>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Host>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </Host>
        </Provider>
      </GestureHandlerRootView>
    </>
  );
};

export default App;
