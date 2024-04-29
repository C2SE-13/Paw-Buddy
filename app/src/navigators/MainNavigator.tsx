import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import {
  AddPetProfileScreen,
  BookDateScreen,
  DetailBookingPetScreen,
  DoctorDetailScreen,
  PetServicesScreen,
} from '../screens';
import DetailServiceScreen from '../screens/pet/DetailServiceScreen';
import {IPetServies} from '../utils/interface';
import HealthCardScreen from '../screens/pet/HealthCardScreen';

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
    </Stack.Navigator>
  );
};

export default MainNavigator;
