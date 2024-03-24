/* eslint-disable react-native/no-inline-styles */
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../../constants/colors';
import {globalStyles} from '../../../styles/globalStyles';
import {ImageProps} from 'react-native-svg';
import {PhotoIcon} from '../../../assets/icons';
import {shadowStyle, shadowStyle2} from '../../../styles/boxShadow';

const ImagePet = ({
  photo,
  size,
  iconChange,
  onChangeImage,
}: {
  photo: ImageProps | Readonly<ImageProps> | string;
  size: 'large' | 'small';
  iconChange?: boolean;
  onChangeImage?: () => void;
}) => {
  const photoCurrent = photo
    ? photo
    : require('../../../assets/imgs/Default.png');

  return (
    <View
      style={[
        globalStyles.center,
        localstyles.border,
        {
          width: size === 'large' ? 280 : 166,
          height: size === 'large' ? 280 : 166,
          position: 'relative',
        },
      ]}>
      <View
        style={[
          globalStyles.center,
          localstyles.border,
          {
            width: size === 'large' ? 226 : 133,
            height: size === 'large' ? 226 : 133,
          },
        ]}>
        <Image
          source={photoCurrent}
          style={{
            width: size === 'large' ? 186 : 100,
            height: size === 'large' ? 186 : 100,
            objectFit: 'cover',
            borderRadius: 1000,
          }}
        />
      </View>
      {iconChange && (
        <TouchableOpacity
          onPress={onChangeImage}
          style={[
            globalStyles.center,
            shadowStyle,
            shadowStyle2,
            {
              position: 'absolute',
              width: 46,
              height: 46,
              backgroundColor: colors['background-white'],
              borderRadius: 14,
              bottom: 21,
            },
          ]}>
          <PhotoIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ImagePet;

const localstyles = StyleSheet.create({
  border: {
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: colors['grey-150'],
  },
});
