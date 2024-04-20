import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import {
  AddPetProfileScreen,
  BookDateScreen,
  PetServicesScreen,
} from '../screens';
import DetailServiceScreen from '../screens/pet/DetailServiceScreen';
import {IPetServies} from '../utils/interface';

export type MainStackParamList = {
  PetServicesScreen: undefined;
  AddPetProfileScreen: undefined;
  Main: undefined;
  DetailServiceScreen: {id: number; name: string; image: string};
  BookDateScreen: {
    chosenServices: IPetServies[];
    idService: number;
    nameService: string;
  };
};

const MainNavigator = () => {
  const Stack = createNativeStackNavigator<MainStackParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={DrawerNavigator} />
      <Stack.Screen
        name="AddPetProfileScreen"
        component={AddPetProfileScreen}
      />
      <Stack.Screen name="PetServicesScreen" component={PetServicesScreen} />
      <Stack.Screen
        name="DetailServiceScreen"
        component={DetailServiceScreen}
      />
      <Stack.Screen name="BookDateScreen" component={BookDateScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
