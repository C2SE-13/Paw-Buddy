import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SginInScreen} from '../screens';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SginIn" component={SginInScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
