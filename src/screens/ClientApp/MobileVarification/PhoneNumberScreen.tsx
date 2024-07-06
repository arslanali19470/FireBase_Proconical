import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Heading from '../../../components/Headings/Heading';
import Space from '../../../components/spacer/Space';
import LottieView from 'lottie-react-native';
import Button from '../../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import {multiThemeColor} from '../../../utils/AppConstants';
import PhoneInput from 'react-native-phone-number-input';

const PhoneNumberScreen: React.FC = () => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const navigation = useNavigation();

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
            source={require('../../../LottieAnimation/PhoneAnimation.json')}
            autoPlay
            loop
            style={styles.lottieStyle}
          />
        </View>
      </View>
      <Space height={200} />

      <View style={styles.container}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          containerStyle={styles.phoneInputContainer}
          defaultCode="US"
          layout="first"
          onChangeText={text => {
            setValue(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Send Code"
            onPress={() => navigation.navigate('OTPScreen')}
            backgroundColor={multiThemeColor().ButtonBackGround}
            TextColor={multiThemeColor().main_background}
          />
        </View>
      </View>

      <Space height={20} />
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

export default PhoneNumberScreen;
