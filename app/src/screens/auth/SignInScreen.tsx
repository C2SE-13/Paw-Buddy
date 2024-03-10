import {View, Text} from 'react-native';
import React from 'react';
import {textStyles} from '../../styles/textStyles';

const SignInScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={textStyles['bold-48']}>SignInScreen</Text>
      <Text>abc</Text>
    </View>
  );
};

export default SignInScreen;
