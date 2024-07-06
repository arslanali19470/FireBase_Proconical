import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Heading from '../../../components/Headings/Heading';
import Space from '../../../components/spacer/Space';
import LottieView from 'lottie-react-native';
import Button from '../../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {multiThemeColor} from '../../../utils/AppConstants';
import PhoneInput from 'react-native-phone-number-input';

const OTPScreen: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigation = useNavigation();
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text[text.length - 1];
    }

    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        let newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
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
          text="Enter Your Phone Number Below"
          style={{
            color: multiThemeColor().textcolor,
            marginTop: 20,
            fontSize: 20,
          }}
          textAlign="center"
        />
        <Space height={100} />
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../../../LottieAnimation/OTPAnimation.json')}
            autoPlay
            loop
            style={styles.lottieStyle}
          />
        </View>
      </View>
      <Space height={200} />

      <View style={styles.container}>
        <Space height={50} />
        <View style={{flexDirection: 'row', gap: 20}}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={{
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 100,
                width: 50,
                height: 50,
                color: multiThemeColor().textcolor,
                fontSize: 25,
                alignContent: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                textAlign: 'center',
              }}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
            />
          ))}
        </View>
        <Space height={20} />
        <View style={styles.buttonContainer}>
          <Button
            title="Send Code"
            onPress={() => console.log('object')}
            backgroundColor={multiThemeColor().ButtonBackGround}
            TextColor={multiThemeColor().main_background}
          />
        </View>
      </View>

      <Space height={50} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  animationContainer: {
    flex: 1,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  lottieStyle: {
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputContainer: {
    marginTop: 30,
  },
  safeArea: {
    backgroundColor: 'pink',
    width: '100%',
  },
  phoneInputContainer: {
    width: '95%',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
  },
  phoneInputTextContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  phoneInputText: {
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    // marginTop: -100,
  },
});

export default OTPScreen;
