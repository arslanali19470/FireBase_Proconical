import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { multiThemeColor, normalized } from '../../utils/AppConstants';
import Button from '../Button/Button';
import { isIos } from '../../utils/HelperFunctions';

interface MainViewProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  btn?: boolean;
  onPress?: () => void;
  maps?: boolean;
}

const MainView: React.FC<MainViewProps> = ({ children, style, btn, onPress, maps }) => {
  return (
    <KeyboardAvoidingView
      style={[
        styles.avoidingView,
        {
          paddingHorizontal: !maps ? normalized.hp(2) : normalized.hp(0),
          backgroundColor: multiThemeColor().main_background,
          paddingTop: !maps ? normalized.hp(3) : normalized.hp(0),
        },
        style,
      ]}
      behavior={isIos ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={isIos ? 10 : 30}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[
          styles.flexContainer,
          { backgroundColor: multiThemeColor().main_background },
        ]}>
        {children}
      </ScrollView>
      {btn && <Button absolute onPress={onPress} title={'Get Started'} />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  avoidingView: { flex: 1, flexDirection: 'column', justifyContent: 'center' },
  flexContainer: { flex: 1 },
});

export default MainView;
