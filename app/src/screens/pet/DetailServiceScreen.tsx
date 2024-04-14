/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {RouteProp} from '@react-navigation/native';
import {apiGetPetService} from '../../apis';
import {IPetServies} from '../../utils/interface';
import {globalStyles} from '../../styles/globalStyles';
import {
  ButtonComponent,
  HeaderTitle,
  RowComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {LeftIcon} from '../../assets/icons';
import {shadowStyle, shadowStyle2} from '../../styles/boxShadow';
import HeaderCategory from './components/HeaderCategory';
import {weeks} from './constants/renderCalendar';

interface Props {
  navigation: NativeStackScreenProps<MainStackParamList, 'DetailServiceScreen'>;
  route: RouteProp<MainStackParamList, 'DetailServiceScreen'>;
}

const DetailServiceScreen = ({route, navigation}: Props) => {
  const [detail, setDetail] = useState<IPetServies[]>([]);
  const {id, name} = route.params;
  const [showContact, setShowContact] = useState(true);
  const [showLocation, setShowLocation] = useState(true);
  const [availability, setAvailability] = useState(true);
  const [showServices, setShowServices] = useState(true);
  const [chosenServices, setchosenServices] = useState<IPetServies[]>([]);

  useEffect(() => {
    const getItemDetail = async (id: number) => {
      const reponse: any = await apiGetPetService({category_id: id});
      if (reponse.success) {
        setDetail(reponse.data);
      }
    };

    getItemDetail(id);
  }, [id]);

  const handleAddService = (item: IPetServies) => {
    const check = chosenServices.includes(item);
    if (check) {
      const newArr = chosenServices.filter(i => i !== item);
      setchosenServices(newArr);
    } else {
      setchosenServices(prev => [...prev, item]);
    }
  };

  return (
    <View style={[globalStyles.container, {position: 'relative'}]}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={
            detail.length > 0
              ? {uri: detail[0].photo}
              : require('../../assets/imgs/Default.png')
          }
          resizeMode="cover"
          style={[globalStyles['w-100'], {height: 357, position: 'relative'}]}>
          <View
            style={[
              shadowStyle,
              shadowStyle2,
              {
                position: 'absolute',
                borderRadius: 14,
                paddingVertical: 16,
                paddingHorizontal: 18,
                backgroundColor: colors['background-white'],
                right: 24,
                left: 24,
                bottom: -40,
              },
            ]}>
            <TextComponent
              text="Paw Buddy"
              title
              color={colors['grey-800']}
              size={20}
            />
            <TextComponent text={name} size={14} color="#808B9A" />
          </View>
        </ImageBackground>
        <View style={{paddingTop: 40, paddingHorizontal: 24}}>
          <View
            style={{
              paddingVertical: 20,
              borderBottomWidth: 1,
              borderColor: colors['grey-150'],
            }}>
            <RowComponent>
              <RowComponent styles={{flex: 1}} justify="flex-start" gap={10}>
                <TextComponent
                  text="1,2"
                  font={fontFamilies['inter-semibold']}
                  color={colors['grey-700']}
                  size={16}
                />
              </RowComponent>
              <TextComponent
                text="230 reviews"
                color={colors['grey-400']}
                size={14}
              />
            </RowComponent>
          </View>
          <View style={stylesLocal.section}>
            <HeaderCategory
              text="Contact"
              onPress={() => setShowContact(!showContact)}
              isShow={showContact}
            />
            {showContact && (
              <View style={{gap: 16}}>
                <View style={{gap: 4}}>
                  <TextComponent
                    text="Phone:"
                    color={colors['grey-700']}
                    size={14}
                  />
                  <TextComponent
                    text="079 1234 7777"
                    color={colors['grey-800']}
                    size={14}
                  />
                </View>
                <View style={{gap: 4}}>
                  <TextComponent
                    text="Phone:"
                    color={colors['grey-700']}
                    size={14}
                  />
                  <TextComponent
                    text="contactshinnyfur@gmail.com"
                    color={colors['grey-800']}
                    size={14}
                  />
                </View>
              </View>
            )}
          </View>
          <View style={stylesLocal.section}>
            <HeaderCategory
              text="Location"
              onPress={() => setShowLocation(!showLocation)}
              isShow={showLocation}
            />
            {showLocation && (
              <View style={{gap: 8}}>
                <RowComponent justify="flex-start" gap={4}>
                  <TextComponent
                    text="Street:"
                    size={14}
                    color={colors['grey-700']}
                  />
                  <TextComponent
                    text="70 North Street"
                    size={14}
                    color={colors['grey-800']}
                  />
                </RowComponent>
                <RowComponent justify="flex-start" gap={4}>
                  <TextComponent
                    text="City:"
                    size={14}
                    color={colors['grey-700']}
                  />
                  <TextComponent
                    text="London"
                    size={14}
                    color={colors['grey-800']}
                  />
                </RowComponent>
                <RowComponent justify="flex-start" gap={4}>
                  <TextComponent
                    text="Country:"
                    size={14}
                    color={colors['grey-700']}
                  />
                  <TextComponent
                    text="United Kingdom"
                    size={14}
                    color={colors['grey-800']}
                  />
                </RowComponent>
              </View>
            )}
          </View>
          <View style={stylesLocal.section}>
            <HeaderCategory
              text="Availability"
              onPress={() => setAvailability(!availability)}
              isShow={availability}
            />
            {availability && (
              <View style={{gap: 16}}>
                <RowComponent gap={8} justify="space-between">
                  {weeks.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        globalStyles.center,
                        {
                          width: 40,
                          height: 32,
                          borderRadius: 10,
                          backgroundColor:
                            item === 'Sun' ? 'transparent' : '#D1E6FF80',
                          borderWidth: 1,
                          borderColor:
                            item === 'Sun'
                              ? colors['grey-150']
                              : colors['blue-100'],
                        },
                      ]}>
                      <TextComponent
                        text={item.charAt(0)}
                        size={16}
                        font={fontFamilies['inter-semibold']}
                        color={
                          item === 'Sun'
                            ? colors['grey-500']
                            : colors['blue-500']
                        }
                      />
                    </TouchableOpacity>
                  ))}
                </RowComponent>
                <RowComponent justify="flex-start" gap={4}>
                  <TextComponent
                    text="Hours:"
                    size={14}
                    color={colors['grey-700']}
                  />
                  <TextComponent
                    text="10:00 - 20:00"
                    font={fontFamilies['inter-medium']}
                    size={14}
                    color={colors['grey-800']}
                  />
                </RowComponent>
              </View>
            )}
          </View>
          <View style={stylesLocal.section}>
            <HeaderCategory
              text="Services"
              onPress={() => setShowServices(!showServices)}
              isShow={showServices}
            />
            {showServices && (
              <View style={{gap: 16}}>
                {detail.map(item => (
                  <TouchableOpacity
                    onPress={() => handleAddService(item)}
                    key={item.id}
                    style={[
                      shadowStyle,
                      shadowStyle2,
                      {
                        padding: 16,
                        backgroundColor: chosenServices.some(
                          i => i.id === item.id,
                        )
                          ? colors['fill-green']
                          : colors['background-white'],
                        borderRadius: 14,
                      },
                    ]}>
                    <RowComponent>
                      <TextComponent
                        title
                        text={item.name_service ?? ''}
                        flex={1}
                        color={
                          chosenServices.some(i => i.id === item.id)
                            ? colors['background-white']
                            : colors['grey-800']
                        }
                        size={14}
                      />
                      <RowComponent alignItems="flex-end">
                        <TextComponent
                          text="$"
                          size={12}
                          styles={{marginBottom: 3.5}}
                          color={
                            chosenServices.some(i => i.id === item.id)
                              ? colors['background-white']
                              : colors['grey-900']
                          }
                        />
                        <TextComponent
                          title
                          text={item.price.toString() ?? ''}
                          size={20}
                          color={
                            chosenServices.some(i => i.id === item.id)
                              ? colors['background-white']
                              : colors['grey-900']
                          }
                        />
                      </RowComponent>
                    </RowComponent>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <HeaderTitle
        styles={{
          position: 'absolute',
        }}
        text="View Contact"
        color={colors['background-white']}
        font={fontFamilies['inter-semibold']}
        size={16}
        rightButton={
          <View
            style={{
              width: 40,
              height: 40,
            }}
          />
        }
        leftButton={
          <TouchableOpacity
            style={[
              globalStyles.center,
              {
                width: 40,
                height: 40,
              },
            ]}
            onPress={() => navigation.goBack()}>
            <LeftIcon />
          </TouchableOpacity>
        }
      />
      <View style={{padding: 24}}>
        <ButtonComponent
          text="Book a date"
          type={chosenServices.length > 0 ? 'primary' : 'disabled'}
          onPress={() => {}}
          size="large"
        />
      </View>
    </View>
  );
};

const stylesLocal = StyleSheet.create({
  section: {
    paddingVertical: 22,
    gap: 16,
    borderBottomWidth: 1,
    borderColor: colors['grey-150'],
  },
});

export default DetailServiceScreen;
