import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CalendarScreen} from '../screens';

export type CalendarStackParamList = {
  CalendarScreen: undefined;
};

const CalendarNavigator = () => {
  const Stack = createNativeStackNavigator<CalendarStackParamList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
    </Stack.Navigator>
  );
};

export default CalendarNavigator;
