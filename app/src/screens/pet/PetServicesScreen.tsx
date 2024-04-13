/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {HeaderTitle, PetSerciveComponent} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {ChevronBack} from '../../assets/icons';
import {RootState} from '../../redux/store';
import withBaseComponent from '../../hocs/withBaseComponent';

interface Props {
  navigation: NativeStackNavigationProp<
    MainStackParamList,
    'PetServicesScreen'
  >;
  useSelector: any;
}

const PetServicesScreen = ({navigation, useSelector}: Props) => {
  const {serviceCategories} = useSelector((state: RootState) => state.app);

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
      <View
        style={[
          globalStyles.center,
          {paddingHorizontal: 31, paddingVertical: 12, flex: 1},
        ]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={serviceCategories}
          contentContainerStyle={{gap: 36}}
          columnWrapperStyle={{gap: 32}}
          keyExtractor={item => item.id}
          numColumns={3}
          renderItem={({item}) => (
            <PetSerciveComponent
              item={item}
              size="large"
              onPress={() =>
                navigation.navigate('DetailServiceScreen', {id: item.id})
              }
            />
          )}
        />
      </View>
    </View>
  );
};

export default withBaseComponent(PetServicesScreen);
