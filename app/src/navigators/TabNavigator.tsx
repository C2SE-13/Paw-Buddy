import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomePageScreen} from '../screens';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="HomePage" component={HomePageScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
