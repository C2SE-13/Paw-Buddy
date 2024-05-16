/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {IPet} from '../../utils/interface';
import {globalStyles} from '../../styles/globalStyles';
import {
  CircleComponent,
  HeaderTitle,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {BackIcon, BrithdayIcon} from '../../assets/icons';
import {colors} from '../../constants/colors';
import {ButtonLocal} from './informationPet/Dates';

interface IProps {
  navigation: NavigationProp<MainStackParamList>;
  route: RouteProp<MainStackParamList, 'PetInformationScreen'>;
}

const PetInformationScreen = ({navigation, route}: IProps) => {
  const {petId} = route.params;
  const {current} = useSelector((state: RootState) => state.user);
  const [data, setData] = useState<IPet | null>(null);

  const getPetProfile = (id: number) => {
    const petData = current?.petData.find(el => el.id === id) ?? null;

    setData(petData);
  };

  useEffect(() => {
    getPetProfile(petId);
  }, [petId]);

  return (
    <View style={[globalStyles.container]}>
      <HeaderTitle
        text="Profile"
        leftButton={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              globalStyles.center,
              {
                width: 38,
                height: 38,
              },
            ]}>
            <BackIcon />
          </TouchableOpacity>
        }
        rightButton={
          <View
            style={{
              width: 38,
              height: 38,
            }}
          />
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, paddingHorizontal: 24}}>
        <SpaceComponent height={24} />
        <RowComponent gap={27}>
          <CircleComponent size={162} color={colors['grey-150']}>
            <Image
              resizeMode="cover"
              style={{
                width: 128,
                height: 128,
                borderRadius: 128,
              }}
              source={
                data
                  ? {uri: data.photo}
                  : require('../../assets/imgs/EmptySpaceIllustrations.png')
              }
            />
          </CircleComponent>
          <View style={{flex: 1, gap: 10}}>
            <TextComponent
              text={data?.name_pet ?? ''}
              size={22}
              title
              color={colors['grey-800']}
            />
            <RowComponent gap={6} justify="flex-start">
              <TextComponent
                text={'Dog'}
                size={14}
                title
                color={colors['grey-600']}
              />
              <TextComponent
                text={'|'}
                size={14}
                title
                color={colors['grey-600']}
              />
              <TextComponent
                text={data?.breed ?? ''}
                size={14}
                title
                color={colors['grey-600']}
              />
            </RowComponent>
          </View>
        </RowComponent>
        <SpaceComponent height={24} />
        <View style={{gap: 8}}>
          <RowComponent
            justify="space-between"
            styles={{
              paddingBottom: 8,
              borderBottomWidth: 1,
              borderColor: colors['grey-150'],
            }}>
            <TextComponent text="Gender" size={14} color={colors['grey-700']} />
            <TextComponent
              text={`${data?.gender ? 'Male' : 'Female'}`}
              title
              size={14}
              color={colors['grey-800']}
            />
          </RowComponent>
          <RowComponent
            justify="space-between"
            styles={{
              paddingBottom: 8,
              borderBottomWidth: 1,
              borderColor: colors['grey-150'],
            }}>
            <TextComponent text="Size" size={14} color={colors['grey-700']} />
            <TextComponent
              text={data?.size ?? ''}
              title
              size={14}
              color={colors['grey-800']}
            />
          </RowComponent>
          <RowComponent
            justify="space-between"
            styles={{
              paddingBottom: 8,
              borderBottomWidth: 1,
              borderColor: colors['grey-150'],
            }}>
            <TextComponent text="Weight" size={14} color={colors['grey-700']} />
            <TextComponent
              text={`${data ? data?.weight.toString() : '0'} kg`}
              title
              size={14}
              color={colors['grey-800']}
            />
          </RowComponent>
        </View>
        <SpaceComponent height={24} />
        <View
          style={{
            gap: 16,
            paddingBottom: 20,
            borderBottomWidth: 1,
            paddingHorizontal: 1,
            paddingVertical: 1,
            borderColor: colors['grey-150'],
          }}>
          <TextComponent
            text="Important Dates"
            size={16}
            title
            color={colors['grey-800']}
          />
          <ButtonLocal
            onPress={() => {}}
            icon={<BrithdayIcon />}
            name="Birthday"
            value={data?.date_of_birth.toString() ?? ''}
          />
          <ButtonLocal
            onPress={() => {}}
            icon={<BrithdayIcon />}
            name="Adoption Day"
            value={data?.adoption.toString() ?? ''}
          />
        </View>
        <SpaceComponent height={24} />
        <View
          style={{
            gap: 16,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderColor: colors['grey-150'],
          }}>
          <TextComponent
            text="Caretakers"
            size={16}
            title
            color={colors['grey-800']}
          />
          <RowComponent gap={12}>
            <Image
              resizeMode="cover"
              style={{
                width: 54,
                height: 54,
                borderRadius: 128,
              }}
              source={
                current?.avatar
                  ? {uri: current?.avatar}
                  : require('../../assets/imgs/Default.png')
              }
            />
            <View style={{flex: 2}}>
              <TextComponent
                text={current?.fullName ?? ''}
                title
                size={14}
                color={colors['grey-800']}
              />
              <TextComponent
                text={current?.email ?? ''}
                size={14}
                color={colors['grey-700']}
              />
            </View>
          </RowComponent>
        </View>
        <SpaceComponent height={12} />
      </ScrollView>
    </View>
  );
};

export default PetInformationScreen;
