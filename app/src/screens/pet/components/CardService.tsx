/* eslint-disable react-native/no-inline-styles */
import {View, Image, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {colors} from '../../../constants/colors';
import {
  DarkDecoEllipses,
  RowComponent,
  TextComponent,
} from '../../../components';
import {LocationIcon} from '../../../assets/icons';
import {shadowStyle, shadowStyle2} from '../../../styles/boxShadow';

interface Props {
  nameService: string;
  image: string;
}

const CardService = ({nameService, image}: Props) => {
  return (
    <View
      style={[
        shadowStyle,
        shadowStyle2,
        {
          height: 148,
          backgroundColor: colors['blue-500'],
          borderRadius: 14,
          paddingVertical: 16,
          paddingHorizontal: 20,
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors['grey-100'],
        },
      ]}>
      <View style={{gap: 6, width: 188}}>
        <TextComponent
          text={nameService}
          title
          size={20}
          color={colors['background-white']}
        />
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
          <LocationIcon />
          <TextComponent
            text="70 North Street London, UK"
            size={14}
            color={colors['grey-100']}
          />
        </View>
      </View>
      <RowComponent justify="space-between">
        <RowComponent>
          <TextComponent text="4,6" />
        </RowComponent>
        <RowComponent>
          <TextComponent text="263" />
        </RowComponent>
      </RowComponent>
      <Image
        source={
          image ? {uri: image} : require('../../../assets/imgs/Default.png')
        }
        style={{
          width: 100,
          height: 100,
          zIndex: 100,
          borderRadius: 100,
          position: 'absolute',
          right: -25,
          top: -40,
        }}
      />
      <DarkDecoEllipses right={-75} top={-90} />
    </View>
  );
};

export default CardService;
