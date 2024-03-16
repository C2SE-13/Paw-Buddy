/* eslint-disable react-native/no-inline-styles */
import {ImageBackground, Image, ActivityIndicator} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';
import {SpaceComponent} from '../components';
import {colors} from '../constants/colors';

const SplashScreen = () => {
  return (
    <ImageBackground
      style={[globalStyles.center, {flex: 1, justifyContent: 'flex-start'}]}
      imageStyle={{flex: 1}}
      source={require('../assets/imgs/SplashScreen.png')}>
      <SpaceComponent height={62} />
      <Image
        source={require('../assets/imgs/Logo.png')}
        style={[
          {
            width: 161,
            height: 126,
          },
        ]}
      />
      <SpaceComponent height={24} />
      <ActivityIndicator color={colors['primary-100']} size={50} />
    </ImageBackground>
  );
};

export default SplashScreen;
