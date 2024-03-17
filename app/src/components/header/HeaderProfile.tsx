/* eslint-disable react-native/no-inline-styles */
import {View, Image} from 'react-native';
import React, {ReactNode} from 'react';
import {RowComponent, TextComponent} from '..';

interface Props {
  children?: ReactNode;
}

const HeaderProfile = (props: Props) => {
  const {children} = props;
  return (
    <RowComponent
      justify="space-between"
      styles={{
        height: 88,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderColor: '#D9DFE6',
      }}>
      <RowComponent justify="flex-start" gap={12} styles={{flex: 1}}>
        <Image
          source={require('../../assets/imgs/Default.png')}
          style={{width: 42, height: 42, objectFit: 'cover'}}
        />
        <View>
          <TextComponent text="Hello," size={14} />
          <TextComponent text="Esther" title size={16} />
        </View>
      </RowComponent>
      {children && children}
    </RowComponent>
  );
};

export default HeaderProfile;
