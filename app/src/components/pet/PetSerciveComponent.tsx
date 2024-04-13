/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import TextComponent from '../text/TextComponent';
import {colors} from '../../constants/colors';
import {IServieCategories} from '../../utils/interface';

interface Props {
  item: IServieCategories;
  onPress: () => void;
  size: 'small' | 'large';
}

const PetSerciveComponent = ({item, onPress, size}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          gap: 12,
          width: size === 'small' ? 74 : 80,
          alignItems: 'center',
        },
      ]}>
      <View
        style={[
          globalStyles.center,
          {
            width: size === 'small' ? 56 : 80,
            height: size === 'small' ? 56 : 80,
            backgroundColor: colors['primary-surface'],
            borderRadius: 1000,
          },
        ]}>
        <Image
          source={{uri: item?.image ?? ''}}
          style={{
            width: size === 'small' ? 24 : 39,
            height: size === 'small' ? 24 : 39,
            objectFit: 'cover',
          }}
        />
      </View>
      <TextComponent
        text={item?.type_service ?? ''}
        color={colors['text-100']}
        align="center"
        numOfLine={2}
        size={size === 'small' ? 12 : 14}
      />
    </TouchableOpacity>
  );
};

export default PetSerciveComponent;
