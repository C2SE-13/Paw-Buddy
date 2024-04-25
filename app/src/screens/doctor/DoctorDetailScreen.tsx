/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import {Alert, Image, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {RouteProp} from '@react-navigation/native';
import {apiGetDetailDoctors} from '../../apis';
import {
  ButtonComponent,
  HeaderTitle,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {IDoctors} from '../../utils/interface';
import {ChatFocusedIcon, ChevronBack} from '../../assets/icons';
import {globalStyles} from '../../styles/globalStyles';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import useUpdateStatusLoading from '../../hooks/useUpdateStatusLoading';
import useCheckProfilePet from '../../hooks/useCheckProfilePet';

interface Props {
  navigation: NativeStackNavigationProp<
    MainStackParamList,
    'DoctorDetailScreen'
  >;
  route: RouteProp<MainStackParamList, 'DoctorDetailScreen'>;
}

const DoctorDetailScreen = ({navigation, route}: Props) => {
  const {id} = route.params;
  const [dataUser, setDataUser] = useState<IDoctors | null>(null);
  const {updateStatusLoading} = useUpdateStatusLoading();
  const {message, checkStatusPet} = useCheckProfilePet();

  useEffect(() => {
    const getDetailDoctor = async (id: number) => {
      updateStatusLoading(true);
      const response: any = await apiGetDetailDoctors(id);
      updateStatusLoading(false);
      if (response.success) {
        setDataUser(response.userData);
      }
    };

    getDetailDoctor(id);
  }, [id]);

  const handleNavigate = (doctorId: number) => {
    const check = checkStatusPet();
    if (check) {
      navigation.navigate('PetServicesScreen', {
        doctorId,
      });
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
        text={dataUser?.fullName ?? ''}
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
      <ScrollView style={{flex: 1, paddingHorizontal: 24}}>
        <SpaceComponent height={32} />
        <RowComponent gap={12}>
          <Image
            source={
              dataUser
                ? {uri: dataUser?.avatar}
                : require('../../assets/imgs/Default.png')
            }
            style={{
              width: 74,
              height: 74,
              borderRadius: 12,
            }}
          />
          <View style={{flex: 1, gap: 8}}>
            <TextComponent
              text={dataUser?.fullName ?? ''}
              color={colors['text-100']}
              font={fontFamilies['inter-bold']}
              size={16}
            />
            <RowComponent gap={8} justify="flex-start">
              <TextComponent
                text={dataUser?.roleData?.name_role ?? ''}
                color={colors['text-80']}
                font={fontFamilies['inter-medium']}
                size={12}
              />
              <TextComponent
                text="|"
                color={colors['text-80']}
                font={fontFamilies['inter-medium']}
                size={12}
              />
              <TextComponent
                text={dataUser?.phone ?? ''}
                color={colors['text-80']}
                font={fontFamilies['inter-medium']}
                size={12}
              />
            </RowComponent>
            <TextComponent
              text={`Address: ${dataUser?.address}`}
              color={colors['text-80']}
              font={fontFamilies['inter-medium']}
              size={12}
            />
          </View>
          <TouchableOpacity>
            <ChatFocusedIcon />
          </TouchableOpacity>
        </RowComponent>
        <SpaceComponent height={32} />
        <View style={{gap: 24}}>
          <View style={{gap: 12}}>
            <TextComponent
              title
              text="About me"
              size={16}
              color={colors['text-100']}
            />
            <TextComponent
              color={colors['text-body']}
              size={14}
              align="justify"
              text={`${dataUser?.fullName} is the top most Immunologists specialist in Christ Hospital at London. She achived several awards for her wonderful contribution in medical field. She is available for private consultation.`}
            />
          </View>
          <View style={{gap: 12}}>
            <TextComponent
              title
              text="Working Time"
              size={16}
              color={colors['text-100']}
            />
            <TextComponent
              color={colors['text-body']}
              size={14}
              align="justify"
              text="Monday - Friday, 08.00 AM - 20.00 PM"
            />
          </View>
          <View style={{gap: 12}}>
            <TextComponent
              title
              text="Phone"
              size={16}
              color={colors['text-100']}
            />
            <TextComponent
              color={colors['text-body']}
              size={14}
              align="justify"
              text={dataUser?.phone ?? ''}
            />
          </View>
          <View style={{gap: 12}}>
            <TextComponent
              title
              text="Address"
              size={16}
              color={colors['text-100']}
            />
            <TextComponent
              color={colors['text-body']}
              size={14}
              align="justify"
              text={dataUser?.address ?? ''}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{paddingVertical: 16, paddingHorizontal: 24}}>
        <ButtonComponent
          text={'Make An Appointment'}
          type="primary"
          size="large"
          onPress={() => handleNavigate(id)}
        />
      </View>
    </View>
  );
};

export default DoctorDetailScreen;
