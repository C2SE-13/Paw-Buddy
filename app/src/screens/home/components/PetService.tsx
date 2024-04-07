/* eslint-disable react-native/no-inline-styles */
import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Category from './Category';
import {RowComponent, TextComponent} from '../../../components';
import {globalStyles} from '../../../styles/globalStyles';
import {colors} from '../../../constants/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../navigators/MainNavigator';
import withBaseComponent from '../../../hocs/withBaseComponent';
import {RootState} from '../../../redux/store';
import {getRandomElements} from '../../../utils/utils';
import {IPetServies} from '../../../utils/interface';

const PetService = ({useSelector}: {useSelector: any}) => {
  const {petServices} = useSelector((state: RootState) => state.app);
  const navigation: NavigationProp<MainStackParamList, 'PetServicesScreen'> =
    useNavigation();

  return (
    <View style={{gap: 16}}>
      <Category
        text="Pet Services"
        onPress={() => navigation.navigate('PetServicesScreen')}
      />
      <RowComponent gap={16} justify="space-between">
        {getRandomElements(petServices, 4).map((item: IPetServies) => (
          <TouchableOpacity
            onPress={() => console.log(item)}
            key={item.id}
            style={[globalStyles.center, {gap: 12, width: 74}]}>
            <View
              style={[
                globalStyles.center,
                {
                  width: 56,
                  height: 56,
                  backgroundColor: colors['primary-surface'],
                  borderRadius: 1000,
                },
              ]}>
              <Image
                source={item.photo}
                style={{
                  width: 24,
                  height: 24,
                  objectFit: 'cover',
                }}
              />
            </View>
            <TextComponent
              text={item.name_service}
              color={colors['text-100']}
              align="center"
              numOfLine={2}
            />
          </TouchableOpacity>
        ))}
      </RowComponent>
    </View>
  );
};

export default withBaseComponent(PetService);
