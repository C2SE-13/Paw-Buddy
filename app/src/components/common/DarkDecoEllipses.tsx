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
}

const DarkDecoEllipses = ({top, right, bottom, left}: Props) => {
  return (
    <CircleComponent
      size={200}
      styles={[
        {
          position: 'absolute',
          backgroundColor: colors['background-white'],
          opacity: 0.08,
          top,
          right,
          bottom,
          left,
        },
      ]}>
      <CircleComponent
        size={160}
        styles={{
          backgroundColor: colors['background-white'],
        }}>
        <CircleComponent
          size={130}
          styles={{
            backgroundColor: colors['background-white'],
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
