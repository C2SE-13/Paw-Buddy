import {View, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {colors} from '../../constants/colors';

interface Props {
  size?: number;
  children: ReactNode;
  color?: string;
  radius?: number;
  styles?: StyleProp<ViewStyle>;
}

const CircleComponent = (props: Props) => {
  const {size, color, children, styles, radius} = props;

  const localStyle: ViewStyle = {
    width: size ?? 36,
    height: size ?? 36,
    backgroundColor: color ?? colors['primary-100'],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius ?? 100,
  };

  return <View style={[localStyle, styles]}>{children}</View>;
};

export default CircleComponent;
