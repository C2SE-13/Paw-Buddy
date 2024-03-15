/* eslint-disable react-native/no-inline-styles */
import {
  View,
  KeyboardType,
  StyleProp,
  ViewStyle,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode, useState} from 'react';
import {colors} from '../../constants/colors';
import {globalStyles} from '../../styles/globalStyles';
import {textStyles} from '../../styles/textStyles';
import {AddIcon, EyeIcon, EyeCloseIcon, ErrorIcon} from '../../assets/icons';
import {RowComponent, TextComponent} from '..';
import {fontFamilies} from '../../constants/fontFamilies';

interface Props {
  value: string;
  onChange: (val: string) => void;
  iconLeft?: ReactNode;
  placeholder?: string;
  iconRight?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
  multiline?: boolean;
  numberOfLine?: number;
  styles?: StyleProp<ViewStyle>;
  error?: string;
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    iconLeft,
    iconRight,
    placeholder,
    isPassword,
    allowClear,
    type,
    multiline,
    numberOfLine,
    styles,
    error,
  } = props;

  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

  return (
    <View style={[globalStyles['w-100'], {gap: error ? 5 : 0}]}>
      <View
        style={[
          globalStyles.input,
          {
            borderColor: error ? colors['fill-red'] : colors['text-30'],
            gap: iconLeft || iconRight || allowClear || isShowPass ? 13 : 0,
          },
          styles,
        ]}>
        {iconLeft ?? iconLeft}
        <TextInput
          multiline={multiline}
          value={value}
          numberOfLines={numberOfLine}
          placeholder={placeholder ?? ''}
          onChangeText={val => onChange(val)}
          secureTextEntry={isShowPass}
          placeholderTextColor={colors['text-50']}
          keyboardType={type ?? 'default'}
          autoCapitalize="none"
          style={[
            textStyles['medium-14'],
            {
              flex: 1,
            },
          ]}
        />
        {iconRight ?? iconRight}
        {isPassword && (
          <TouchableOpacity onPress={() => setIsShowPass(!isShowPass)}>
            {isShowPass ? <EyeIcon /> : <EyeCloseIcon />}
          </TouchableOpacity>
        )}
        {value && value.length > 0 && allowClear && (
          <TouchableOpacity onPress={() => onChange('')}>
            <AddIcon />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <RowComponent
          gap={4}
          justify="flex-start"
          styles={{paddingHorizontal: 6}}>
          <ErrorIcon />
          <TextComponent
            color={colors['fill-red']}
            font={fontFamilies['inter-medium']}
            text={error}
          />
        </RowComponent>
      )}
    </View>
  );
};

export default InputComponent;
