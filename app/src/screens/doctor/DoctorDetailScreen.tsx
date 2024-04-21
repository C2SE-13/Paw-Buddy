import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {RouteProp} from '@react-navigation/native';

interface Props {
  navigation: NativeStackNavigationProp<
    MainStackParamList,
    'DoctorDetailScreen'
  >;
  route: RouteProp<MainStackParamList, 'DoctorDetailScreen'>;
}

const DoctorDetailScreen = ({navigation, route}: Props) => {
  const {id} = route.params;

  useEffect(() => {
    const getDetailDoctor = async (id: number) => {
      // const response = await apiget;
    };
  }, [id]);

  return (
    <View>
      <Text>DoctorDetailScreen</Text>
    </View>
  );
};

export default DoctorDetailScreen;
