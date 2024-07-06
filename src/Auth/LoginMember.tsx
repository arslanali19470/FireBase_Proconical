import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {multiThemeColor} from '../utils/AppConstants';
import Button from '../components/Button/Button';
import Space from '../components/spacer/Space';
import LottieView from 'lottie-react-native';
import Heading from '../components/Headings/Heading';
import {LoginMemberFunction} from '../FireBase/AuthFunction';
import {RootStackParamList} from '../navigation/MainNavigation/MainNavigation';
// import auth from '@react-native-firebase/auth';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '177089833677-h180s0apvn56pdg0qdpv3ddu4f0sidfr.apps.googleusercontent.com',
  offlineAccess: true,
});

const LoginMember: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    LoginMemberFunction({email, password, setEmail, setPassword, navigation});
  };

  // const onGoogleButtonPress = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     const googleCredential = auth.GoogleAuthProvider.credential(
  //       userInfo.idToken,
  //     );
  //     await auth().signInWithCredential(googleCredential);
  //     console.log('User signed in with Google!');
  //     navigation.navigate('DrawerNavigation', {userEmail: userInfo.user.email});
  //   } catch (error) {
  //     console.error('Error signing in with Google: ', error);
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       Alert.alert('Cancelled', 'Sign in was cancelled');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       Alert.alert('In Progress', 'Sign in is in progress');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       Alert.alert('Error', 'Play services not available or outdated');
  //     } else {
  //       Alert.alert(
  //         'Login Error',
  //         'An error occurred during Google sign-in. Please try again.',
  //       );
  //     }
  //   }
  // };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: multiThemeColor().main_background},
      ]}>
      <View style={{flex: 1}}>
        <Heading
          text="Join Us"
          style={{
            color: multiThemeColor().textcolor,
            marginTop: 20,
            fontSize: 40,
          }}
          textAlign="center"
        />
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
            source={require('../LottieAnimation/Loginnew.json')}
            autoPlay
            loop
            style={{
              height: 200,
              width: 200,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your Email here * "
          value={email}
          onChangeText={text => setEmail(text)}
          style={[styles.textInput, {borderColor: multiThemeColor().textcolor}]}
          placeholderTextColor={multiThemeColor().PlaceHolder}
        />
        <TextInput
          placeholder="Enter your Password here * "
          value={password}
          onChangeText={text => setPassword(text)}
          style={[styles.textInput, {borderColor: multiThemeColor().textcolor}]}
          placeholderTextColor={multiThemeColor().PlaceHolder}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.registerLink}
          onPress={() => navigation.navigate('SignUpMember')}>
          <Text style={styles.registerText}>Want to Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Log in"
          onPress={handleLogin}
          backgroundColor="white"
          TextColor="black"
        />

        <Space height={100} />
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

export default LoginMember;
