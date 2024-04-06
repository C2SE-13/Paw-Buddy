/* eslint-disable react-native/no-inline-styles */
import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Category from './Category';
import {RowComponent, TextComponent} from '../../../components';
import {globalStyles} from '../../../styles/globalStyles';
import {colors} from '../../../constants/colors';

const data = [
  {
    id: 1,
    name: 'General',
    image: require('../../../assets/imgs/Activities.png'),
  },
  {
    id: 2,
    name: 'Neurologic',
    image: require('../../../assets/imgs/Activities.png'),
  },
  {
    id: 3,
    name: 'Pediatric',
    image: require('../../../assets/imgs/Activities.png'),
  },
  {
    id: 4,
    name: 'Radiology',
    image: require('../../../assets/imgs/Activities.png'),
  },
];

const Speciality = () => {
  return (
    <View style={{gap: 16}}>
      <Category text="Doctor Speciality" onPress={() => {}} />
      <RowComponent gap={16} justify="space-between">
        {data.map(item => (
          <TouchableOpacity
            onPress={() => console.log(item)}
            key={item.id}
            style={[globalStyles.center, {gap: 12}]}>
            <View
              style={[
                globalStyles.center,
                {
                  width: 56,
                  height: 56,
                  backgroundColor: colors['primary-surface'],
                  borderRadius: 1000,
                },
              ]}>
              <Image
                source={item.image}
                style={{
                  width: 24,
                  height: 24,
                  objectFit: 'cover',
                }}
              />
            </View>
            <TextComponent text={item.name} color={colors['text-100']} />
          </TouchableOpacity>
        ))}
      </RowComponent>
    </View>
  );
};

export default Speciality;
