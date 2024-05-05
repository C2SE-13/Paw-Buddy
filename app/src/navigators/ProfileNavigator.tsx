import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AccountScreen, EditProfileScreen, ProfileScreen} from '../screens';
import {KeyboardType} from 'react-native';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  AccountScreen: undefined;
  EditProfileScreen: {
    key: string;
    value: any;
    placeholder: string;
    type: KeyboardType;
  };
};

const ProfileNavigator = () => {
  const Stack = createNativeStackNavigator<ProfileStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
