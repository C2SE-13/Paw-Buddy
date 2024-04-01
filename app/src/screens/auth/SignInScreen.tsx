/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import {Switch, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ButtonComponent,
  InputComponent,
  LinkComponent,
  LoginWithComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import SpaceComponent from '../../components/common/SpaceComponent';
import {globalStyles} from '../../styles/globalStyles';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigators/AuthNavigator';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {EMAIL_REGEX} from '../../constants/regex';
import {apiLogin} from '../../apis';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/user/userSlice';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IPageProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'SignIn'>;
}

export interface FormData {
  email: string;
  password: string;
}

const SignInScreen = ({navigation}: IPageProps) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
    reset,
  } = useForm<FormData>();
  const [isRemember, setIsRemember] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storeData = async () => {
      try {
        const response = await AsyncStorage.getItem('dataUser');
        // console.log(response);
        if (response) {
          const jsonValue = JSON.parse(response);
          if (jsonValue.isRemember) {
            setValue('email', jsonValue.email);
            setValue('password', jsonValue.password);
            setIsRemember(jsonValue.isRemember);
          }
        }
      } catch (e) {
        // saving error
      }
    };
    storeData();
  }, [setValue]);

  const onSubmit: SubmitHandler<FormData> = async data => {
    setIsLoading(true);
    const response: any = await apiLogin(data);
    setIsLoading(false);
    if (response?.success) {
      if (isRemember) {
        AsyncStorage.setItem(
          'dataUser',
          JSON.stringify({
            isRemember,
            email: data.email,
            password: data.password,
          }),
        );
      } else {
        AsyncStorage.setItem(
          'dataUser',
          JSON.stringify({
            isRemember,
          }),
        );
      }
      dispatch(login({isLoggedIn: true, accessToken: response.accessToken}));
      reset();
      Toast.show(
        toastConfig({textMain: response.message, visibilityTime: 2000}),
      );
    } else
      Toast.show(
        toastConfig({
          type: 'error',
          textMain: response.message,
          visibilityTime: 2000,
        }),
      );
  };

  return (
    <View style={[globalStyles.container, globalStyles.center, {padding: 30}]}>
      <View style={{gap: 8}}>
        <TextComponent
          text="Welcome Back"
          title
          color={colors['primary-100']}
          font={fontFamilies['inter-bold']}
          size={34}
        />
        <TextComponent text="We're excited to have you back, can't wait to see what you've been up to since you last logged in." />
      </View>
      <SpaceComponent height={61} />
      <View style={{gap: 16}}>
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This field cannot empty.'},
            pattern: {
              value: EMAIL_REGEX,
              message: 'Not a valid email',
            },
          }}
          render={({field: {onChange, value, name}}) => (
            <InputComponent
              value={value}
              onChange={onChange}
              placeholder="Email"
              allowClear
              error={errors[name]?.message}
            />
          )}
          name="email"
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
              placeholder="Password"
              allowClear
              isPassword
              error={errors[name]?.message}
            />
          )}
          name="password"
        />
        <RowComponent justify="space-between">
          <RowComponent gap={9}>
            <Switch
              value={isRemember}
              onChange={() => setIsRemember(prev => !prev)}
              trackColor={{true: colors['primary-40']}}
              thumbColor={colors['primary-80']}
            />
            <LinkComponent
              textSize={12}
              textColor={colors['text-60']}
              type="text"
              text="Remember me"
              onPress={() => setIsRemember(prev => !prev)}
            />
          </RowComponent>
          <TextComponent
            text="Forgot Password?"
            color={colors['primary-100']}
          />
        </RowComponent>
      </View>
      <SpaceComponent height={32} />
      <ButtonComponent
        onPress={handleSubmit(onSubmit)}
        text="Login"
        type="primary"
        size={'large'}
      />
      <SpaceComponent height={46} />
      <LoginWithComponent />
      <SpaceComponent height={32} />
      <View style={{paddingHorizontal: 15}}>
        <RowComponent>
          <TextComponent text="By logging, you agree to our " />
          <LinkComponent
            textSize={12}
            textFont={fontFamilies['inter-semibold']}
            textColor={colors['text-100']}
            type="text"
            text="Terms & Conditions "
            onPress={() => console.log('Terms & Conditions')}
          />
          <TextComponent text="and " />
          <LinkComponent
            textSize={12}
            textFont={fontFamilies['inter-semibold']}
            textColor={colors['text-100']}
            type="text"
            text="ParivacyPolicy."
            onPress={() => console.log('ParivacyPolicy')}
          />
        </RowComponent>
        <SpaceComponent height={24} />
        <RowComponent>
          <TextComponent
            color={colors['text-100']}
            text="Already have an account yet? "
            size={13}
          />
          <LinkComponent
            textSize={13}
            textFont={fontFamilies['inter-semibold']}
            textColor={colors['primary-100']}
            type="text"
            text="Sign Up"
            onPress={() => {
              reset();
              navigation.navigate('SignUp');
            }}
          />
        </RowComponent>
      </View>
    </View>
  );
};

export default SignInScreen;
