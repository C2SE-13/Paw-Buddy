/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import React, {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import {globalStyles} from '../../../styles/globalStyles';
import ImagePet from './ImagePet';
import {Props} from '../constants/interface';
import {
  ButtonComponent,
  CircleComponent,
  RowComponent,
  TextComponent,
} from '../../../components';
import {fontFamilies} from '../../../constants/fontFamilies';
import {colors} from '../../../constants/colors';
import {
  AdoptionIcon,
  BrithdayIcon,
  ChevronLeft,
  ChevronRight,
} from '../../../assets/icons';
import {shadowStyle, shadowStyle2} from '../../../styles/boxShadow';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import moment from 'moment';
import {RenderCalendar, months, weeks} from '../constants/renderCalendar';

interface buttonLocalProps {
  icon: ReactNode;
  name: string;
  value: string;
  onPress: () => void;
}

interface dateCustomprops {
  dateCurrent: SetStateAction<string>;
  setValue: Dispatch<SetStateAction<string>>;
  actionSheetRef: RefObject<ActionSheetRef>;
}

const Dates = ({getValues, nameStep, setstatusButton, setValue}: Props) => {
  const values = getValues();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [birthday, setBirthday] = useState<SetStateAction<string>>(
    moment().format(),
  );
  const [adoption, setAdoption] = useState<SetStateAction<string>>(
    moment().format(),
  );
  const [choosed, setChoosed] = useState('');

  useEffect(() => {
    if (nameStep === 'Important Dates') {
      if (values.date_of_birth && values.adoption) {
        setstatusButton('primary');
      } else {
        setstatusButton('disabled');
      }
    }
  }, [nameStep, setstatusButton, values.adoption, values.date_of_birth]);

  useEffect(() => {
    setValue('date_of_birth', birthday.toString());
    setValue('adoption', adoption.toString());
  }, [birthday, adoption, setValue]);

  return (
    <>
      <View
        style={[
          globalStyles.container,
          {
            padding: 24,
            alignItems: 'center',
            gap: 24,
          },
        ]}>
        <ImagePet photo={values.photo} size="small" />
        <TextComponent
          text="Time to celebrate"
          color={colors['grey-800']}
          size={16}
          font={fontFamilies['inter-medium']}
        />
        <ButtonLocal
          onPress={() => {
            actionSheetRef.current?.show();
            setChoosed('birthday');
          }}
          icon={<BrithdayIcon />}
          name="Birthday"
          value={birthday.toString()}
        />
        <ButtonLocal
          onPress={() => {
            actionSheetRef.current?.show();
            setChoosed('adoption');
          }}
          icon={<AdoptionIcon />}
          name="Adoption Day"
          value={adoption.toString()}
        />
      </View>
      <ActionSheet ref={actionSheetRef}>
        <CalendarCustom
          actionSheetRef={actionSheetRef}
          setValue={choosed === 'birthday' ? setBirthday : setAdoption}
          dateCurrent={choosed === 'birthday' ? birthday : adoption}
        />
      </ActionSheet>
    </>
  );
};

export const ButtonLocal = ({icon, name, value, onPress}: buttonLocalProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        globalStyles['w-100'],
        shadowStyle,
        shadowStyle2,
        {
          padding: 16,
          borderRadius: 14,
          borderWidth: 0,
          backgroundColor: colors['background-white'],
        },
      ]}>
      <RowComponent gap={10}>
        <CircleComponent color={colors['blue-100']} radius={12} size={42}>
          {icon}
        </CircleComponent>
        <View style={{flex: 1}}>
          <TextComponent text={name} color={colors['grey-600']} size={14} />
          <TextComponent
            text={moment(value).format('DD MMMM YYYY')}
            color={colors['grey-800']}
            size={14}
            font={fontFamilies['inter-semibold']}
          />
        </View>
        <RowComponent
          alignItems="flex-end"
          styles={{
            paddingLeft: 16,
            borderLeftWidth: 1,
            borderColor: colors['grey-150'],
            paddingVertical: 6,
          }}>
          <TextComponent
            text={`${
              moment().diff(moment(value), 'years') > 0
                ? moment().diff(moment(value), 'years').toString()
                : '0'
            }`}
            color={colors['grey-800']}
            size={20}
            font={fontFamilies['inter-semibold']}
          />
          <TextComponent text={' y.o'} color={colors['grey-600']} size={12} />
        </RowComponent>
      </RowComponent>
    </TouchableOpacity>
  );
};

