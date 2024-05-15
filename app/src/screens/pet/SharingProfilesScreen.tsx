/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, Image, FlatList} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {HeaderTitle, RowComponent, TextComponent} from '../../components';
import {BackIcon, FemaleIcon, MaleIcon} from '../../assets/icons';
import {NavigationProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {shadowStyle, shadowStyle2} from '../../styles/boxShadow';
import {colors} from '../../constants/colors';

interface IProps {
  navigation: NavigationProp<MainStackParamList, 'PetInformationScreen'>;
}

const SharingProfilesScreen = ({navigation}: IProps) => {
  const {current} = useSelector((state: RootState) => state.user);
  return (
    <View
      style={[
        globalStyles.container,
        {
          backgroundColor: colors.lightBackground,
        },
      ]}>
      <HeaderTitle
        text="Sharing profiles"
        leftButton={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              globalStyles.center,
              {
                width: 38,
                height: 38,
              },
            ]}>
            <BackIcon />
          </TouchableOpacity>
        }
        rightButton={
          <View
            style={{
              width: 38,
              height: 38,
            }}
          />
        }
      />
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 12,
        }}>
        <FlatList
          style={{
            borderTopWidth: 1,
            borderColor: colors['grey-150'],
          }}
          showsVerticalScrollIndicator={false}
          data={current?.petData}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PetInformationScreen', {
                  petId: item.id,
                })
              }
              style={[
                shadowStyle,
                shadowStyle2,
                {
                  marginVertical: 10,
                  marginHorizontal: 12,
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  backgroundColor: colors['background-white'],
                  borderRadius: 14,
                },
              ]}>
              <RowComponent gap={10}>
                <Image
                  resizeMode="cover"
                  source={{uri: item.photo ?? ''}}
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 100,
                  }}
                />
                <View style={{gap: 2, flex: 1}}>
                  <TextComponent
                    text={item.name_pet ?? ''}
                    title
                    size={16}
                    color={colors['grey-800']}
                  />
                  <TextComponent
                    text={`${'Dog'} | ${item.breed}`}
                    size={14}
                    color={colors['grey-600']}
                  />
                </View>
                <View
                  style={[
                    globalStyles.center,
                    {
                      width: 40,
                      height: 40,
                      backgroundColor: item.gender
                        ? 'rgba(209, 230, 255, 0.50)'
                        : 'rgba(255, 225, 242, 0.50)',
                      borderRadius: 40,
                    },
                  ]}>
                  {item.gender ? <MaleIcon /> : <FemaleIcon />}
                </View>
              </RowComponent>
            </TouchableOpacity>
          )}
        />
        <View
          style={{
            paddingBottom: 10,
            paddingHorizontal: 12,
          }}>
          <TextComponent
            color={colors['grey-500']}
            size={13}
            align="center"
            text="Generate a QR code and invite link for each pet and easily syncronise data with other users"
          />
        </View>
      </View>
    </View>
  );
};

export default SharingProfilesScreen;
