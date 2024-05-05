/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  Fragment,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ButtonComponent,
  HeaderBookDate,
  InputComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import CardService from './components/CardService';
import {RouteProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigators/MainNavigator';
import DateService from './components/DateService';
import {
  apiCreateBooking,
  apiGetDetailDoctors,
  apiGetDoctors,
  apiGetPetService,
} from '../../apis';
import CardServiceComponent from './components/CardServiceComponent';
import {IDoctors, IPetServies} from '../../utils/interface';
import {colors} from '../../constants/colors';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {fontFamilies} from '../../constants/fontFamilies';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import useUpdateStatusLoading from '../../hooks/useUpdateStatusLoading';

interface Props {
  navigation: any;
  route: RouteProp<MainStackParamList, 'BookDateScreen'>;
}

export interface Booking {
  service_ids: string;
  pet_id: number;
  date: string;
  start_time: string;
  vet_id: number;
  end_time: string;
  note: string;
}

export interface TimeBooking {
  time: string;
  buoi: string;
}

const BookDateScreen = ({route, navigation}: Props) => {
  const {chosenServices, idService, nameService, doctorId} = route.params;
  const [dataService, setDataService] = useState<IPetServies[]>([]);
  const [chosen, setChosen] = useState<IPetServies[]>([]);
  const [note, setNote] = useState('');
  const [bookDate, setBookDate] = useState<SetStateAction<string>>(
    moment().format(),
  );
  const [dataDocotr, setDataDocotr] = useState<IDoctors | null>(null);
  const [bookingOfDoctor, setBookingOfDoctor] = useState<
    {service_id: number; start_time: string; date: string}[]
  >([]);
  const [totalTimeOfService, setTotalTimeOfService] = useState(0);
  const [startTime, setStartTime] = useState<TimeBooking>({
    time: '',
    buoi: '',
  });
  const {petActive} = useSelector((state: RootState) => state.user);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [endTime, setEndTime] = useState<TimeBooking>({
    time: '',
    buoi: '',
  });
  const {updateStatusLoading} = useUpdateStatusLoading();

  useEffect(() => {
    chosenServices.length > 0 && setChosen(chosenServices);
  }, [chosenServices]);

  useEffect(() => {
    const getItemDetail = async (id: number) => {
      updateStatusLoading(true);
      const response: any = await apiGetPetService({category_id: id});
      updateStatusLoading(false);
      if (response.success) {
        setDataService(response.data);
      }
    };

    getItemDetail(idService);
  }, [idService]);

  useEffect(() => {
    const getInformationDoctor = async (id: number) => {
      updateStatusLoading(true);
      const response: any = await apiGetDetailDoctors(id);
      updateStatusLoading(false);
      if (response.success) {
        setDataDocotr(response.userData);
        setBookingOfDoctor(response.bookingData);
      }
    };
    doctorId !== 0 && getInformationDoctor(Number(doctorId));
  }, [doctorId]);

  useEffect(() => {
    setTotalTimeOfService(
      chosen.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.estimated_duration,
        0,
      ),
    );
  }, [chosen]);

  useEffect(() => {
    const check = bookingOfDoctor.length > 0;

    if (check) {
      const object =
        bookingOfDoctor
          .filter(item => item.service_id === idService) // sai
          .filter(item => {
            const checkYear =
              moment(bookDate.toString()).format('YYYY') ===
              moment(item.date).format('YYYY');
            const checkMonth =
              moment(bookDate.toString()).format('MMMM') ===
              moment(item.date).format('MMMM');
            const checkDay =
              moment(bookDate.toString()).format('DD') ===
              moment(item.date).format('DD');
            if (checkYear && checkMonth && checkDay) {
              return item;
            }
          })
          .map(item => item.start_time) || [];

      // -----------------chua xong
    }
  }, [bookDate, bookingOfDoctor, idService]);

  const handlechosenServices = (item: IPetServies) => {
    const check = chosen.some(i => i.id === item.id);
    if (check) {
      const newArr = chosen.filter(i => i.id !== item.id);
      setChosen(newArr);
    } else {
      setChosen(prev => [...prev, item]);
    }
  };

  const handleConfirm = async () => {
    const data: Booking = {
      service_ids: chosen.map(item => item.id).join(','),
      pet_id: petActive?.id ?? 0,
      date: bookDate.toString(),
      start_time: startTime.time,
      vet_id: dataDocotr?.id ?? 0,
      end_time: endTime.time,
      note: note,
    };

    return Alert.alert('Ask', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          updateStatusLoading(true);
          const response: any = await apiCreateBooking(data);
          updateStatusLoading(false);
          if (response.success) {
            Toast.show(
              toastConfig({textMain: response.message, visibilityTime: 2000}),
            );
            navigation.navigate('Home');
          } else {
            Toast.show(
              toastConfig({
                textMain: response.message,
                visibilityTime: 2000,
                type: 'error',
              }),
            );
          }
        },
      },
    ]);
  };

  return (
    <View style={[globalStyles.container]}>
      <HeaderBookDate title="Book a date" />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <SpaceComponent height={24} />
        <View style={{paddingHorizontal: 24}}>
          <CardService nameService={nameService} image={chosen[0]?.photo} />
        </View>
        <SpaceComponent height={20} />
        <View style={{paddingHorizontal: 24}}>
          <View
            style={{
              gap: 16,
              borderBottomWidth: 1,
              paddingBottom: 20,
              borderColor: colors['grey-150'],
            }}>
            <TextComponent
              text="Information Doctor"
              title
              size={16}
              color={colors['grey-800']}
            />
            {dataDocotr ? (
              <RowComponent gap={12}>
                <Image
                  resizeMode="center"
                  style={{
                    borderRadius: 10,
                    width: 90,
                    height: 90,
                  }}
                  source={
                    dataDocotr
                      ? {uri: dataDocotr.avatar}
                      : require('../../assets/imgs/doctor.png')
                  }
                />
                <View style={{flex: 1, gap: 4}}>
                  <TextComponent
                    text={dataDocotr?.fullName ?? ''}
                    title
                    size={16}
                    color={colors['grey-900']}
                  />
                  <TextComponent
                    text={`Phone: ${dataDocotr?.phone}`}
                    title
                    size={14}
                    color={colors['grey-500']}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => actionSheetRef.current?.show()}
                  style={{
                    borderWidth: 1,
                    padding: 6,
                    borderRadius: 10,
                    borderColor: colors['blue-500'],
                  }}>
                  <TextComponent
                    text="Change"
                    size={12}
                    color={colors['blue-500']}
                  />
                </TouchableOpacity>
              </RowComponent>
            ) : (
              <ButtonComponent
                text="Select doctor"
                size="large"
                type="secondary"
                onPress={() => actionSheetRef.current?.show()}
                textColor={colors['grey-500']}
              />
            )}
          </View>
        </View>
        {dataDocotr && (
          <Fragment>
            <SpaceComponent height={20} />
            <DateService
              date={bookDate}
              setBookDate={setBookDate}
              totalTimeOfService={totalTimeOfService}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
            />
          </Fragment>
        )}
        <SpaceComponent height={20} />
        <View style={{paddingHorizontal: 24}}>
          <View
            style={{
              gap: 16,
              borderBottomWidth: 1,
              paddingBottom: 20,
              borderColor: colors['grey-150'],
            }}>
            <TextComponent
              text="Services"
              title
              size={16}
              color={colors['grey-800']}
            />
            <View style={{gap: 16}}>
              {dataService.map((item: IPetServies) => (
                <CardServiceComponent
                  key={item.id}
                  item={item}
                  chosenServices={chosen}
                  onPress={handlechosenServices}
                />
              ))}
            </View>
            <TextComponent
              text="Prices are estimative and the payment will be made at the location."
              size={14}
              color="#808B9A"
            />
          </View>
        </View>
        <SpaceComponent height={20} />
        <View style={{paddingHorizontal: 24, gap: 5}}>
          <TextComponent
            text="Add Note"
            color="#808B9A"
            size={14}
            styles={{paddingLeft: 8}}
          />
          <InputComponent
            value={note}
            onChange={setNote}
            placeholder="Suggested"
            numberOfLine={5}
            multiline
            allowClear
          />
        </View>
        <SpaceComponent height={24} />
      </ScrollView>
      <View style={{padding: 24}}>
        <ButtonComponent
          text="Confirm booking"
          type={
            bookDate &&
            dataDocotr &&
            chosen.length > 0 &&
            startTime.time.length > 0 &&
            endTime.time.length > 0
              ? 'primary'
              : 'disabled'
          }
          size="large"
          onPress={handleConfirm}
        />
      </View>
      <ActionSheet ref={actionSheetRef}>
        <ViewSelectDoctor
          actionSheetRef={actionSheetRef}
          dataDocotr={dataDocotr}
          setDataDocotr={setDataDocotr}
        />
      </ActionSheet>
    </View>
  );
};

