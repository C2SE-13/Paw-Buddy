/* eslint-disable react-native/no-inline-styles */
import {StyleProp, ViewProps, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {TextComponent} from '..';
import {textStyles} from '../../styles/textStyles';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../styles/globalStyles';
import {ChevronRightIcon} from '../../assets/icons';

interface Props {
  onPress: () => void;
  text: string;
  textColor?: string;
  textSize?: number;
  textFont?: string;
  textStyle?: StyleProp<ViewProps>;
  bgColor?: string;
  styles?: StyleProp<ViewProps>;
  icon?: ReactNode;
  iconLink?: boolean;
  type: 'text' | 'button';
}

const LinkComponent = (props: Props) => {
  const {
    text,
    onPress,
    textColor,
    textSize,
    textFont,
    textStyle,
    bgColor,
    styles,
    icon,
    iconLink,
    type,
  } = props;

  const textDefault = textStyles['regular-14'];

  return type === 'text' ? (
    <TouchableOpacity onPress={onPress} style={styles}>
      <TextComponent
        text={text}
        styles={[
          {
            fontSize: textSize ?? textDefault.fontSize,
            fontFamily: textFont ?? textDefault.fontFamily,
            color: textColor ?? colors['text-100'],
          },
          textStyle,
        ]}
        flex={0}
      />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles.row,
        globalStyles.center,
        {
          backgroundColor: bgColor ?? 'transparent',
          paddingVertical: 14,
          gap: icon ? 13 : 0,
          borderBottomWidth: 1,
          borderColor: colors['text-30'],
        },
        styles,
      ]}>
      {icon && icon}
      <TextComponent
        text={text}
        styles={[
          {
            fontSize: textSize ?? textDefault.fontSize,
            fontFamily: textFont ?? textDefault.fontFamily,
            color: textColor ?? colors['text-100'],
          },
          textStyle,
        ]}
        flex={1}
      />
      {iconLink && <ChevronRightIcon />}
    </TouchableOpacity>
  );
};

export default LinkComponent;
