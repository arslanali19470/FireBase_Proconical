import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {ThemeProvider} from './src/utils/ThemeContext';
import MainNavigation from './src/navigation/MainNavigation/MainNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App: React.FC = () => {
  // React.useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '177089833677-k8vval6n4l3l69ct85gm9b8eqbc720dv.apps.googleusercontent.com',
  //     // offlineAccess: true,
  //   });
  // }, []);

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