const CalendarCustom = ({
  dateCurrent,
  actionSheetRef,
  setValue,
}: dateCustomprops) => {
  const [monthIndex, setmonthIndex] = useState(
    months.indexOf(moment(dateCurrent.toString()).format('MMMM')),
  );
  const [currentYear, setCurrentYear] = useState(
    +moment(dateCurrent.toString()).format('YYYY'),
  );
  const [currentDay, setCurrentDay] = useState(
    moment(dateCurrent.toString()).format('DD'),
  );
  const [dataCalendar, setDataCalendar] = useState(
    RenderCalendar(dateCurrent.toString(), currentDay, monthIndex, currentYear),
  );
  const ref = useRef<FlatList<any>>(null);

  useEffect(() => {
    setDataCalendar(
      RenderCalendar(
        dateCurrent.toString(),
        currentDay,
        monthIndex,
        currentYear,
      ),
    );
  }, [currentDay, monthIndex, currentYear, dateCurrent]);

  useEffect(() => {
    ref.current?.scrollToIndex({
      index: monthIndex,
      animated: true,
      viewPosition: 0.5,
    });
  }, [monthIndex]);

  const handleSelct = () => {
    actionSheetRef.current?.hide();

    const newDate = new Date(
      `${currentYear}-${
        monthIndex + 1 > 9 ? monthIndex + 1 : `0${monthIndex + 1}`
      }-${currentDay}`,
    );

    setValue(newDate.toISOString());
  };

  return (
    <View style={{padding: 24, gap: 24}}>
      <RowComponent justify="space-between">
        <TouchableOpacity
          onPress={() => setCurrentYear(prev => prev - 1)}
          style={[
            globalStyles.center,
            {
              width: 36,
              height: 36,
              borderWidth: 1,
              borderRadius: 14,
              borderColor: colors['grey-150'],
            },
          ]}>
          <ChevronLeft />
        </TouchableOpacity>
        <TextComponent
          color={colors['blue-500']}
          text={currentYear.toString()}
          align="center"
          styles={{
            backgroundColor: colors['blue-100'],
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 14,
          }}
          font={fontFamilies['inter-semibold']}
          size={20}
        />
        <TouchableOpacity
          onPress={() => setCurrentYear(prev => prev + 1)}
          style={[
            globalStyles.center,
            {
              width: 36,
              height: 36,
              borderWidth: 1,
              borderRadius: 14,
              borderColor: colors['grey-150'],
            },
          ]}>
          <ChevronRight />
        </TouchableOpacity>
      </RowComponent>

      <View
        style={{
          paddingVertical: 24,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: colors['grey-150'],
        }}>
        <FlatList
          ref={ref}
          horizontal
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={monthIndex}
          data={months}
          contentContainerStyle={{gap: 24}}
          getItemLayout={(data, index) => ({
            length: 134,
            offset: (134 + 24) * index,
            index,
          })}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => setmonthIndex(months.indexOf(item))}
              style={[
                globalStyles.center,
                {width: 134},
                index === monthIndex && {
                  paddingVertical: 6,
                  backgroundColor: colors['blue-100'],
                  borderRadius: 12,
                  height: 46,
                  borderWidth: 1,
                  borderColor: colors['blue-300'],
                },
              ]}>
              <TextComponent
                text={item}
                color={index === monthIndex ? colors['blue-500'] : '#808B9A'}
                font={
                  index === monthIndex
                    ? fontFamilies['inter-semibold']
                    : fontFamilies['inter-medium']
                }
                size={index === monthIndex ? 22 : 14}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={[globalStyles.center, globalStyles['w-100'], {gap: 8}]}>
        <FlatList
          data={weeks}
          numColumns={weeks.length}
          contentContainerStyle={{gap: 8}}
          columnWrapperStyle={{gap: 8}}
          renderItem={({item}) => (
            <View
              style={[
                globalStyles.center,
                {
                  width: Dimensions.get('window').width / 7 - 14,
                  height: Dimensions.get('window').width / 7 - 14,
                },
              ]}>
              <TextComponent text={item} size={12} color={colors['grey-500']} />
            </View>
          )}
        />
        <FlatList
          key={weeks.length}
          data={dataCalendar}
          numColumns={weeks.length}
          contentContainerStyle={{gap: 8}}
          columnWrapperStyle={{gap: 8}}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => setCurrentDay(item.value.toString())}
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

      <ButtonComponent
        text="Done"
        type="primary"
        size="large"
        onPress={handleSelct}
      />
    </View>
  );
};

export default Dates;
