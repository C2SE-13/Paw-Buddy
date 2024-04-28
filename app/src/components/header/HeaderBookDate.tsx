/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import RowComponent from '../common/RowComponent';
import {useNavigation} from '@react-navigation/native';
import {BackIcon} from '../../assets/icons';
import TextComponent from '../text/TextComponent';
import {colors} from '../../constants/colors';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {fontFamilies} from '../../constants/fontFamilies';

interface Props {
  title: string;
  subTitle?: string;
}

const HeaderBookDate = ({title, subTitle}: Props) => {
  const navigation = useNavigation();
  const {petActive} = useSelector((state: RootState) => state.user);
  return (
    <View
      style={{
        paddingHorizontal: 24,
      }}>
      <RowComponent
        gap={8}
        styles={{
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderColor: colors['grey-150'],
        }}>
        <RowComponent styles={{flex: 1}} gap={8} justify="flex-start">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <TextComponent text="|" color={colors['grey-150']} />
          {subTitle ? (
            <View style={{flex: 1}}>
              <TextComponent
                text={subTitle}
                color={colors['grey-600']}
                size={14}
              />
              <TextComponent
                title
                text={title}
                color={colors['grey-800']}
                size={16}
              />
            </View>
          ) : (
            <TextComponent
              title
              text={title}
              flex={1}
              color={colors['grey-800']}
              size={16}
            />
          )}
        </RowComponent>
        <RowComponent
          gap={4}
          styles={{
            backgroundColor: colors['grey-150'],
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 10,
          }}>
          <Image
            resizeMode="cover"
            source={
              petActive
                ? {uri: petActive?.photo}
                : require('../../assets/imgs/EmptySpaceIllustrations.png')
            }
            style={{
              width: 20,
              height: 20,
              borderRadius: 100,
            }}
          />
          <TextComponent
            text={petActive?.name_pet ?? ''}
            color={colors['grey-800']}
            size={14}
            font={fontFamilies['inter-medium']}
          />
        </RowComponent>
      </RowComponent>
    </View>
  );
};

export default HeaderBookDate;
