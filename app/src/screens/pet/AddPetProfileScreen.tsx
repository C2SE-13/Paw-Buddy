/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, View, Dimensions, Alert} from 'react-native';
import React, {Fragment, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  ButtonComponent,
  HeaderTitle,
  RowComponent,
  TextComponent,
} from '../../components';
import {BackIcon, CloseIcon} from '../../assets/icons';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import Swiper from 'react-native-swiper';
import Breed from './informationPet/Breed';
import Name from './informationPet/Name';
import Size from './informationPet/Size';
import Weight from './informationPet/Weight';
import Dates from './informationPet/Dates';
import Caretakes from './informationPet/Caretakes';
import {SubmitHandler, useForm} from 'react-hook-form';
import * as Progress from 'react-native-progress';
import {apiCreatePet} from '../../apis/pet';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import {AppDispatch} from '../../redux/store';
import withBaseComponent from '../../hocs/withBaseComponent';
import {getCurrent} from '../../redux/user/asyncActions';

interface Props {
  navigation: any;
  dispatch: AppDispatch;
}

interface Steps {
  step: number;
  maxStep: number;
}

export interface FormData {
  name_pet: string;
  species: string;
  breed: string;
  gender: boolean;
  date_of_birth: string;
  weight: string;
  photo: string | {} | undefined;
  size: string;
  adoption: string;
}

const constants = [
  {
    name: 'Breed',
    children: Breed,
  },
  {
    name: 'Name',
    children: Name,
  },
  {
    name: 'Size',
    children: Size,
  },
  {
    name: 'Weight',
    children: Weight,
  },
  {
    name: 'Important Dates',
    children: Dates,
  },
  {
    name: 'Caretakes',
    children: Caretakes,
  },
];

const AddPetProfileScreen = ({navigation, dispatch}: Props) => {
  const {
    control,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();
  const [stepCurrent, setStepCurrent] = useState(0);
  const [nameStep, setNameStep] = useState(constants[0].name);

  const [statusButton, setstatusButton] = useState<
    'disabled' | 'primary' | 'secondary'
  >('disabled');

  const handleNext = () => {
    const nextIndex = stepCurrent + 1;
    if (nextIndex < constants.length) {
      setStepCurrent(prev => prev + 1);
      setNameStep(constants[nextIndex].name);
      setstatusButton('disabled');
    }
  };

  const handleBack = () => {
    setStepCurrent(prev => prev - 1);
    setstatusButton('primary');
  };

  const onSubmit: SubmitHandler<FormData> = async data => {
    Alert.alert('Are you sure?', `My name pet is ${data.name_pet}`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Create',
        onPress: async () => {
          const formData: any = new FormData();
          for (let [key, value] of Object.entries(data)) {
            formData.append(key, value);
          }

          const response: any = await apiCreatePet(formData);

          if (response.success) {
            Toast.show(
              toastConfig({textMain: response.message, visibilityTime: 2000}),
            );
            dispatch(getCurrent());
            navigation.navigate('ProfileScreen');
          } else {
            Toast.show(
              toastConfig({textMain: response.message, type: 'error'}),
            );
          }
        },
      },
    ]);
  };

  const iconLeft =
    stepCurrent > 0 ? (
      <TouchableOpacity onPress={handleBack}>
        <BackIcon />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <CloseIcon />
      </TouchableOpacity>
    );

  return (
    <View style={[globalStyles.container]}>
      <View
        style={[
          {
            width: Dimensions.get('screen').width,
            zIndex: 10,
            backgroundColor: colors.lightBackground,
            borderBottomWidth: 1,
            borderColor: colors['grey-200'],
            paddingBottom: 24,
          },
        ]}>
        <HeaderTitle
          text="Add Pet Profile"
          subText={nameStep}
          leftButton={iconLeft}
          rightButton={<Step step={stepCurrent} maxStep={constants.length} />}
        />
        <View
          style={{
            paddingHorizontal: 24,
            paddingTop: 15,
          }}>
          <Progress.Bar
            progress={(stepCurrent + 1) / constants.length}
            width={Dimensions.get('screen').width - 48}
            color={colors['yellow-500']}
            unfilledColor={colors['grey-150']}
            borderWidth={0}
          />
        </View>
      </View>
      <Swiper
        style={{}}
        onIndexChanged={step => setStepCurrent(step)}
        index={stepCurrent}
        showsPagination={false}
        scrollEnabled={false}
        loop={false}>
        {constants.map((item, index) => {
          return (
            <Fragment key={index}>
              <item.children
                control={control}
                errors={errors}
                setValue={setValue}
                setstatusButton={setstatusButton}
                getValues={getValues}
                watch={watch}
                nameStep={nameStep}
              />
            </Fragment>
          );
        })}
      </Swiper>
      <View
        style={[
          globalStyles.center,
          {
            width: Dimensions.get('screen').width,
            padding: 24,
            borderTopWidth: 1,
            borderColor: colors['grey-200'],
          },
        ]}>
        {stepCurrent + 1 === constants.length ? (
          <ButtonComponent
            size="large"
            type="primary"
            text="Finish"
            onPress={handleSubmit(onSubmit)}
          />
        ) : (
          <ButtonComponent
            size="large"
            type={statusButton}
            text="Continue"
            onPress={handleNext}
          />
        )}
      </View>
    </View>
  );
};

const Step = ({step, maxStep}: Steps) => {
  return (
    <View>
      <TextComponent text="Step" size={12} color={colors['grey-600']} />
      <RowComponent>
        <TextComponent
          text={`${step + 1}`}
          size={12}
          font={fontFamilies['inter-semibold']}
          color={colors['grey-800']}
        />
        <TextComponent
          text={` / ${maxStep}`}
          size={12}
          color={colors['grey-400']}
        />
      </RowComponent>
    </View>
  );
};

export default withBaseComponent(AddPetProfileScreen);
