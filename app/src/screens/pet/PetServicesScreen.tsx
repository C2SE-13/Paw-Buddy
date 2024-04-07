/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {HeaderTitle} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {ChevronBack} from '../../assets/icons';

interface Props {
  navigation: NativeStackNavigationProp<
    MainStackParamList,
    'PetServicesScreen'
  >;
}

const PetServicesScreen = ({navigation}: Props) => {
  return (
    <View style={[globalStyles.container]}>
      <HeaderTitle
        text="Pet Services"
        color={colors['text-100']}
        size={18}
        font={fontFamilies['inter-semibold']}
        leftButton={
          <TouchableOpacity
            style={[
              globalStyles.center,
              {
                width: 40,
                height: 40,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors['text-30'],
              },
            ]}
            onPress={() => navigation.goBack()}>
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

export default PetServicesScreen;
