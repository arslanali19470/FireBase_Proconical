import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
// import { Colors } from "../../styles";
import {FONT_REGULAR} from '../../styles/Typography';
import {
  multiThemeColor,
  normalized,
  normalizedFont,
} from '../../utils/AppConstants';

interface ParagraphProps {
  text: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  color?: string;
  marginTop?: number;
  weight?: TextStyle['fontWeight'];
  onPress?: () => void;
  fontSize?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

const Paragraph: React.FC<ParagraphProps> = ({
  text,
  textAlign,
  color,
  marginTop,
  weight,
  onPress,
  fontSize,
  marginBottom,
  marginLeft,
  marginRight,
}) => {
  return (
    <Text
      onPress={onPress}
      style={{
        textAlign: textAlign,
        fontSize: fontSize || normalized(3.5),
        color: color || multiThemeColor().textcolor,
        fontWeight: weight,
        marginLeft: marginLeft,
        marginRight: marginRight,
        marginBottom: marginBottom,
        marginTop: marginTop,
        fontFamily: FONT_REGULAR,
      }}>
      {text}
    </Text>
  );
};

export default Paragraph;

const styles = StyleSheet.create({});
