import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SearchScreen} from '../screens';

const SearchNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default SearchNavigator;
