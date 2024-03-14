/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {RowComponent, SpaceComponent, TextComponent} from '..';
import {globalStyles} from '../../styles/globalStyles';
import {LogoFacebookIcon, LogoGoogleIcon} from '../../assets/icons';
import {colors} from '../../constants/colors';

const LoginWithComponent = () => {
  return (
    <View style={globalStyles['w-100']}>
      <View
        style={[
          globalStyles['w-100'],
          {position: 'relative', alignItems: 'center'},
        ]}>
        <View
          style={[
            globalStyles['w-100'],
            {
              height: 1,
              backgroundColor: colors['text-40'],
              position: 'absolute',
              bottom: '50%',
            },
          ]}
        />
        <TextComponent
          text="Or sign in with"
          styles={{
            zIndex: 1,
            backgroundColor: colors['background-white'],
            paddingHorizontal: 4,
          }}
        />
      </View>
      <SpaceComponent height={32} />
      <RowComponent gap={32}>
        <TouchableOpacity
          style={[globalStyles.center, globalStyles.logoIconAuth]}>
          <LogoGoogleIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.center, globalStyles.logoIconAuth]}>
          <LogoFacebookIcon />
        </TouchableOpacity>
      </RowComponent>
    </View>
  );
};

export default LoginWithComponent;
