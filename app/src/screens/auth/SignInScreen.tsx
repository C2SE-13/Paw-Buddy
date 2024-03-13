/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  InputComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import SpaceComponent from '../../components/common/SpaceComponent';
import {globalStyles} from '../../styles/globalStyles';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';

const SignInScreen = () => {
  const [data, setData] = useState<any>({
    email: '',
    password: '',
  });

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
        <InputComponent
          value={data.email}
          onChange={val => setData((prev: any) => ({...prev, email: val}))}
          placeholder="Email"
          allowClear
        />
        <InputComponent
          value={data.password}
          onChange={val => setData((prev: any) => ({...prev, password: val}))}
          placeholder="Password"
          allowClear
          isPassword
        />
        <View style={{alignItems: 'flex-end'}}>
          <TextComponent
            text="Forgot Password?"
            color={colors['primary-100']}
          />
        </View>
      </View>
      <SpaceComponent height={32} />
      <ButtonComponent text="Login" type="primary" size={'large'} />
      <SpaceComponent height={46} />
      <View style={{paddingHorizontal: 15}}>
        <RowComponent>
          <TextComponent text="By logging, you agree to our " />
          <TextComponent
            text="Terms & Conditions "
            color={colors['text-100']}
            font={fontFamilies['inter-semibold']}
          />
          <TextComponent text="and " />
          <TextComponent
            text="ParivacyPolicy."
            color={colors['text-100']}
            font={fontFamilies['inter-semibold']}
          />
        </RowComponent>
        <SpaceComponent height={24} />
        <RowComponent>
          <TextComponent
            color={colors['text-100']}
            text="Already have an account yet? "
            size={13}
          />
          <TextComponent
            font={fontFamilies['inter-semibold']}
            color={colors['primary-100']}
            text="Sign Up"
            size={13}
          />
        </RowComponent>
      </View>
    </View>
  );
};

export default SignInScreen;
