/* eslint-disable react-native/no-inline-styles */
import {ScrollView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Props} from '../constants/interface';
import {globalStyles} from '../../../styles/globalStyles';
import ImagePet from './ImagePet';
import {Controller} from 'react-hook-form';
import {InputComponent, TextComponent} from '../../../components';
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

  useEffect(() => {
    if (nameStep === 'Name') {
      setImageLocal(values.photo);

      if (values.breed && values.name_pet && typeof values.photo !== 'number') {
        setstatusButton('primary');
      } else {
        setstatusButton('disabled');
      }
    }
  }, [nameStep, setstatusButton, values.breed, values.name_pet, values.photo]);

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
        </View>
      </View>
    </ScrollView>
  );
};

export default Name;
