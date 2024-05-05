/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, FlatList, Alert} from 'react-native';
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
import useCheckProfilePet from '../../hooks/useCheckProfilePet';
import {TypedUseSelectorHook} from 'react-redux';
import {RouteProp} from '@react-navigation/native';

interface Props {
  navigation: NativeStackNavigationProp<
    MainStackParamList,
    'PetServicesScreen'
  >;
  useSelector: TypedUseSelectorHook<RootState>;
  route: RouteProp<MainStackParamList, 'PetServicesScreen'>;
}

const PetServicesScreen = ({navigation, useSelector, route}: Props) => {
  const {serviceCategories} = useSelector((state: RootState) => state.app);
  const {message, checkStatusPet} = useCheckProfilePet();

  const handleNavigate = (id: number, nameService: string, image: string) => {
    const check = checkStatusPet();
    if (check) {
      const option = {
        id: id,
        name: nameService,
        image,
        doctorId: route.params?.doctorId ? route.params.doctorId : 0,
      };

      navigation.navigate('DetailServiceScreen', option);
    } else {
      Alert.alert('Alert Title', message, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Create',
          onPress: () => navigation.navigate('AddPetProfileScreen'),
        },
      ]);
    }
  };

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
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          renderItem={({item}) => (
            <PetSerciveComponent
              item={item}
              size="large"
              onPress={() =>
                handleNavigate(item.id, item.type_service, item.image)
              }
            />
          )}
        />
      </View>
    </View>
  );
};

export default withBaseComponent(PetServicesScreen);
