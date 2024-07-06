import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {
  useNavigation,
  RouteProp,
  DrawerActions,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Home_Dilemmas from '../../screens/ClientApp/Home_Dilemmas';
import Trash from '../../screens/ClientApp/Trash';
import CustomDrawerContent from '../../components/CustomDrawerContent/CustomDrawerContent';
import HeaderLeft from '../../components/HeaderLeft/HeaderLeft';
import Settings from '../../screens/ClientApp/Settings/Index';
import ProFeatcher from '../../screens/ClientApp/ProFeatcher';
// import {BLUE2, GRAY} from '../../styles/Colors';
import {
  BarIcon,
  TrashIcon,
  SettingsIcon,
  CartIcon,
  LogoutMemberIcon,
} from '../../utils/Icons';
import {MaterialIcons, multiThemeColor} from '../../utils/AppConstants';
import {RootStackParamList} from '../MainNavigation/MainNavigation';
import LogOutMember from '../../Auth/LogOutMember';

// Type definitions for navigation and route
type DrawerScreenNavigationProp = DrawerNavigationProp<
  RootStackParamList,
  'DrawerNavigation'
>;
type DrawerScreenRouteProp = RouteProp<RootStackParamList, 'DrawerNavigation'>;

export type DrawerScreenProps = {
  navigation: DrawerScreenNavigationProp;
  route: DrawerScreenRouteProp;
};

// Define the type for DrawerParamList
export type DrawerParamList = {
  Dilemmas: undefined;
  Trash: undefined;
  Settings: undefined;
  'Pro Features': undefined;
  SearchHome: undefined;
  'Dilemmas Description': undefined;
  LogOut: undefined;
};

// Create the Drawer Navigator
const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigation: React.FC<DrawerScreenProps> = () => {
  // Use navigation hook with correct type
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: multiThemeColor().BLUE2,
        drawerStyle: {
          backgroundColor: multiThemeColor().main_background,
        },
        drawerLabelStyle: {
          color: multiThemeColor().textcolor,
        },
        drawerActiveTintColor: 'white',

        drawerPosition: 'left',
        headerStyle: {
          backgroundColor: multiThemeColor().GRAY,
        },
        drawerType: 'back',
        headerShadowVisible: false,
        headerTitle: '',
        headerLeft: () => (
          <HeaderLeft
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() => navigation.navigate('SearchHome')}>
            <MaterialIcons name="search" size={25} color="white" />
          </TouchableOpacity>
        ),
      }}
      initialRouteName="Dilemmas">
      <Drawer.Screen
        name="Dilemmas"
        component={Home_Dilemmas}
        options={{
          drawerIcon: () => <BarIcon color={multiThemeColor().textcolor} />,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Trash"
        component={Trash}
        options={{
          drawerIcon: () => <TrashIcon color={multiThemeColor().textcolor} />,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: () => (
            <SettingsIcon color={multiThemeColor().textcolor} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Pro Features"
        component={ProFeatcher}
        options={{
          drawerIcon: () => <CartIcon color={multiThemeColor().textcolor} />,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="LogOut"
        component={LogOutMember}
        options={{
          drawerIcon: () => (
            <LogoutMemberIcon color={multiThemeColor().textcolor} />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
