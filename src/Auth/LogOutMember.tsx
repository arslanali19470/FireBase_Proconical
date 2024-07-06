import React from 'react';
import {View, Alert, StyleSheet, ToastAndroid} from 'react-native';
import LottieView from 'lottie-react-native';
import {multiThemeColor} from '../utils/AppConstants';
import Heading from '../components/Headings/Heading';
import Space from '../components/spacer/Space';
import SubHeading from '../components/SubHeading/SubHeading';
import Button from '../components/Button/Button';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {handleLogoutMember} from '../FireBase/AuthFunction';
import {RootStackParamList} from '../navigation/MainNavigation/MainNavigation';

const LogOutMember = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View
      style={{
        flex: 1,
        alignContent: 'flex-start',
        alignSelf: 'center',
        backgroundColor: multiThemeColor().main_background,
        width: '100%',
      }}>
      <Heading
        text="LogOut"
        style={{
          color: multiThemeColor().textcolor,
          marginTop: 20,
          fontSize: 40,
        }}
        textAlign="center"
      />
      <Space height={80} />
      <View
        style={{
          height: 200,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <LottieView
          source={require('../LottieAnimation/logoutnew.json')}
          autoPlay
          loop
          style={{
            height: 400,
            width: 500,
            alignContent: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
          }}
        />
      </View>
      <SubHeading
        text="I want to logout from this account and also delete my current data on this app"
        style={{padding: 50, fontSize: 15}}
        textAlign="center"
      />
      <Button
        title="LogOut"
        onPress={() => handleLogoutMember(navigation)}
        backgroundColor="white"
        TextColor="black"
      />
    </View>
  );
};

export default LogOutMember;

const styles = StyleSheet.create({});