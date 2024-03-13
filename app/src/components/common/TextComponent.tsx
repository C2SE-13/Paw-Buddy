import {Text, StyleProp, TextStyle} from 'react-native';
import React from 'react';
import {colors} from '../../constants/colors';
import {textStyles} from '../../styles/textStyles';

interface Props {
  text: string;
  color?: string;
  size?: number;
  flex?: number;
  font?: string;
  styles?: StyleProp<TextStyle>;
  title?: boolean;
  numOfLine?: number;
}

const TextComponent = (props: Props) => {
  const {text, size, flex, font, color, styles, title, numOfLine} = props;

  const fontSizeDefault = title
    ? textStyles['semibold-18']
    : textStyles['regular-12'];

  return (
    <Text
      numberOfLines={numOfLine}
      style={[
        {
          color: color ?? colors['text-body'],
          flex: flex ?? 0,
          fontSize: size ? size : fontSizeDefault.fontSize,
          fontFamily: font ? font : fontSizeDefault.fontFamily,
          letterSpacing: fontSizeDefault.letterSpacing,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
