/* eslint-disable react-native/no-inline-styles */
import {Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../../styles/globalStyles';
import ImagePet from './ImagePet';
import {Props} from '../constants/interface';
import {RowComponent, TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';
import {shadowStyle, shadowStyle2} from '../../../styles/boxShadow';
import {RootState} from '../../../redux/store';
import {useSelector} from 'react-redux';

const Caretakes = ({getValues}: Props) => {
  const {current} = useSelector((state: RootState) => state.user);
  const values = getValues();
  const [dataUser, setDataUser] = useState({
    email: '',
    avatar: '',
    fullName: '',
  });

  useEffect(() => {
    current &&
      setDataUser({
        email: current.email || '',
        avatar: current.avatar || '',
        fullName: current.fullName || '',
      });
  }, [current]);

  const avatarUser = dataUser.avatar
    ? {uri: dataUser.avatar}
    : require('../../../assets/imgs/Default.png');

  return (
    <View
      style={[
        globalStyles.container,
        {
          padding: 24,
          alignItems: 'center',
          gap: 24,
        },
      ]}>
      <ImagePet photo={values.photo} size="small" />
      <View
        style={[
          globalStyles['w-100'],
          {
            gap: 18,
          },
        ]}>
        <TextComponent
          title
          text="Added contacts"
          align="left"
          size={14}
          color={colors['grey-800']}
        />
        <RowComponent
          gap={10}
          styles={[
            shadowStyle,
            shadowStyle2,
            {
              paddingVertical: 13,
              paddingHorizontal: 16,
              backgroundColor: colors['background-white'],
              borderRadius: 14,
            },
          ]}>
          <Image
            source={avatarUser}
            style={{
              width: 54,
              height: 54,
              objectFit: 'cover',
            }}
          />
          <View style={{flex: 1}}>
            <TextComponent
              text={dataUser.fullName}
              color={colors['grey-800']}
              title
              size={14}
            />
            <TextComponent
              text={dataUser.email}
              size={14}
              color={colors['grey-600']}
            />
          </View>
        </RowComponent>
      </View>
    </View>
  );
};

export default Caretakes;
