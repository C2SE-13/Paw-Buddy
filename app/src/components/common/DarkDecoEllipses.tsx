/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import CircleComponent from './CircleComponent';
import {colors} from '../../constants/colors';

interface Props {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  size?: number;
  color?: string;
}

const DarkDecoEllipses = ({top, right, bottom, left, size, color}: Props) => {
  return (
    <CircleComponent
      size={size ?? 200}
      styles={[
        {
          position: 'absolute',
          backgroundColor: color ?? colors['background-white'],
          opacity: 0.08,
          top,
          right,
          bottom,
          left,
        },
      ]}>
      <CircleComponent
        size={size ? size - 40 : 160}
        styles={{
          backgroundColor: color ?? colors['background-white'],
        }}>
        <CircleComponent
          size={size ? size - 70 : 130}
          styles={{
            backgroundColor: color ?? colors['background-white'],
          }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
            }}
          />
        </CircleComponent>
      </CircleComponent>
    </CircleComponent>
  );
};

export default DarkDecoEllipses;
