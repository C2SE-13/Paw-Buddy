/* eslint-disable react-native/no-inline-styles */
import {Dimensions, FlatList, TouchableOpacity, View} from 'react-native';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {RowComponent, SpaceComponent, TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';
import {RenderCalendar, months, weeks} from '../constants/renderCalendar';
import {globalStyles} from '../../../styles/globalStyles';
import {fontFamilies} from '../../../constants/fontFamilies';
import moment from 'moment';
import {renderTime} from '../constants/renderTime';

interface Props {
  date: SetStateAction<string>;
  setBookDate: Dispatch<SetStateAction<string>>;
  totalTimeOfService: number;
  startTime: SetStateAction<string>;
  setStartTime: Dispatch<SetStateAction<string>>;
}

interface Time {
  buoi: string;
  busy: boolean;
  time: string;
}

const DateService = ({
  date,
  setBookDate,
  totalTimeOfService,
  startTime,
  setStartTime,
}: Props) => {
  const [monthIndex, setmonthIndex] = useState(
    months.indexOf(moment(date.toString()).format('MMMM')),
  );
  const [currentYear, setCurrentYear] = useState(
    +moment(date.toString()).format('YYYY'),
  );
  const [currentDay, setCurrentDay] = useState(
    +moment(date.toString()).format('DD'),
  );
  const [dataCalendar, setDataCalendar] = useState(
    RenderCalendar(date.toString(), currentDay, monthIndex, currentYear),
  );
  const [week, setWeek] = useState(moment(date.toString()).format('dddd'));
  const [time, setTime] = useState<Time[]>([]);

  useEffect(() => {
    setDataCalendar(
      RenderCalendar(date.toString(), currentDay, monthIndex, currentYear),
    );
    setmonthIndex(months.indexOf(moment(date.toString()).format('MMMM')));
    setCurrentYear(+moment(date.toString()).format('YYYY'));
    setCurrentDay(+moment(date.toString()).format('DD'));
    setWeek(moment(date.toString()).format('dddd'));
  }, [currentDay, monthIndex, currentYear, date]);

  useEffect(() => {
    setTime(
      renderTime(
        currentYear,
        monthIndex + 1,
        currentDay,
        0,
        0,
        totalTimeOfService,
      ),
    );
  }, [currentDay, currentYear, monthIndex, startTime, totalTimeOfService]);

  const handlePrev = () => {
    const value: number = +moment(date.toString()).format('M');
    if (value === 1) {
      const newDate = new Date(`${currentYear - 1}-12-${currentDay}`);
      setBookDate(newDate.toISOString());
    } else {
      const newDate = new Date(
        `${currentYear}-${
          value - 1 > 9 ? value - 1 : `0${value - 1}`
        }-${currentDay}`,
      );
      setBookDate(newDate.toISOString());
    }
  };

  const handleNext = () => {
    const value: number = +moment(date.toString()).format('M');
    if (value === 12) {
      const newDate = new Date(`${currentYear + 1}-01-${currentDay}`);
      setBookDate(newDate.toISOString());
    } else {
      const newDate = new Date(
        `${currentYear}-${
          value + 1 > 9 ? value + 1 : `0${value + 1}`
        }-${currentDay}`,
      );
      setBookDate(newDate.toISOString());
    }
  };

  const handleSelectDate = (chosentDate: number, name: string) => {
    const value: number = +moment(date.toString()).format('M');
    if (name === 'inactive' && chosentDate >= 1 && chosentDate < 7) {
      if (value === 12) {
        const newDate = new Date(`${currentYear + 1}-01-${chosentDate}`);
        setBookDate(newDate.toISOString());
      } else {
        const newDate = new Date(
          `${currentYear}-${
            value + 1 > 9 ? value + 1 : `0${value + 1}`
          }-${chosentDate}`,
        );
        setBookDate(newDate.toISOString());
      }
    } else if (name === 'inactive' && chosentDate >= 20 && chosentDate <= 31) {
      if (value === 1) {
        const newDate = new Date(`${currentYear - 1}-12-${chosentDate}`);
        setBookDate(newDate.toISOString());
      } else {
        const newDate = new Date(
          `${currentYear}-${
            value - 1 > 9 ? value - 1 : `0${value - 1}`
          }-${chosentDate}`,
        );
        setBookDate(newDate.toISOString());
      }
    } else {
      const newDate = new Date(
        `${currentYear}-${
          monthIndex + 1 > 9 ? monthIndex + 1 : `0${monthIndex + 1}`
        }-${chosentDate}`,
      );

      setBookDate(newDate.toISOString());
    }
  };

  return (
    <View style={{paddingHorizontal: 24}}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: colors['grey-150'],
          paddingBottom: 24,
        }}>
        <RowComponent>
          <RowComponent gap={2} justify="flex-start" styles={{flex: 1}}>
            <TextComponent
              text={`${week},`}
              size={15}
              title
              color={colors['grey-800']}
            />
            <TextComponent
              text={`${currentDay} ${months[monthIndex]} ${currentYear}`}
              size={15}
              color={colors['grey-800']}
            />
          </RowComponent>
          <RowComponent gap={6}>
            <TouchableOpacity
              onPress={handlePrev}
              style={[
                globalStyles.center,
                {
                  width: 50,
                  height: 30,
                  borderWidth: 1,
                  borderColor: colors['grey-150'],
                  borderRadius: 10,
                },
              ]}>
              <TextComponent
                text="Prev"
                font={fontFamilies['inter-medium']}
                size={14}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleNext}
              style={[
                globalStyles.center,
                {
                  width: 50,
                  height: 30,
                  borderWidth: 1,
                  borderColor: colors['grey-150'],
                  borderRadius: 10,
                },
              ]}>
              <TextComponent
                text="Next"
                font={fontFamilies['inter-medium']}
                size={14}
              />
            </TouchableOpacity>
          </RowComponent>
        </RowComponent>
        <SpaceComponent height={4} />
        <View style={[globalStyles.center, {paddingBottom: 12}]}>
          <FlatList
            columnWrapperStyle={{gap: 8, justifyContent: 'space-between'}}
            numColumns={weeks.length}
            scrollEnabled={false}
            data={weeks}
            renderItem={({item}) => (
              <View
                style={[
                  globalStyles.center,
                  {
                    width: Dimensions.get('window').width / 7 - 14,
                    height: Dimensions.get('window').width / 7 - 14,
                  },
                ]}>
                <TextComponent
                  text={item}
                  size={12}
                  font={
                    item === week.substring(0, 3)
                      ? fontFamilies['inter-medium']
                      : fontFamilies['inter-regular']
                  }
                  color={
                    item === week.substring(0, 3)
                      ? colors['blue-500']
                      : colors['grey-500']
                  }
                />
              </View>
            )}
          />
          <FlatList
            columnWrapperStyle={{gap: 8, justifyContent: 'space-between'}}
            contentContainerStyle={{gap: 8}}
            numColumns={weeks.length}
            scrollEnabled={false}
            data={dataCalendar}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSelectDate(item.value, item.name)}
                style={[
                  globalStyles.center,
                  {
                    width: Dimensions.get('window').width / 7 - 14,
                    height: Dimensions.get('window').width / 7 - 14,
                    backgroundColor:
                      item.name === 'active'
                        ? colors['blue-100']
                        : item.name === 'inactive'
                        ? colors['grey-100']
                        : colors['background-white'],
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor:
                      item.name === 'active'
                        ? colors['blue-300']
                        : colors['grey-150'],
                  },
                ]}>
                <TextComponent
                  text={item.value.toString()}
                  size={16}
                  font={fontFamilies['inter-medium']}
                  color={
                    item.name === 'active'
                      ? colors['blue-500']
                      : item.name === 'inactive'
                      ? colors['grey-500']
                      : colors['grey-700']
                  }
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{gap: 12}}>
          <TextComponent
            text="Availability"
            title
            size={16}
            color={colors['grey-800']}
          />
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{gap: 8}}
            columnWrapperStyle={{gap: 8, justifyContent: 'space-between'}}
            numColumns={3}
            data={time}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => setStartTime(item.time)}
                disabled={item.busy}
                style={{
                  width: Dimensions.get('screen').width / 3 - 24,
                  backgroundColor:
                    startTime === item.time
                      ? colors['primary-100']
                      : item.busy
                      ? colors['warning-100']
                      : colors['primary-surface'],
                  paddingVertical: 12,
                  borderRadius: 14,
                }}>
                <RowComponent gap={2}>
                  <TextComponent
                    text={item.time}
                    color={
                      startTime === item.time
                        ? colors['background-white']
                        : colors['text-50']
                    }
                    size={14}
                  />
                  <TextComponent
                    text={item.buoi}
                    color={
                      startTime === item.time
                        ? colors['background-white']
                        : colors['text-50']
                    }
                    size={14}
                  />
                </RowComponent>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default DateService;
