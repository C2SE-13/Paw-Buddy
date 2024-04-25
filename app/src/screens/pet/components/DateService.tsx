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
  startTime: {time: string; buoi: string};
  setStartTime: Dispatch<SetStateAction<{time: string; buoi: string}>>;
}

interface Time {
  buoi: string;
  busy: boolean;
  time: string;
  old: boolean;
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

  console.log(totalTimeOfService);

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
                  font={fontFamilies['inter-regular']}
                  color={colors['grey-500']}
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
                disabled={item.old}
                onPress={() => handleSelectDate(item.value, item.name)}
                style={[
                  globalStyles.center,
                  {
                    width: Dimensions.get('window').width / 7 - 14,
                    height: Dimensions.get('window').width / 7 - 14,
                    backgroundColor: item.old
                      ? colors['grey-100']
                      : item.name === 'active'
                      ? colors['blue-100']
                      : colors['background-white'],
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: item.old
                      ? colors['grey-150']
                      : item.name === 'active'
                      ? colors['blue-300']
                      : colors['grey-150'],
                  },
                ]}>
                <TextComponent
                  text={item.value.toString()}
                  size={16}
                  font={fontFamilies['inter-medium']}
                  color={
                    item.old
                      ? colors['grey-500']
                      : item.name === 'active'
                      ? colors['blue-500']
                      : colors['grey-700']
                  }
                />
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{gap: 8}}>
          <TextComponent
            text="Availability"
            title
            size={16}
            color={colors['grey-800']}
          />
          <RowComponent gap={4} justify="space-between">
            <RowComponent gap={4}>
              <TextComponent
                text="Start time:"
                title
                size={13}
                color={colors['grey-800']}
              />
              <TextComponent
                text={`${
                  startTime.time.length > 0 ? startTime.time : '00:00'
                } ${startTime.time.length > 0 ? startTime.buoi : ''}`}
                size={13}
                color={
                  startTime.time.length > 0
                    ? colors['blue-500']
                    : colors['grey-800']
                }
              />
            </RowComponent>
            <RowComponent gap={4}>
              <TextComponent
                text="Estimated time:"
                title
                size={13}
                color={colors['grey-800']}
              />
              <TextComponent
                text={`${
                  startTime.time.length > 0
                    ? Number(startTime.time.toString().split(':')[0]) +
                      Math.floor(totalTimeOfService / 60)
                    : '00'
                }:${
                  startTime.time.length > 0
                    ? Number(startTime.time.toString().split(':')[1]) +
                      (totalTimeOfService % 60)
                    : '00'
                } ${
                  startTime.time.length < 0
                    ? ''
                    : Number(startTime.time.toString().split(':')[0]) +
                        Math.floor(totalTimeOfService / 60) >
                      12
                    ? 'PM'
                    : 'AM'
                }`}
                size={13}
                color={
                  startTime.time.length > 0
                    ? colors['blue-500']
                    : colors['grey-800']
                }
              />
            </RowComponent>
          </RowComponent>
          <RowComponent
            justify="space-between"
            gap={12}
            styles={{paddingBottom: 6}}>
            <TextComponent
              text="Note:"
              title
              size={12}
              color={colors['grey-600']}
            />
            <RowComponent gap={4}>
              <TextComponent
                text="Overtime:"
                size={12}
                color={colors['grey-600']}
              />
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: colors['orange-100'],
                }}
              />
            </RowComponent>
            <RowComponent gap={4}>
              <TextComponent
                text="Been busy:"
                size={12}
                color={colors['grey-600']}
              />
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: colors['warning-100'],
                }}
              />
            </RowComponent>
            <RowComponent gap={4}>
              <TextComponent
                text="Selected:"
                size={12}
                color={colors['grey-600']}
              />
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: colors['blue-500'],
                }}
              />
            </RowComponent>
          </RowComponent>
          <FlatList
            scrollEnabled={false}
            contentContainerStyle={{gap: 8}}
            columnWrapperStyle={{gap: 8, justifyContent: 'space-between'}}
            numColumns={3}
            data={time}
            renderItem={({item}) => {
              const disabled = item.old ? true : item.busy ? true : false;
              return (
                <TouchableOpacity
                  onPress={() =>
                    setStartTime({
                      time: item.time,
                      buoi: item.buoi,
                    })
                  }
                  disabled={disabled}
                  style={{
                    width: Dimensions.get('screen').width / 3 - 24,
                    backgroundColor: item.old
                      ? colors['orange-100']
                      : startTime.time === item.time
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
                        item.old
                          ? colors['text-body']
                          : startTime.time === item.time
                          ? colors['background-white']
                          : item.busy
                          ? colors['grey-600']
                          : colors['text-50']
                      }
                      size={14}
                    />
                    <TextComponent
                      text={item.buoi}
                      color={
                        item.old
                          ? colors['text-body']
                          : startTime.time === item.time
                          ? colors['background-white']
                          : item.busy
                          ? colors['grey-600']
                          : colors['text-50']
                      }
                      size={14}
                    />
                  </RowComponent>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DateService;
