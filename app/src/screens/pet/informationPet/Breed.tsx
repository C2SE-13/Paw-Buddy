/* eslint-disable react-native/no-inline-styles */
import {View, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {memo, useState} from 'react';
import {globalStyles} from '../../../styles/globalStyles';
import {breeds} from '../constants/breeds';
import {TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';
import {shadowStyle, shadowStyle2} from '../../../styles/boxShadow';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Props} from '../constants/interface';

const Breed = ({setValue, setstatusButton}: Props) => {
  const [dataBreeds, setDataBreeds] = useState([
    {
      breed: 'Custom',
      image: require('../../../assets/imgs/EmptySpaceIllustrations.png'),
    },
    ...breeds,
  ]);

  const [active, setActive] = useState<{
    breed: string | null;
    image: string | null;
  }>({
    breed: null,
    image: null,
  });

  const handleSelect = (breed: string, image: string) => {
    setValue('breed', breed);
    setValue('photo', image);
    setActive({breed, image});
    setstatusButton('primary');
  };

  return (
    <View
      style={[
        globalStyles.container,
        globalStyles.center,
        {
          paddingHorizontal: 24,
          paddingVertical: 12,
        },
      ]}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataBreeds}
        contentContainerStyle={{gap: 16}}
        columnWrapperStyle={{gap: 16}}
        numColumns={2}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => handleSelect(item.breed, item.image)}
            style={[
              globalStyles.center,
              shadowStyle,
              shadowStyle2,
              {
                width: 155,
                height: 155,
                backgroundColor: colors['background-white'],
                borderRadius: 14,
                borderWidth: 1,
                borderColor: colors['grey-150'],
                gap: 20,
                justifyContent: 'flex-end',
                padding: 4,
              },
              active.breed === item.breed &&
                active.image === item.image && {
                  backgroundColor: colors['blue-500'],
                  borderWidth: 0,
                },
            ]}>
            <TextComponent
              text={item.breed}
              color={
                active.breed === item.breed && active.image === item.image
                  ? colors['background-white']
                  : colors['grey-800']
              }
              font={fontFamilies['inter-semibold']}
            />
            <Image
              source={item.image}
              style={{
                width: 87,
                height: 87,
                objectFit: 'cover',
                borderRadius: 4,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default memo(Breed);
