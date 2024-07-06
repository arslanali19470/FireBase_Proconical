import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import SubHeading from "../SubHeading/SubHeading";
import Space from "../spacer/Space";
import {
  multiThemeColor,
  normalized,
  normalizedFont,
} from "../../utils/AppConstants";

interface CustomInputProps extends TextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  title?: string;
  width?: number | string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  color?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  title,
  width,
  leftIcon,
  rightIcon,
  secureTextEntry,
  color,
  ...props
}) => {
  return (
    <>
      <View
        style={[
          styles.container,
          {
            width: width || normalized.wp(90),
          },
        ]}
      >
        <SubHeading
          text={title}
          textAlign={"left"}
          fontSize={normalizedFont.rf(1.5)}
          marginBottom={4}
        />
        <Space height={normalized.hp(0.4)} />
        <View
          style={[
            !leftIcon && !rightIcon ? styles.input : styles.input2,
            {
              backgroundColor: multiThemeColor().main_background,
              shadowColor: multiThemeColor().light1_gray,
            },
          ]}
        >
          {leftIcon && <View>{leftIcon}</View>}
          <TextInput
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            {...props}
            color={color}
            placeholderTextColor={multiThemeColor().textcolor}
          />
          {rightIcon && <View>{rightIcon}</View>}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginLeft: 4,
    justifyContent: "center",
    alignSelf: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: "center",
    shadowColor: multiThemeColor().light1_gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  input2: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomInput;