const ViewSelectDoctor = ({
  dataDocotr,
  setDataDocotr,
  actionSheetRef,
}: {
  dataDocotr: IDoctors | null;
  setDataDocotr: (item: IDoctors) => void;
  actionSheetRef: RefObject<ActionSheetRef>;
}) => {
  const [dataDoctor, setDataDoctor] = useState<IDoctors[]>([]);
  const {token} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const getDoctors = async () => {
      const response: any = await apiGetDoctors({
        limit: 10,
        page: 0,
        roleId: 2,
      });
      if (response.success) {
        setDataDoctor(response.data);
      }
    };

    token && getDoctors();
  }, [token]);

  const handleSelect = (item: IDoctors) => {
    if (item.id !== dataDocotr?.id) {
      Alert.alert('Ask', 'Do you want to select this doctor?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setDataDocotr(item);
            actionSheetRef.current?.hide();
          },
        },
      ]);
    }
  };

  return (
    <View
      style={[
        globalStyles['w-100'],
        {
          backgroundColor: colors['background-white'],
          padding: 24,
          borderTopRightRadius: 24,
          borderTopLeftRadius: 24,
        },
      ]}>
      <FlatList
        data={dataDoctor}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{gap: 8}}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleSelect(item)}
            style={{
              borderWidth: 1,
              padding: 4,
              borderColor:
                dataDocotr?.id === item.id
                  ? colors['blue-500']
                  : colors['grey-150'],
              borderRadius: 10,
              paddingHorizontal: 12,
            }}>
            <RowComponent gap={12} justify="flex-start">
              <Image
                style={{
                  width: 42,
                  height: 42,
                }}
                source={
                  item
                    ? {uri: item.avatar}
                    : require('../../assets/imgs/doctor.png')
                }
              />
              <TextComponent
                text={item.fullName}
                size={12}
                color={colors['text-body']}
                font={
                  dataDocotr?.id === item.id
                    ? fontFamilies['inter-semibold']
                    : fontFamilies['inter-regular']
                }
              />
            </RowComponent>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BookDateScreen;
