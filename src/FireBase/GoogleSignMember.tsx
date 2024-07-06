import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainNavigation/MainNavigation';

GoogleSignin.configure({
  webClientId:
    '177089833677-h180s0apvn56pdg0qdpv3ddu4f0sidfr.apps.googleusercontent.com',
  offlineAccess: true,
});

export const onGoogleButtonPress = async (
  navigation: NavigationProp<RootStackParamList>,
) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    await auth().signInWithCredential(googleCredential);
    console.log('User signed in with Google!');
    navigation.navigate('DrawerNavigation', {userEmail: userInfo.user.email});
  } catch (error) {
    console.error('Error signing in with Google: ', error);
    if ((error as any).code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert('Cancelled', 'Sign in was cancelled');
    } else if ((error as any).code === statusCodes.IN_PROGRESS) {
      Alert.alert('In Progress', 'Sign in is in progress');
    } else if (
      (error as any).code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
    ) {
      Alert.alert('Error', 'Play services not available or outdated');
    } else {
      Alert.alert(
        'Login Error',
        'An error occurred during Google sign-in. Please try again.',
      );
    }
  }
};
