/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {ReactNode} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomePageScreen} from '../screens';
import {Image, Platform} from 'react-native';
import {colors} from '../constants/colors';
import {CircleComponent, TextComponent} from '../components';
import {
  CalendarFocusedIcon,
  CalendarIcon,
  ChatFocusedIcon,
  ChatIcon,
  HomeFocusedIcon,
  HomeIcon,
  SearchIcon,
} from '../assets/icons';
import CalendarNavigator from './CalendarNavigator';
import SearchNavigator from './SearchNavigator';
import ChatNavigator from './ChatNavigator';
import ProfileNavigator from './ProfileNavigator';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 80 : 70,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors['background-white'],
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarLabelPosition: 'below-icon',
        tabBarLabel({focused}) {
          return route.name === 'Search' ? null : (
            <TextComponent
              text={route.name}
              flex={0}
              size={12}
              color={focused ? colors['primary-100'] : colors['text-100']}
              styles={{
                marginBottom: Platform.OS === 'android' ? 12 : 0,
              }}
            />
          );
        },
        tabBarIcon: ({focused}) => {
          let icon: ReactNode;
          switch (route.name) {
            case 'Home':
              icon = focused ? <HomeFocusedIcon /> : <HomeIcon />;
              break;
            case 'Chat':
              icon = focused ? <ChatFocusedIcon /> : <ChatIcon />;
              break;
            case 'Calendar':
              icon = focused ? <CalendarFocusedIcon /> : <CalendarIcon />;
              break;
            case 'Profile':
              icon = (
                <CircleComponent
                  size={24}
                  radius={50}
                  color={focused ? colors['primary-100'] : 'transparent'}>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      objectFit: 'cover',
                    }}
                    source={require('../assets/imgs/Default.png')}
                  />
                </CircleComponent>
              );
              break;
            case 'Search':
              icon = (
                <CircleComponent
                  size={72}
                  radius={28}
                  styles={[{marginTop: Platform.OS === 'ios' ? -50 : -60}]}>
                  <SearchIcon />
                </CircleComponent>
              );
              break;
          }
          return icon;
        },
      })}>
      <Tab.Screen name="Home" component={HomePageScreen} />
      <Tab.Screen name="Chat" component={ChatNavigator} />
      <Tab.Screen name="Search" component={SearchNavigator} />
      <Tab.Screen name="Calendar" component={CalendarNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
