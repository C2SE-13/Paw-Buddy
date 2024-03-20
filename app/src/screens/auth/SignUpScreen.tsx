/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
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
import {apiRegister} from '../../apis';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/user/userSlice';

interface IPageProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;
}

export interface FormData {
  email: string;
  password: string;
  fullName: string;
}

const SignUpScreen = ({navigation}: IPageProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<FormData>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormData> = async data => {
    const response: any = await apiRegister(data);
    if (response?.success) {
      dispatch(login({isLoggedIn: true, accessToken: response.accessToken}));
      reset();
    }
  };

  return (
    <View style={[globalStyles.container, globalStyles.center, {padding: 30}]}>
      <View style={{gap: 8}}>
        <TextComponent
          text="Create Account"
          title
          color={colors['primary-100']}
          font={fontFamilies['inter-bold']}
          size={34}
        />
        <TextComponent text="Sign up now and start exploring all that our app has to offer. We're excited to welcome you to our community!" />
      </View>
      <SpaceComponent height={30} />
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
        <Controller
          control={control}
          rules={{
            required: {value: true, message: 'This field cannot empty.'},
          }}
          render={({field: {onChange, value, name}}) => (
            <InputComponent
              value={value}
              onChange={onChange}
              placeholder="Full name"
              allowClear
              error={errors[name]?.message}
            />
          )}
          name="fullName"
        />
      </View>
      <SpaceComponent height={30} />
      <ButtonComponent
        onPress={handleSubmit(onSubmit)}
        text="Create Account"
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
            text="Already have an account? "
            size={13}
          />
          <LinkComponent
            textSize={13}
            textFont={fontFamilies['inter-semibold']}
            textColor={colors['primary-100']}
            type="text"
            text="Sign In here!"
            onPress={() => {
              reset();
              navigation.navigate('SignIn');
            }}
          />
        </RowComponent>
      </View>
    </View>
  );
};

export default SignUpScreen;
