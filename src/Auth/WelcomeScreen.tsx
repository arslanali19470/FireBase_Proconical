import React, {useRef} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {multiThemeColor} from '../utils/AppConstants';
import Button from '../components/Button/Button';
import Space from '../components/spacer/Space';
import LottieView from 'lottie-react-native';
import Heading from '../components/Headings/Heading';
import {RootStackParamList} from '../navigation/MainNavigation/MainNavigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  EmailIcon,
  FacebookIcon,
  GoogleIcon,
  PersonIcon,
  PhoneIcon,
} from '../utils/Icons';
import {onGoogleButtonPress} from '../FireBase/GoogleSignMember';
import {AccessToken, Profile, LoginButton} from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId:
    '177089833677-h180s0apvn56pdg0qdpv3ddu4f0sidfr.apps.googleusercontent.com',
  offlineAccess: true,
});

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const loginButtonRef = useRef(null);

  const handleLogin = () => {
    console.log('Solve me ');
  };

  const HandleGoogleSign = () => {
    onGoogleButtonPress(navigation);
  };

  const handleLoginFinished = (error, result) => {
    if (error) {
      console.log('Login has error: ' + error);
    } else if (result.isCancelled) {
      console.log('Login is cancelled.');
    } else {
      AccessToken.getCurrentAccessToken()
        .then(data => {
          console.log(data.accessToken.toString());

          // Retrieve profile information along with the access token
          Profile.getCurrentProfile()
            .then(currentProfile => {
              if (currentProfile) {
                console.log(
                  'The current logged user is: ' +
                    currentProfile.name +
                    '. His profile id is: ' +
                    currentProfile.userID,
                );
                Alert.alert(currentProfile.name);
              }
            })
            .catch(err => console.log('Error fetching profile: ', err));
        })
        .catch(err => console.log('Error fetching access token: ', err));
    }
  };

  const handleFacebookLogin = () => {
    if (loginButtonRef.current) {
      loginButtonRef.current.props.onLoginFinished();
    }
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
          backgroundColor="white"
          TextColor="black"
          leftIcon={<EmailIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Heading text="OR" textAlign="center" />
        <Space height={10} />
        <Button
          title="Log in"
          onPress={() => navigation.navigate('LogInMember')}
          backgroundColor="white"
          TextColor="black"
          leftIcon={<EmailIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Button
          title="with Google"
          onPress={HandleGoogleSign}
          backgroundColor="white"
          TextColor="black"
          leftIcon={<GoogleIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Button
          title="with FaceBook"
          onPress={handleFacebookLogin}
          backgroundColor="white"
          TextColor="black"
          leftIcon={<FacebookIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Button
          title="with Phone Number"
          onPress={handleLogin}
          backgroundColor="white"
          TextColor="black"
          leftIcon={<PhoneIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Button
          title="as Guest"
          onPress={handleLogin}
          backgroundColor="white"
          TextColor="black"
          leftIcon={<PersonIcon color={multiThemeColor().main_background} />}
        />
        <View style={{display: 'none'}}>
          <LoginButton
            ref={loginButtonRef}
            onLoginFinished={handleLoginFinished}
            onLogoutFinished={() => console.log('Logout.')}
          />
        </View>
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
