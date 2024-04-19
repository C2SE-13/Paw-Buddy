/* eslint-disable react-native/no-inline-styles */
import {FlatList, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {RowComponent, SpaceComponent, TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';
import {RenderCalendar, weeks} from '../constants/renderCalendar';
import {globalStyles} from '../../../styles/globalStyles';
import {fontFamilies} from '../../../constants/fontFamilies';

const DateService = () => {
  const [dataCalendar, setDataCalendar] = useState(RenderCalendar());

  return (
    <View style={{paddingHorizontal: 24}}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: colors['grey-150'],
          paddingBottom: 24,
        }}>
        <RowComponent>
          <RowComponent gap={4} justify="flex-start" styles={{flex: 1}}>
            <TextComponent
              text="Monday,"
              size={24}
              title
              color={colors['grey-800']}
            />
            <TextComponent
              text="13 March"
              size={24}
              color={colors['grey-800']}
            />
          </RowComponent>
          <RowComponent gap={8}>
            <TouchableOpacity
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
        <View style={{paddingBottom: 12}}>
          <RowComponent justify="space-between">
            {weeks.map((item, index) => (
              <View
                key={index}
                style={[
                  globalStyles.center,
                  {
                    width: 40,
                    height: 40,
                  },
                ]}>
                <TextComponent
                  text={item}
                  size={12}
                  color={colors['grey-500']}
                />
              </View>
            ))}
          </RowComponent>
          <RowComponent justify="space-between" gap={8}>
            {dataCalendar.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  globalStyles.center,
                  {
                    width: 40,
                    height: 40,
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
            ))}
          </RowComponent>
        </View>
        <View>
          <TextComponent
            text="Availability"
            title
            size={16}
            color={colors['grey-800']}
          />
        </View>
      </View>
    </View>
  );
};

export default DateService;
