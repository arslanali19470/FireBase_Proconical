import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {multiThemeColor} from '../utils/AppConstants';
import Button from '../components/Button/Button';
import Space from '../components/spacer/Space';
import LottieView from 'lottie-react-native';
import Heading from '../components/Headings/Heading';
import {SignUpMemberFunction} from '../FireBase/AuthFunction';
import {RootStackParamList} from '../navigation/MainNavigation/MainNavigation';
import SubHeading from '../components/SubHeading/SubHeading';

const SignUpMember: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    SignUpMemberFunction({
      fullName,
      email,
      password,
      setEmail,
      setPassword,
      setFullName,
      navigation,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: multiThemeColor().main_background,
      }}>
      <View style={{flex: 1}}>
        <Space height={10} />
        <Heading
          text="Registration"
          style={{fontSize: 40, color: 'white', marginTop: 40}}
        />
        <Space height={30} />
        <View
          style={{
            flex: 1,
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../LottieAnimation/SignUpnew.json')}
            autoPlay
            loop
            style={{height: 200, width: 300}}
          />
        </View>
      </View>
      <View>
        <TextInput
          placeholder="Your Name *"
          value={fullName}
          onChangeText={text => setFullName(text)}
          style={{
            padding: 5,
            borderColor: multiThemeColor().textcolor,
            borderBottomWidth: 1,
            color: multiThemeColor().textcolor,
            width: 300,
            marginBottom: 30,
          }}
          placeholderTextColor="white"
        />
        <TextInput
          placeholder="Your Email *"
          value={email}
          onChangeText={text => setEmail(text)}
          style={{
            padding: 5,
            borderColor: multiThemeColor().textcolor,
            borderBottomWidth: 1,
            color: multiThemeColor().textcolor,
            width: 300,
            marginBottom: 30,
          }}
          placeholderTextColor="white"
        />
        <TextInput
          placeholder=" Create Password *"
          value={password}
          onChangeText={text => setPassword(text)}
          style={{
            padding: 5,
            borderColor: multiThemeColor().textcolor,
            borderBottomWidth: 1,
            color: multiThemeColor().textcolor,
            width: 300,
            marginBottom: 30,
          }}
          placeholderTextColor="white"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: 10,
          }}>
          <SubHeading
            text=" Have an account"
            style={{color: multiThemeColor().textcolor, margin: 10}}
            onPress={() => navigation.navigate('WelcomeScreen')}
          />
        </TouchableOpacity>
        <Space height={20} />
      </View>
      <View>
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          backgroundColor={multiThemeColor().textcolor}
          TextColor={multiThemeColor().main_background}
        />
        <Space height={70} />
      </View>
    </View>
  );
};

export default SignUpMember;

const styles = StyleSheet.create({});
