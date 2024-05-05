/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
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

const Breed = ({setValue, setstatusButton}: Props) => {
  const [dataBreeds, setDataBreeds] = useState<
    {
      id: number;
      name: string;
      image: string;
    }[]
  >([]);
  const [active, setActive] = useState<{
    name: string | null;
    image: string | ImagePickerResponse | null;
  }>({
    name: null,
    image: null,
  });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getBreeds = useCallback(async () => {
    setIsLoading(true);
    const {data, success, message}: any = await apiGetBreeds({
      limit: 9,
      page: page,
    });
    setIsLoading(false);
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
  }, []);

  const handleSelect = (name: string, image: string | ImagePickerResponse) => {
    setValue('breed', name);
    setValue('photo', image);
    setActive({name, image});
    setstatusButton('primary');
  };

  const loadMore = async () => {
    setIsLoading(true);
    const {data, success, message}: any = await apiGetBreeds({
      limit: 10,
      page: page + 1,
    });
    setIsLoading(false);
    if (success) {
      setDataBreeds(prev => [...prev, ...data]);
      setPage(prev => prev + 1);
    } else
      Toast.show(
        toastConfig({textMain: message, type: 'error', visibilityTime: 200}),
      );
  };

  return (
    <View style={[globalStyles.container, {paddingHorizontal: 12}]}>
      <FlatList
        style={[globalStyles['w-100']]}
        showsVerticalScrollIndicator={false}
        data={dataBreeds}
        columnWrapperStyle={{gap: 16}}
        numColumns={2}
        ListFooterComponent={() => {
          return isLoading ? (
            <View style={{paddingVertical: 12}}>
              <ActivityIndicator size="large" color={colors['primary-100']} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={loadMore}
              style={[globalStyles.center, {paddingVertical: 12}]}>
              <TextComponent
                text="Load More"
                color={colors['blue-500']}
                size={14}
              />
            </TouchableOpacity>
          );
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => handleSelect(item?.name, item?.image)}
              style={[
                globalStyles.center,
                shadowStyle,
                shadowStyle2,
                {
                  width: Dimensions.get('screen').width / 2 - 32,
                  height: 155,
                  backgroundColor: colors['background-white'],
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: colors['grey-150'],
                  gap: 8,
                  justifyContent: 'flex-end',
                  padding: 8,
                  marginLeft: 6,
                  marginTop: 12,
                  marginBottom: 12,
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
                  width: 98,
                  height: 98,
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
