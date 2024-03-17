/* eslint-disable react-native/no-inline-styles */
import {View, StatusBar, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  ButtonComponent,
  HeaderProfile,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {MenuIcon, SearchProfileIcon} from '../../assets/icons';
import {fontFamilies} from '../../constants/fontFamilies';

const EmptySpace = () => {
  return (
    <View
      style={[
        globalStyles.center,
        {
          flex: 1,
        },
      ]}>
      <Image
        source={require('../../assets/imgs/EmptySpaceIllustrations.png')}
        style={{
          height: 220,
          width: '100%',
          objectFit: 'cover',
        }}
      />
      <SpaceComponent height={32} />
      <TextComponent
        title
        text="UH Oh!"
        font={fontFamilies['inter-bold']}
        size={26}
        color="#39434F"
      />
      <SpaceComponent height={10} />
      <TextComponent
        color="#808B9A"
        size={16}
        title
        styles={{textAlign: 'center'}}
        text="Looks like you have no profiles set up at this moment, add your pet now"
        font={fontFamilies['inter-medium']}
      />
      <SpaceComponent height={32} />
      <ButtonComponent
        size="large"
        onPress={() => console.log('first')}
        text="Continue"
        type="primary"
      />
    </View>
  );
};

const ProfileScreen = ({navigation}: any) => {
  return (
    <View
      style={[
        globalStyles.container,
        {backgroundColor: 'white', paddingHorizontal: 24},
      ]}>
      <StatusBar barStyle={'light-content'} />
      <HeaderProfile>
        <RowComponent gap={12}>
          <TouchableOpacity>
            <SearchProfileIcon />
          </TouchableOpacity>
          <View
            style={{
              height: 19,
              backgroundColor: '#D9DFE6',
              width: 1,
            }}
          />
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MenuIcon />
          </TouchableOpacity>
        </RowComponent>
      </HeaderProfile>
      <EmptySpace />
    </View>
  );
};

export default ProfileScreen;
