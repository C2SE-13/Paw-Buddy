/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React, {useEffect} from 'react';
import {Props} from '../constants/interface';
import {globalStyles} from '../../../styles/globalStyles';
import ImagePet from './ImagePet';
import {Controller} from 'react-hook-form';
import {InputComponent, TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';

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

  useEffect(() => {
    if (nameStep === 'Name') {
      if (values.breed && values.name_pet) {
        setstatusButton('primary');
      } else {
        setstatusButton('disabled');
      }
    }
  }, [nameStep, setstatusButton, values.breed, values.name_pet]);

  useEffect(() => {
    const subscription = watch((value, {name}) => {
      if (name === 'breed' || name === 'name_pet') {
        if (value?.breed && value?.name_pet) {
          setstatusButton('primary');
        } else {
          setstatusButton('disabled');
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [setstatusButton, watch]);

  return (
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
        photo={values.photo}
        iconChange
        size="large"
        onChangeImage={() => {}}
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
      </View>
    </View>
  );
};

export default Name;
