/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import Category from './Category';
import {PetSerciveComponent, RowComponent} from '../../../components';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '../../../navigators/MainNavigator';
import withBaseComponent from '../../../hocs/withBaseComponent';
import {RootState} from '../../../redux/store';
import {getRandomElements} from '../../../utils/utils';
import {IServieCategories} from '../../../utils/interface';

const PetService = ({useSelector}: {useSelector: any}) => {
  const {serviceCategories} = useSelector((state: RootState) => state.app);
  const navigation: NavigationProp<MainStackParamList, 'PetServicesScreen'> =
    useNavigation();

  return (
    <View style={{gap: 16}}>
      <Category
        text="Services"
        onPress={() => navigation.navigate('PetServicesScreen')}
      />
      <RowComponent alignItems="flex-start" gap={16} justify="space-between">
        {getRandomElements(serviceCategories, 4).map(
          (item: IServieCategories, index: number) => (
            <PetSerciveComponent
              key={index}
              item={item}
              onPress={() =>
                navigation.navigate('DetailServiceScreen', {id: item.id})
              }
              size="small"
            />
          ),
        )}
      </RowComponent>
    </View>
  );
};

export default withBaseComponent(PetService);
