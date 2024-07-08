import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {multiThemeColor} from '../utils/AppConstants';
import Button from '../components/Button/Button';
import Space from '../components/spacer/Space';
import LottieView from 'lottie-react-native';
import Heading from '../components/Headings/Heading';
import {RootStackParamList} from '../navigation/MainNavigation/MainNavigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {onGoogleButtonPress} from '../FireBase/GoogleSignMember';
import auth from '@react-native-firebase/auth';
import {
  EmailIcon,
  FacebookIcon,
  GoogleIcon,
  PersonIcon,
  PhoneIcon,
} from '../utils/Icons';
import {handleFacebookLogin} from './FaceBookAuth';
import {GuestLogin} from '../FireBase/AuthFunction';

GoogleSignin.configure({
  webClientId:
    '177089833677-h180s0apvn56pdg0qdpv3ddu4f0sidfr.apps.googleusercontent.com',
  offlineAccess: true,
});

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // const handleLogin = () => {
  //   console.log('Solve me');
  // };

  const HandleGoogleSign = () => {
    onGoogleButtonPress(navigation);
  };

  const AnonymusLogIn = () => {
    GuestLogin(navigation);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: multiThemeColor().main_background},
      ]}>
      <View style={{flex: 1}}>
        <Space height={30} />
        <View
          style={{
            flex: 1,
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <LottieView
            source={require('../LottieAnimation/WelcomeAnimation.json')}
            autoPlay
            loop
            style={{
              height: 300,
              width: 300,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Register Account"
          onPress={() => navigation.navigate('SignUpMember')}
          backgroundColor={multiThemeColor().ButtonBackGround}
          TextColor={multiThemeColor().main_background}
          leftIcon={<EmailIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Heading
          text="- - OR - -"
          textAlign="center"
          color={multiThemeColor().textcolor}
        />
        <Space height={10} />
        <Button
          title="Log in"
          onPress={() => navigation.navigate('LogInMember')}
          backgroundColor={multiThemeColor().ButtonBackGround}
          TextColor={multiThemeColor().main_background}
          leftIcon={<EmailIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Button
          title="Google"
          onPress={HandleGoogleSign}
          backgroundColor={multiThemeColor().ButtonBackGround}
          TextColor={multiThemeColor().main_background}
          leftIcon={<GoogleIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Button
          title="FaceBook"
          onPress={() => handleFacebookLogin(navigation)}
          backgroundColor={multiThemeColor().ButtonBackGround}
          TextColor={multiThemeColor().main_background}
          leftIcon={<FacebookIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Button
          title="Phone Number"
          onPress={() => navigation.navigate('PhoneNumberScreen')}
          backgroundColor={multiThemeColor().ButtonBackGround}
          TextColor={multiThemeColor().main_background}
          leftIcon={<PhoneIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Button
          title="Guest"
          onPress={AnonymusLogIn}
          backgroundColor={multiThemeColor().ButtonBackGround}
          TextColor={multiThemeColor().main_background}
          leftIcon={<PersonIcon color={multiThemeColor().main_background} />}
        />
        <Space height={80} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 30,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: 1,
    color: 'white',
    width: 300,
    marginBottom: 30,
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  registerText: {
    color: 'white',
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default WelcomeScreen;
