/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React, {useEffect} from 'react';
import {globalStyles} from '../../../styles/globalStyles';
import ImagePet from './ImagePet';
import {Props} from '../constants/interface';
import {InputComponent, TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';
import {fontFamilies} from '../../../constants/fontFamilies';
import {Controller} from 'react-hook-form';
import {NUMBER_REGEX} from '../../../constants/regex';

const Weight = ({
  getValues,
  control,
  errors,
  watch,
  setstatusButton,
  nameStep,
}: Props) => {
  const values = getValues();

  useEffect(() => {
    if (nameStep === 'Weight') {
      if (values.weight) {
        setstatusButton('primary');
      } else {
        setstatusButton('disabled');
      }
    }
  }, [nameStep, setstatusButton, values.weight]);

  useEffect(() => {
    const subscription = watch((value, {name}) => {
      if (name === 'weight') {
        if (value.weight) {
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
      <ImagePet photo={values.photo} size="small" />
      <View style={[globalStyles.center, {gap: 4}]}>
        <TextComponent
          title
          text="What’s your pet’s weight?"
          color={colors['grey-800']}
          font={fontFamilies['inter-medium']}
        />
        <TextComponent
          align="center"
          text="Automatic selection based on your pets breed. Adjust according to reality"
          color={colors['grey-700']}
        />
      </View>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'This field cannot empty.'},
          pattern: {
            value: NUMBER_REGEX,
            message: 'Not a valid number',
          },
        }}
        render={({field: {onChange, value, name}}) => (
          <InputComponent
            value={value}
            onChange={onChange}
            placeholder="Your pet’s weight (kg)"
            allowClear
            error={errors[name]?.message}
            type="numeric"
          />
        )}
        name="weight"
      />
    </View>
  );
};

export default Weight;
