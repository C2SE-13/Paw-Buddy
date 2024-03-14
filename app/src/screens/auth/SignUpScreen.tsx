/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React, {useState} from 'react';
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
import {RootStackParamList} from '../../navigators/AuthNavigator';

interface IPageProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
}

const SignUpScreen = ({navigation}: IPageProps) => {
  const [data, setData] = useState<any>({
    email: '',
    password: '',
  });

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
      </View>
      <SpaceComponent height={32 + 36} />
      <ButtonComponent
        onPress={() => console.log('Sign Up')}
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
            onPress={() => navigation.navigate('SignIn')}
          />
        </RowComponent>
      </View>
    </View>
  );
};

export default SignUpScreen;
