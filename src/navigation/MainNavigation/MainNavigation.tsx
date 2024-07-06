import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import DrawerNavigation from '../Drawer_Navigation/DrawerNavigation';
import AddDilemmas from '../../screens/ClientApp/AddDilemmas';
import SearchHome from '../../screens/ClientApp/Search_Home';
import ProandCons from '../../screens/ClientApp/ProandCons';
import AddArgument from '../../screens/ClientApp/AddArgument';
// import {BLACK, GRAY, WHITE} from '../../styles/Colors';
import {
  DilemmaType,
  ArgumentType,
} from '../../services/ReduxToolkit/argumentSlice';
import SplashScreen from '../../screens/ClientApp/SplashScreen'; // Import SplashScreen
import {multiThemeColor} from '../../utils/AppConstants';
import {ProsConsType, TopicDetail} from '../../utils/TypeExport';
import SignUpMember from '../../Auth/SignUpMember';
import LoginMember from '../../Auth/LoginMember';
import WelcomeScreen from '../../Auth/WelcomeScreen';
import PhoneNumberScreen from '../../screens/ClientApp/MobileVarification/PhoneNumberScreen';
import OTPScreen from '../../screens/ClientApp/MobileVarification/OTPScreen';

export type RootStackParamList = {
  SplashScreen: undefined;
  // DrawerNavigation: {userEmail: string};
  DrawerNavigation: undefined;
  SearchHome: undefined;
  ProandCons: {selectedItem: TopicDetail | undefined};
  // ProandCons: undefined;
  'Dilemmas Description': {selectedItem: TopicDetail | ProsConsType};
  Argument: {selectedItem: TopicDetail | ProsConsType; mode: 'add' | 'update'};
  SignUpMember: undefined;
  LogInMember: undefined;
  WelcomeScreen: undefined;
  PhoneNumberScreen: undefined;
  OTPScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const color = multiThemeColor();

  return (
    <>
      <StatusBar
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkTheme ? color.BLACK : color.WHITE}
      />
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SignUpMember" component={SignUpMember} />
        <Stack.Screen name="LogInMember" component={LoginMember} />
        <Stack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />

        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen
          name="Dilemmas Description"
          component={AddDilemmas}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: multiThemeColor().GRAY},
            headerTintColor: color.OnlyWHITE,
          }}
        />
        <Stack.Screen
          name="SearchHome"
          component={SearchHome}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: multiThemeColor().GRAY},
            headerTintColor: color.OnlyWHITE,
          }}
        />
        <Stack.Screen
          name="ProandCons"
          component={ProandCons}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: multiThemeColor().GRAY},
            headerTintColor: color.OnlyWHITE,
          }}
        />
        <Stack.Screen
          name="Argument"
          component={AddArgument}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: multiThemeColor().GRAY},
            headerTintColor: color.OnlyWHITE,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainNavigation;
