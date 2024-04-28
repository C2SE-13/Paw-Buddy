/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {RowComponent, TextComponent} from '../../components';
import {fontFamilies} from '../../constants/fontFamilies';
import {useEffect, useState} from 'react';
import {colors} from '../../constants/colors';
import {shadowStyle, shadowStyle2} from '../../styles/boxShadow';
import moment from 'moment';
import {apiGetBookingUser} from '../../apis';
import {globalStyles} from '../../styles/globalStyles';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

type MarkedDateEntry = {
  selected?: boolean;
  selectedColor?: string;
  dots?: {key: string; color: string; selectedDotColor: string; id?: number}[];
};

interface Events {
  dataPet: {
    photo: string;
  };
  start_time: string;
  services: {
    category_id: number;
    dataCategory: {
      image: string;
      type_service: string;
    };
  }[];
}

const CalendarScreen = () => {
  const [selected, setSelected] = useState<string>(
    moment().format('YYYY-MM-DD'),
  );
  const [data, setData] = useState<Events[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {serviceCategories} = useSelector((state: RootState) => state.app);

  const processDate = () => {
    const markedCustom = serviceCategories.map(i => {
      if (i.id === 1) {
        return {
          id: i.id,
          key: i.type_service,
          color: colors['fill-red'],
          selectedDotColor: colors['fill-red'],
        };
      } else if (i.id === 2) {
        return {
          id: i.id,
          key: i.type_service,
          color: colors['fill-red'],
          selectedDotColor: colors['fill-red'],
        };
      } else if (i.id === 3) {
        return {
          id: i.id,
          key: i.type_service,
          color: colors['fill-red'],
          selectedDotColor: colors['fill-red'],
        };
      } else if (i.id === 4) {
        return {
          id: i.id,
          key: i.type_service,
          color: colors['fill-red'],
          selectedDotColor: colors['fill-red'],
        };
      } else if (i.id === 5) {
        return {
          id: i.id,
          key: i.type_service,
          color: colors['fill-red'],
          selectedDotColor: colors['fill-red'],
        };
      }
    });

    const markedDates: Record<string, MarkedDateEntry> = {
      [selected]: {
        selected: true,
        selectedColor: colors['primary-100'],
      },
    };

    data.forEach(item => {
      const dots: {key: string; color: string; selectedDotColor: string}[] = [];

      if (markedCustom.some(i => i?.id === item.services[0].category_id)) {
        const value = markedCustom.find(
          i => i?.id === item.services[0].category_id,
        );

        value &&
          dots.push({
            key: value?.key,
            color: value?.color,
            selectedDotColor: value?.selectedDotColor,
          });
      }

      if (markedDates[item.start_time]) {
        markedDates[item.start_time] = {
          ...markedDates[item.start_time],
          dots: [...(markedDates[item.start_time].dots || []), ...dots],
        };
      } else {
        markedDates[item.start_time] = {dots};
      }
    });

    return markedDates;
  };

  useEffect(() => {
    const getBookingDate = async (date: string) => {
      setIsLoading(true);
      const response: any = await apiGetBookingUser({
        date: date,
        isUser: true,
        status: 'pending', // chưa xong
      });
      setIsLoading(false);
      if (response.success) {
        setData(response.data);
      }
    };

    getBookingDate(selected);
  }, [selected]);

  return (
    <View style={{backgroundColor: colors.lightBackground, flex: 1}}>
      <View style={[styles.calendarContainer, shadowStyle, shadowStyle2]}>
        <Calendar
          onDayPress={day => setSelected(day.dateString)}
          markingType="multi-dot"
          markedDates={processDate()}
        />
      </View>
      <View style={{padding: 12, paddingBottom: 24, flex: 1, gap: 16}}>
        <TextComponent
          text="Upcoming events"
          size={16}
          font={fontFamilies['inter-semibold']}
          color={colors['grey-800']}
          styles={{paddingLeft: 12}}
        />
        {isLoading ? (
          <View style={[globalStyles.center, {flex: 1}]}>
            <ActivityIndicator size="large" color={colors['primary-100']} />
          </View>
        ) : data.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  shadowStyle,
                  shadowStyle2,
                  {
                    backgroundColor: colors['background-white'],
                    padding: 16,
                    borderRadius: 18,
                    margin: 12,
                    marginTop: 0,
                  },
                ]}>
                <RowComponent gap={16}>
                  <Image
                    source={{uri: item.dataPet.photo}}
                    width={52}
                    height={52}
                    style={styles.petAvt}
                  />
                  <View style={{flex: 1, gap: 4}}>
                    <RowComponent gap={8} justify="flex-start">
                      <TextComponent
                        text={selected.split('-').reverse().join('.')}
                        size={14}
                        font={fontFamilies['inter-medium']}
                        color={colors['grey-800']}
                      />
                      <TextComponent
                        text={'|'}
                        size={14}
                        font={fontFamilies['inter-medium']}
                        color={colors['grey-800']}
                      />
                      <TextComponent
                        text={`${item.start_time
                          .split(':')
                          .slice(0, 2)
                          .join(':')} ${
                          +item.start_time.split(':')[0] > 12 ? 'PM' : 'AM'
                        }`}
                        size={14}
                        font={fontFamilies['inter-medium']}
                        color={colors['grey-800']}
                      />
                    </RowComponent>
                    <RowComponent justify="flex-start" gap={8}>
                      <Image
                        resizeMode="cover"
                        style={{
                          width: 24,
                          height: 24,
                        }}
                        source={{
                          uri: serviceCategories.find(
                            i => i.id === item.services[0].category_id,
                          )?.image,
                        }}
                      />
                      <TextComponent
                        text={
                          serviceCategories.find(
                            i => i.id === item.services[0].category_id,
                          )?.type_service ?? ''
                        }
                        size={16}
                        font={fontFamilies['inter-semibold']}
                        color={colors['grey-800']}
                      />
                    </RowComponent>
                  </View>
                </RowComponent>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={[globalStyles.center, {flex: 1}]}>
            <TextComponent
              text="There are no events"
              size={14}
              styles={{
                paddingHorizontal: 12,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors['background-white'],
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  petAvt: {
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: colors['grey-150'],
  },
});

export default CalendarScreen;
