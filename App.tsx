import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {ThemeProvider} from './src/utils/ThemeContext';
import MainNavigation from './src/navigation/MainNavigation/MainNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            <MainNavigation />
          </NativeBaseProvider>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
