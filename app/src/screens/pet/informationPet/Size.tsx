/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {FlatList, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ImagePet from './ImagePet';
import {Props} from '../constants/interface';
import {globalStyles} from '../../../styles/globalStyles';
import {CircleComponent, TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {sizes} from '../constants/size';
import {shadowStyle, shadowStyle2} from '../../../styles/boxShadow';

const Size = ({getValues, setValue, setstatusButton, nameStep}: Props) => {
  const values = getValues();
  const ref = useRef<FlatList<any>>(null);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
  }, [index]);

  useEffect(() => {
    if (nameStep === 'Size') {
      setValue('size', sizes[index].value);
      setstatusButton('primary');
    }
  }, [index, nameStep, setValue, setstatusButton]);

  const handleSelect = (index: number) => {
    setIndex(index);
    setValue('size', sizes[index].value);
    setstatusButton('primary');
  };

  return (
    <ScrollView
      style={[
        {
          paddingVertical: 24,
          gap: 24,
        },
      ]}>
      <View style={[globalStyles.center, {gap: 24}]}>
        <ImagePet photo={values.photo} size="small" />
        <View style={[globalStyles.center, {gap: 4, paddingHorizontal: 24}]}>
          <TextComponent
            title
            text="What’s your pet’s size?"
            color={colors['grey-800']}
            font={fontFamilies['inter-medium']}
          />
          <TextComponent
            align="center"
            text="Automatic selection based on your pets breed. Adjust according to reality"
            color={colors['grey-700']}
          />
        </View>
      </View>
      <FlatList
        ref={ref}
        style={{paddingVertical: 24}}
        initialScrollIndex={index}
        data={sizes}
        keyExtractor={item => `size-${item.id}`}
        contentContainerStyle={[globalStyles.center, {gap: 24}]}
        horizontal
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: 145,
          offset: 145 * index,
          index,
        })}
        renderItem={({item, index: fIndex}) => (
          <TouchableOpacity
            onPress={() => {
              handleSelect(fIndex);
            }}
            style={[
              globalStyles.center,
              shadowStyle,
              shadowStyle2,
              {
                width: index === fIndex ? 145 : 98,
                height: index === fIndex ? 165 : 126,
                backgroundColor: colors['background-white'],
                borderWidth: index === fIndex ? 2 : 1,
                borderRadius: 14,
                borderColor:
                  index === fIndex ? colors['blue-500'] : colors['grey-150'],
              },
            ]}>
            <CircleComponent
              styles={{marginBottom: 8}}
              color={index === fIndex ? colors['blue-100'] : colors['grey-150']}
              size={index === fIndex ? 55 : 42}>
              {index === fIndex ? item.iconActive : item.icon}
            </CircleComponent>
            <TextComponent
              title
              text={item.name}
              color={index === fIndex ? colors['blue-500'] : colors['grey-800']}
            />
            <TextComponent
              text={item.value}
              color={index === fIndex ? colors['blue-300'] : colors['grey-600']}
              size={14}
            />
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

export default Size;
