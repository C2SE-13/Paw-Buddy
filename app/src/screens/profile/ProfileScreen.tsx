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
import {colors} from '../../constants/colors';

interface IPageProps {
  navigation: any;
}

const EmptySpace = ({navigation}: IPageProps) => {
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
        color={colors['grey-800']}
      />
      <SpaceComponent height={10} />
      <TextComponent
        color={colors['grey-600']}
        size={16}
        title
        styles={{textAlign: 'center'}}
        text="Looks like you have no profiles set up at this moment, add your pet now"
        font={fontFamilies['inter-medium']}
      />
      <SpaceComponent height={32} />
      <ButtonComponent
        size="large"
        onPress={() => navigation.navigate('AddPetProfileScreen')}
        text="Continue"
        type="primary"
      />
    </View>
  );
};

const ProfileScreen = ({navigation}: IPageProps) => {
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
              backgroundColor: colors['grey-200'],
              width: 1,
            }}
          />
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MenuIcon />
          </TouchableOpacity>
        </RowComponent>
      </HeaderProfile>
      <EmptySpace navigation={navigation} />
    </View>
  );
};

export default ProfileScreen;
