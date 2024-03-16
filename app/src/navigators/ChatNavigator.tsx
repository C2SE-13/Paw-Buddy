import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ChatScreen} from '../screens';

const ChatNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
