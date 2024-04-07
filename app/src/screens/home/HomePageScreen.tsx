/* eslint-disable react-native/no-inline-styles */
import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {HeaderPet} from '../../components';
import Banner from './components/Banner';
import PetService from './components/PetService';
import Recommendation from './components/Recommendation';
import withBaseComponent from '../../hocs/withBaseComponent';

interface Props {}

const HomePageScreen = ({}: Props) => {
  return (
    <View style={[globalStyles.container]}>
      <HeaderPet />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, paddingHorizontal: 16}}
        contentContainerStyle={{gap: 24}}>
        <Banner />
        <PetService />
        <Recommendation />
      </ScrollView>
    </View>
  );
};

export default withBaseComponent(HomePageScreen);
