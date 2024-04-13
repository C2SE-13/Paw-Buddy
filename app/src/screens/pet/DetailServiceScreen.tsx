import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {RouteProp} from '@react-navigation/native';

interface Props {
  navigation: NativeStackScreenProps<MainStackParamList, 'DetailServiceScreen'>;
  route: RouteProp<MainStackParamList, 'DetailServiceScreen'>;
}

const DetailServiceScreen = ({route, navigation}: Props) => {
  const {id} = route.params;

  useEffect(() => {
    const getItemDetail = async (id: number) => {
      // const reponse = await
    };

    getItemDetail(id);
  }, [id]);

  return (
    <View>
      <Text>DetailServiceScreen</Text>
    </View>
  );
};

export default DetailServiceScreen;
