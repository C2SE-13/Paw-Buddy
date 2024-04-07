/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import {View, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {globalStyles} from '../../../styles/globalStyles';
import {TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';
import {shadowStyle, shadowStyle2} from '../../../styles/boxShadow';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Props} from '../constants/interface';
import {apiGetBreeds} from '../../../apis/pet';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../utils/toast';
import {ImagePickerResponse} from 'react-native-image-picker';
import useUpdateStatusLoading from '../../../hooks/useUpdateStatusLoading';

const Breed = ({setValue, setstatusButton}: Props) => {
  const [dataBreeds, setDataBreeds] = useState<any[]>([]);
  const {updateStatusLoading} = useUpdateStatusLoading();
  const [active, setActive] = useState<{
    name: string | null;
    image: string | ImagePickerResponse | null;
  }>({
    name: null,
    image: null,
  });

  const getBreeds = useCallback(async () => {
    updateStatusLoading(true);
    const {data, success, message}: any = await apiGetBreeds({
      limit: 9,
      page: 0,
    });
    updateStatusLoading(false);
    if (success) {
      setDataBreeds([
        {
          name: 'Custom',
          image: require('../../../assets/imgs/EmptySpaceIllustrations.png'),
        },
        ...data,
      ]);
    } else
      Toast.show(
        toastConfig({textMain: message, type: 'error', visibilityTime: 200}),
      );
  }, []);

  useEffect(() => {
    getBreeds();
  }, [getBreeds]);

  const handleSelect = (name: string, image: string | ImagePickerResponse) => {
    setValue('breed', name);
    setValue('photo', image);
    setActive({name, image});
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
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => handleSelect(item?.name, item?.image)}
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
                active.name === item?.name &&
                  active.image === item?.image && {
                    backgroundColor: colors['blue-500'],
                    borderWidth: 0,
                  },
              ]}>
              <TextComponent
                text={item?.name}
                color={
                  active.name === item?.name && active.image === item?.image
                    ? colors['background-white']
                    : colors['grey-800']
                }
                font={fontFamilies['inter-semibold']}
              />
              <Image
                source={
                  typeof item.image === 'string'
                    ? {uri: item?.image}
                    : item.image
                }
                style={{
                  width: 87,
                  height: 87,
                  objectFit: 'cover',
                  borderRadius: 4,
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default memo(Breed);
