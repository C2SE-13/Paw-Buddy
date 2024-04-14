import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import {AddPetProfileScreen, PetServicesScreen} from '../screens';
import DetailServiceScreen from '../screens/pet/DetailServiceScreen';

export type MainStackParamList = {
  PetServicesScreen: undefined;
  AddPetProfileScreen: undefined;
  Main: undefined;
  DetailServiceScreen: {id: number; name: string};
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
    </Stack.Navigator>
  );
};

export default MainNavigator;
