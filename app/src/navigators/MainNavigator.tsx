import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import {AddPetProfileScreen, PetServicesScreen} from '../screens';

export type MainStackParamList = {
  PetServicesScreen: undefined;
  AddPetProfileScreen: undefined;
  Main: undefined;
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
    </Stack.Navigator>
  );
};

export default MainNavigator;
