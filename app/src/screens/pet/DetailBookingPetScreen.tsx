/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {CalendarStackParamList} from '../../navigators/CalendarNavigator';
import {globalStyles} from '../../styles/globalStyles';
import {
  ButtonComponent,
  CircleComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {apiGetDetailBooking} from '../../apis';
import {colors} from '../../constants/colors';
import {ChatFocusedIcon} from '../../assets/icons';

interface Props {
  route: RouteProp<MainStackParamList, 'DetailBookingPetScreen'>;
  navigation: NavigationProp<CalendarStackParamList, 'CalendarScreen'>;
}

interface BookingOfPet {
  id: number;
  start_time: string;
  end_time: string;
  note: string;
  date: string;
  status: string;
  dataPet: {
    id: number;
    name_pet: string;
    photo: string;
    breed: string;
    gender: boolean;
    size: string;
    weight: number;
  };
  dataUser: {
    id: number;
    fullName: string;
    email: string;
    avatar: string;
  };
  dataVet: {
    id: number;
    fullName: string;
    phone: string;
    avatar: string;
  };
  services: {
    id: number;
    name_service: string;
    description: string;
    price: string;
    dataCategory: {
      image: string;
      type_service: string;
    };
  }[];
}

const DetailBookingPetScreen = ({route, navigation}: Props) => {
  const {bookingId} = route.params;
  const [data, setData] = useState<BookingOfPet | null>(null);

  useEffect(() => {
    const getDetailBooking = async (id: number) => {
      const response: any = await apiGetDetailBooking(id);
      if (response.success) {
        setData(response.result);
      }
    };

    bookingId && getDetailBooking(bookingId);
  }, [bookingId]);

  return (
    <View style={[globalStyles.container]}>
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
                  ? {uri: data.dataPet.photo}
                  : require('../../assets/imgs/EmptySpaceIllustrations.png')
              }
            />
          </CircleComponent>
          <View style={{flex: 1, gap: 10}}>
            <TextComponent
              text={data?.dataPet.name_pet ?? ''}
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
                text={data?.dataPet.breed ?? ''}
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
              text="Gender"
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
              text={data?.dataPet.size ?? ''}
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
              text={`${data ? data?.dataPet.weight.toString() : '0'} kg`}
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
                data?.dataUser.avatar
                  ? {uri: data?.dataUser.avatar}
                  : require('../../assets/imgs/Default.png')
              }
            />
            <View style={{flex: 2}}>
              <TextComponent
                text={data?.dataUser.fullName ?? ''}
                title
                size={14}
                color={colors['grey-800']}
              />
              <TextComponent
                text={data?.dataUser.email ?? ''}
                size={14}
                color={colors['grey-700']}
              />
            </View>
          </RowComponent>
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
            text="Veterinarian"
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
                data?.dataVet.avatar
                  ? {uri: data?.dataVet.avatar}
                  : require('../../assets/imgs/Default.png')
              }
            />
            <View style={{flex: 2}}>
              <TextComponent
                text={data?.dataVet.fullName ?? ''}
                title
                size={14}
                color={colors['grey-800']}
              />
              <TextComponent
                text={`Phone: ${data?.dataVet.phone}`}
                size={14}
                color={colors['grey-700']}
              />
            </View>
            <TouchableOpacity>
              <ChatFocusedIcon />
            </TouchableOpacity>
          </RowComponent>
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
            text="Location"
            size={16}
            title
            color={colors['grey-800']}
          />
          <View style={{gap: 8}}>
            <RowComponent justify="flex-start" gap={4}>
              <TextComponent
                text="Street:"
                size={14}
                color={colors['grey-700']}
              />
              <TextComponent
                text={`${process.env.ENV_Street}`}
                size={14}
                color={colors['grey-800']}
              />
            </RowComponent>
            <RowComponent justify="flex-start" gap={4}>
              <TextComponent
                text="City:"
                size={14}
                color={colors['grey-700']}
              />
              <TextComponent
                text={`${process.env.ENV_City}`}
                size={14}
                color={colors['grey-800']}
              />
            </RowComponent>
            <RowComponent justify="flex-start" gap={4}>
              <TextComponent
                text="Country:"
                size={14}
                color={colors['grey-700']}
              />
              <TextComponent
                text={`${process.env.ENV_Country}`}
                size={14}
                color={colors['grey-800']}
              />
            </RowComponent>
          </View>
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
            text="Services"
            size={16}
            title
            color={colors['grey-800']}
          />
          <RowComponent gap={4} justify="flex-start">
            <TextComponent
              text="Date:"
              size={12}
              title
              color={colors['grey-800']}
            />
            <TextComponent
              color={colors['grey-600']}
              size={12}
              text={`${data?.date}`}
            />
          </RowComponent>
          <RowComponent gap={12} justify="space-between">
            <RowComponent gap={4}>
              <TextComponent
                text="Start Time:"
                size={12}
                title
                color={colors['grey-800']}
              />
              <TextComponent
                color={colors['grey-600']}
                size={12}
                text={`${data?.start_time.split(':')[0]}:${
                  data?.start_time.split(':')[1]
                } ${Number(data?.start_time.split(':')[0]) > 12 ? 'PM' : 'AM'}`}
              />
            </RowComponent>
            <RowComponent gap={4}>
              <TextComponent
                text="Estimated time:"
                size={12}
                title
                color={colors['grey-800']}
              />
              <TextComponent
                color={colors['grey-600']}
                size={12}
                text={`${data?.end_time.split(':')[0]}:${
                  data?.end_time.split(':')[1]
                } ${Number(data?.end_time.split(':')[0]) > 12 ? 'PM' : 'AM'}`}
              />
            </RowComponent>
          </RowComponent>
          <FlatList
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
            contentContainerStyle={{gap: 8}}
            data={data?.services}
            renderItem={({item}) => (
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 14,
                  borderColor: colors['grey-150'],
                  gap: 8,
                }}>
                <RowComponent justify="space-between">
                  <TextComponent
                    text={item.name_service}
                    size={14}
                    title
                    color={colors['grey-800']}
                  />
                  <RowComponent alignItems="flex-end">
                    <TextComponent
                      text="$"
                      size={12}
                      styles={{marginBottom: 3.5}}
                      color={colors['grey-900']}
                    />
                    <TextComponent
                      title
                      text={item.price.toString() ?? ''}
                      size={20}
                      color={colors['grey-900']}
                    />
                  </RowComponent>
                </RowComponent>
                <TextComponent text={item.description} align="justify" />
              </View>
            )}
          />
        </View>
        <SpaceComponent height={12} />
      </ScrollView>
      <View style={{padding: 24}}>
        <ButtonComponent
          type="primary"
          size="large"
          text="Back"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default DetailBookingPetScreen;
