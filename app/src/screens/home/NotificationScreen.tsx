/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {HeaderTitle} from '../../components';
import {ChevronBack} from '../../assets/icons';
import {NavigationProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {colors} from '../../constants/colors';

interface IProps {
  navigation: NavigationProp<MainStackParamList>;
}

const NotificationScreen = ({navigation}: IProps) => {
  return (
    <View style={[globalStyles.container]}>
      <HeaderTitle
        text="Notification"
        leftButton={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              globalStyles.center,
              {
                width: 40,
                height: 40,
                borderWidth: 1,
                borderColor: colors['grey-200'],
                borderRadius: 10,
              },
            ]}>
            <ChevronBack />
          </TouchableOpacity>
        }
        rightButton={
          <View
            style={{
              width: 40,
              height: 40,
            }}
          />
        }
      />
    </View>
  );
};

export default NotificationScreen;
