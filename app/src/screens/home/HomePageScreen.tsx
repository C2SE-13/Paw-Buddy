/* eslint-disable react-native/no-inline-styles */
import {ScrollView, View} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {HeaderPet} from '../../components';
import Banner from './components/Banner';
import PetService from './components/PetService';
import Recommendation from './components/Recommendation';
import withBaseComponent from '../../hocs/withBaseComponent';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {RouteProp} from '@react-navigation/native';

interface Props {
  navigation: NativeStackNavigationProp<MainStackParamList, any>;
  route: RouteProp<any>;
}

const HomePageScreen = ({navigation}: Props) => {
  return (
    <View style={[globalStyles.container]}>
      <HeaderPet />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, paddingHorizontal: 16}}
        contentContainerStyle={{gap: 24}}>
        <Banner />
        <PetService />
        <Recommendation navigation={navigation} />
      </ScrollView>
    </View>
  );
};

export default withBaseComponent(HomePageScreen);
