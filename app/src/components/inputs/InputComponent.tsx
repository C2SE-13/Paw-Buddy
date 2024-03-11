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
import {AddIcon, EyeIcon, EyeCloseIcon} from '../../assets/icons';

interface Props {
  value: string;
  onChange: (val: string) => void;
  iconLeft?: ReactNode;
  placeholder?: string;
  iconRight?: ReactNode;
  isPassword?: boolean;
  allowClear?: boolean;
  type?: KeyboardType;
  onEnd?: () => void;
  multiline?: boolean;
  numberOfLine?: number;
  styles?: StyleProp<ViewStyle>;
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
  } = props;

  const [isShowPass, setIsShowPass] = useState(isPassword ?? false);

  return (
    <View
      style={[
        globalStyles.input,
        {
          borderColor: colors['text-30'],
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
  );
};

export default InputComponent;
