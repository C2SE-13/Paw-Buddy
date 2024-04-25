/* eslint-disable react-native/no-inline-styles */
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import React, {
  Fragment,
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
  apiGetPetService,
} from '../../apis';
import CardServiceComponent from './components/CardServiceComponent';
import {IDoctors, IPetServies} from '../../utils/interface';
import {colors} from '../../constants/colors';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';

interface Props {
  navigation: any;
  route: RouteProp<MainStackParamList, 'BookDateScreen'>;
}

export interface Booking {
  service_id: string;
  pet_id: number;
  date: string;
  start_time: string;
  vet_id: number;
}

const BookDateScreen = ({route}: Props) => {
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
  const [startTime, setStartTime] = useState<{time: string; buoi: string}>({
    time: '',
    buoi: '',
  });
  const {petActive} = useSelector((state: RootState) => state.user);
  const actionSheetRef = useRef<ActionSheetRef>(null);

  useEffect(() => {
    chosenServices.length > 0 && setChosen(chosenServices);
  }, [chosenServices]);

  useEffect(() => {
    const getItemDetail = async (id: number) => {
      const response: any = await apiGetPetService({category_id: id});
      if (response.success) {
        setDataService(response.data);
      }
    };

    getItemDetail(idService);
  }, [idService]);

  useEffect(() => {
    const getInformationDoctor = async (id: number) => {
      const response: any = await apiGetDetailDoctors(id);
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
      service_id: chosen.map(item => item.id).join(','),
      pet_id: petActive?.id ?? 0,
      date: bookDate.toString(),
      start_time: startTime.time,
      vet_id: dataDocotr?.id ?? 0,
    };

    // const response = await apiCreateBooking(data);
    // console.log(response);
  };

  return (
    <View style={[globalStyles.container]}>
      <HeaderBookDate />
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
            {doctorId !== 0 ? (
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
        {doctorId !== 0 && (
          <Fragment>
            <SpaceComponent height={20} />
            <DateService
              date={bookDate}
              setBookDate={setBookDate}
              totalTimeOfService={totalTimeOfService}
              startTime={startTime}
              setStartTime={setStartTime}
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
            startTime.time.length > 0
              ? 'primary'
              : 'disabled'
          }
          size="large"
          onPress={handleConfirm}
        />
      </View>
      <ActionSheet ref={actionSheetRef}>
        <View />
      </ActionSheet>
    </View>
  );
};

export default BookDateScreen;
