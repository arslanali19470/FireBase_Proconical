import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {multiThemeColor} from '../utils/AppConstants';
import Button from '../components/Button/Button';
import Space from '../components/spacer/Space';
import LottieView from 'lottie-react-native';
import Heading from '../components/Headings/Heading';
import {LoginMemberFunction} from '../FireBase/AuthFunction';
import {RootStackParamList} from '../navigation/MainNavigation/MainNavigation';

const LoginMember: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      ToastAndroid.show(
        'Kindly fill in all details correctly',
        ToastAndroid.SHORT,
      );
      return;
    }

    LoginMemberFunction({
      email: trimmedEmail,
      password: trimmedPassword,
      setEmail,
      setPassword,
      navigation,
    });
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: multiThemeColor().main_background},
      ]}>
      <View style={{flex: 1}}>
        <Space height={20} />
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
          autoCapitalize="none"
          keyboardType="email-address"
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
          backgroundColor={multiThemeColor().ButtonBackGround}
          TextColor={multiThemeColor().main_background}
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
