/* eslint-disable react-native/no-inline-styles */
import {ScrollView, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Props} from '../constants/interface';
import {globalStyles} from '../../../styles/globalStyles';
import ImagePet from './ImagePet';
import {Controller} from 'react-hook-form';
import {InputComponent, RowComponent, TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../utils/toast';

const Name = ({
  setValue,
  setstatusButton,
  control,
  errors,
  getValues,
  watch,
  nameStep,
}: Props) => {
  const values = getValues();
  const [imageLocal, setImageLocal] = useState(
    require('../../../assets/imgs/EmptySpaceIllustrations.png'),
  );
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (nameStep === 'Name') {
      setImageLocal(values.photo);

      if (
        values.breed &&
        values.name_pet &&
        typeof values.photo !== 'number' &&
        values.gender !== undefined
      ) {
        setstatusButton('primary');
      } else {
        setstatusButton('disabled');
      }
    }
  }, [
    nameStep,
    setstatusButton,
    values.breed,
    values.gender,
    values.name_pet,
    values.photo,
  ]);

  useEffect(() => {
    const subscription = watch((value, {name}) => {
      if (name === 'breed' || name === 'name_pet') {
        if (value?.breed && value?.name_pet && value.gender !== undefined) {
          setstatusButton('primary');
        } else {
          setstatusButton('disabled');
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [setstatusButton, watch]);

  const handleChangeImage = async () => {
    const result: any = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (result) {
      setValue('photo', {
        uri: result.assets[0].uri,
        name: result.assets[0].fileName,
        type: 'image/jpeg',
      });
      setImageLocal(result.assets[0].uri);
      Toast.show(toastConfig({textMain: 'Upload success'}));
    } else {
      Toast.show(toastConfig({textMain: 'Upload fail', type: 'error'}));
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View
        style={[
          globalStyles.container,
          {
            padding: 24,
            alignItems: 'center',
            gap: 24,
          },
        ]}>
        <ImagePet
          photo={imageLocal}
          iconChange
          size="large"
          onChangeImage={handleChangeImage}
        />
        <View style={{gap: 16, flex: 1}}>
          <View
            style={[
              globalStyles.center,
              globalStyles['w-100'],
              {
                gap: 16,
              },
            ]}>
            <TextComponent
              text="What’s your pet’s name?"
              color={colors['grey-800']}
              font={fontFamilies['inter-medium']}
              size={16}
            />
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This field cannot empty.'},
              }}
              render={({field: {onChange, value, name}}) => (
                <InputComponent
                  value={value}
                  onChange={onChange}
                  placeholder="Your pet’s name"
                  allowClear
                  error={errors[name]?.message}
                />
              )}
              name="name_pet"
            />
          </View>
          <View
            style={[
              globalStyles.center,
              globalStyles['w-100'],
              {
                gap: 16,
              },
            ]}>
            <TextComponent
              text="What’s your pet’s breed?"
              color={colors['grey-800']}
              font={fontFamilies['inter-medium']}
              size={16}
            />
            <Controller
              control={control}
              rules={{
                required: {value: true, message: 'This field cannot empty.'},
              }}
              render={({field: {onChange, value, name}}) => (
                <InputComponent
                  value={value}
                  onChange={onChange}
                  placeholder="Your pet’s breed"
                  allowClear
                  error={errors[name]?.message}
                />
              )}
              name="breed"
            />
          </View>
          <View
            style={[
              globalStyles.center,
              {
                gap: 16,
              },
            ]}>
            <TextComponent
              text="What’s your pet’s gender?"
              color={colors['grey-800']}
              font={fontFamilies['inter-medium']}
              size={16}
            />
            <RowComponent gap={32}>
              <TouchableOpacity
                onPress={() => {
                  setValue('gender', true);
                  setGender('male');
                }}
                style={[
                  globalStyles.center,
                  {
                    borderWidth: 1,
                    width: 100,
                    paddingVertical: 8,
                    borderColor: colors['blue-500'],
                    borderRadius: 14,
                    backgroundColor:
                      gender === 'male' ? colors['blue-500'] : 'transparent',
                  },
                ]}>
                <TextComponent
                  text="Male"
                  size={14}
                  color={
                    gender === 'male'
                      ? colors['background-white']
                      : colors['blue-500']
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setValue('gender', false);
                  setGender('female');
                }}
                style={[
                  globalStyles.center,
                  {
                    borderWidth: 1,
                    width: 100,
                    paddingVertical: 8,
                    borderColor: colors['red-500'],
                    borderRadius: 14,
                    backgroundColor:
                      gender === 'female' ? colors['red-500'] : 'transparent',
                  },
                ]}>
                <TextComponent
                  text="Female"
                  size={14}
                  color={
                    gender === 'female'
                      ? colors['background-white']
                      : colors['red-500']
                  }
                />
              </TouchableOpacity>
            </RowComponent>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Name;
