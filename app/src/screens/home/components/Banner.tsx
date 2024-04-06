/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../../styles/globalStyles';
import {colors} from '../../../constants/colors';
import {ButtonComponent, TextComponent} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';

const Banner = () => {
  return (
    <View
      style={{position: 'relative', height: 197, justifyContent: 'flex-end'}}>
      <View
        style={[
          globalStyles['w-100'],
          {
            height: 167,
            backgroundColor: colors['primary-100'],
            borderRadius: 24,
            paddingVertical: 15,
            paddingHorizontal: 18,
          },
        ]}>
        <View style={{width: 143, gap: 25}}>
          <TextComponent
            text="Book and schedule with nearest doctor"
            title
            font={fontFamilies['inter-medium']}
            color={colors['background-white']}
          />
          <ButtonComponent
            styles={{width: 109}}
            text="Find Nearby"
            type="primary"
            size="small"
            onPress={() => {}}
            color={colors['background-white']}
            textColor={colors['primary-100']}
            textStyle={{fontSize: 12}}
            textFont={fontFamilies['inter-regular']}
          />
        </View>
      </View>
      <Image
        source={require('../../../assets/imgs/doctor.png')}
        style={{
          width: 139,
          height: 197,
          objectFit: 'cover',
          position: 'absolute',
          bottom: 0,
          right: 15,
        }}
      />
    </View>
  );
};

export default Banner;
