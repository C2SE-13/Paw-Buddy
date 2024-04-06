/* eslint-disable react-native/no-inline-styles */
import {ScrollView, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {HeaderPet} from '../../components';
import Banner from './components/Banner';
import Speciality from './components/Speciality';
import Recommendation from './components/Recommendation';

const HomePageScreen = () => {
  return (
    <View style={[globalStyles.container]}>
      <HeaderPet />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, paddingHorizontal: 16}}
        contentContainerStyle={{gap: 24}}>
        <Banner />
        <Speciality />
        <Recommendation />
      </ScrollView>
    </View>
  );
};

export default HomePageScreen;
