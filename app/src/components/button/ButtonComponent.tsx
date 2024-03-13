/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {TextComponent} from '..';
import {colors} from '../../constants/colors';
import {textStyles} from '../../styles/textStyles';

interface Props {
  text: string;
  type: 'primary' | 'secondary' | 'disabled';
  size: 'large' | 'medium' | 'small' | 'tiny' | number;
  radius?: number;
  color?: string;
  styles?: StyleProp<ViewStyle>;
  textColor?: string;
  textStyle?: StyleProp<TextStyle>;
  textFont?: string;
  onPress?: () => void;
}

const ButtonComponent = (props: Props) => {
  const {
    text,
    textColor,
    textFont,
    color,
    styles,
    onPress,
    type,
    textStyle,
    size,
    radius,
  } = props;

  const buttonDefault: StyleProp<TextStyle> =
    size === 'tiny'
      ? {
          borderRadius: radius ?? 24,
          width: 51,
          ...textStyles['medium-8'],
        }
      : size === 'small'
      ? {
          borderRadius: radius ?? 48,
          width: 109,
          ...textStyles['regular-12'],
        }
      : size === 'medium'
      ? {
          borderRadius: radius ?? 24,
          width: 148,
          ...textStyles['semibold-12'],
        }
      : size === 'large'
      ? {
          borderRadius: radius ?? 16,
          width: '100%',
          ...textStyles['semibold-16'],
        }
      : {
          borderRadius: radius ?? 16,
          width: size ?? '100%',
          ...textStyles['semibold-16'],
        };

  const buttonColor = color
    ? color
    : type === 'primary'
    ? colors['primary-100']
    : type === 'disabled'
    ? colors['text-40']
    : 'transparent';

  const textDefault =
    type === 'primary'
      ? {
          color: colors['background-white'],
        }
      : type === 'disabled'
      ? {color: colors['text-50']}
      : {color: colors['primary-100']};

  return (
    <View style={{width: '100%', alignItems: 'center'}}>
      <TouchableOpacity
        disabled={type === 'disabled' ? true : false}
        onPress={onPress}
        style={[
          {
            paddingVertical: 16,
            backgroundColor: buttonColor,
            borderRadius: buttonDefault.borderRadius,
            width: buttonDefault.width,
            borderWidth: type === 'secondary' ? 1 : 0,
            borderColor: textColor ?? textDefault.color,
          },
          styles,
        ]}>
        <TextComponent
          text={text}
          color={
            type === 'disabled'
              ? textDefault.color
              : textColor ?? textDefault.color
          }
          styles={[textStyles['semibold-16'], {textAlign: 'center'}, textStyle]}
          font={textFont ?? buttonDefault.fontFamily}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;
