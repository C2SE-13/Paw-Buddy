import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import {
  AddPetProfileScreen,
  BookDateScreen,
  DetailBookingPetScreen,
  DoctorDetailScreen,
  PetServicesScreen,
  ChatBotScreen,
  PetInformationScreen,
  DetailServiceScreen,
  HealthCardScreen,
} from '../screens';
import {IPetServies} from '../utils/interface';

export type MainStackParamList = {
  PetServicesScreen: {
    doctorId?: number;
  };
  AddPetProfileScreen: undefined;
  Main: undefined;
  DetailServiceScreen: {
    id: number;
    name: string;
    image: string;
    doctorId?: number;
  };
  BookDateScreen: {
    chosenServices: IPetServies[];
    idService: number;
    nameService: string;
    doctorId?: number;
  };
  DoctorDetailScreen: {
    id: number;
  };
  HealthCardScreen: {
    petId: number;
  };
  DetailBookingPetScreen: {
    bookingId: number;
  };
  PetInformationScreen: {
    petId: number;
  };
  ChatBotScreen: undefined;
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
      <Stack.Screen name="DoctorDetailScreen" component={DoctorDetailScreen} />
      <Stack.Screen name="HealthCardScreen" component={HealthCardScreen} />
      <Stack.Screen
        name="DetailBookingPetScreen"
        component={DetailBookingPetScreen}
      />
      <Stack.Screen
        name="PetInformationScreen"
        component={PetInformationScreen}
      />
      <Stack.Screen name="ChatBotScreen" component={ChatBotScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
