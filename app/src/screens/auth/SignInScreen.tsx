/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React, {useState} from 'react';
import {ButtonComponent, InputComponent} from '../../components';
import SpaceComponent from '../../components/common/SpaceComponent';

const SignInScreen = () => {
  const [data, setData] = useState<any>({
    email: '',
    password: '',
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
      }}>
      <Image
        source={require('../../assets/imgs/Logo.png')}
        style={{
          width: 161,
          height: 126,
          objectFit: 'cover',
        }}
      />

      <SpaceComponent height={61} />

      <InputComponent
        value={data.email}
        onChange={val => setData((prev: any) => ({...prev, email: val}))}
        placeholder="Email"
        allowClear
      />

      <SpaceComponent height={16} />

      <InputComponent
        value={data.password}
        onChange={val => setData((prev: any) => ({...prev, password: val}))}
        placeholder="Password"
        allowClear
        isPassword
      />

      <SpaceComponent height={16} />

      <ButtonComponent text="text" type="primary" size={'large'} />
    </View>
  );
};

export default SignInScreen;
