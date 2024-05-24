/* eslint-disable react-native/no-inline-styles */
import {View, Image} from 'react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import {RowComponent, TextComponent} from '..';
import withBaseComponent from '../../hocs/withBaseComponent';
import {TypedUseSelectorHook} from 'react-redux';
import {RootState} from '../../redux/store';
import {colors} from '../../constants/colors';

interface Props {
  children?: ReactNode;
  useSelector: TypedUseSelectorHook<RootState>;
}

interface User {
  avatar: string | null;
  name: string | null;
  id: number;
}

const HeaderProfile = (props: Props) => {
  const {children, useSelector} = props;
  const {current} = useSelector(state => state.user);
  const [dataUser, setDataUser] = useState<User>({
    avatar: null,
    name: '',
    id: 0,
  });

  useEffect(() => {
    current
      ? setDataUser({
          avatar: current.avatar,
          name: current.fullName,
          id: current.id,
        })
      : setDataUser({
          avatar: null,
          name: '',
          id: 0,
        });
  }, [current]);

  const avatarUser = dataUser.avatar
    ? {uri: dataUser.avatar}
    : require('../../assets/imgs/Default.png');

  return (
    <RowComponent
      justify="space-between"
      styles={[
        {
          height: 88,
          paddingVertical: 24,
          borderBottomWidth: 1,
          borderColor: colors['grey-200'],
        },
      ]}>
      <RowComponent justify="flex-start" gap={12} styles={{flex: 1}}>
        <Image
          source={avatarUser}
          style={{width: 42, height: 42, objectFit: 'cover', borderRadius: 52}}
        />
        <View>
          <TextComponent text="Hello," size={14} />
          <TextComponent text={dataUser.name ?? ''} title size={16} />
        </View>
      </RowComponent>
      {children && children}
    </RowComponent>
  );
};

export default withBaseComponent(HeaderProfile);
