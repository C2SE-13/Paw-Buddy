/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, Image, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {CircleComponent, HeaderTitle} from '../../components';
import {BackIcon} from '../../assets/icons';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {useSelector} from 'react-redux';
import {IPet} from '../../utils/interface';
import {RootState} from '../../redux/store';
import {colors} from '../../constants/colors';
import {shadowStyle, shadowStyle2} from '../../styles/boxShadow';
import QRCode from 'react-native-qrcode-svg';
import moment from 'moment';

interface IProps {
  navigation: NavigationProp<MainStackParamList, 'QRScreen'>;
  route: RouteProp<MainStackParamList, 'QRScreen'>;
}

const QRScreen = ({navigation, route}: IProps) => {
  const {petId} = route.params;
  const {current} = useSelector((state: RootState) => state.user);
  const [data, setData] = useState<IPet | null>(null);

  const getPetProfile = (id: number) => {
    const petData = current?.petData.find(el => el.id === id) ?? null;

    setData(petData);
  };

  useEffect(() => {
    getPetProfile(petId);
  }, [petId]);

  return (
    <View style={[globalStyles.container]}>
      <HeaderTitle
        text="QR Scan"
        subText={data?.name_pet ?? ''}
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
        style={[
          globalStyles.center,
          {
            flex: 1,
            borderTopWidth: 1,
            marginHorizontal: 24,
            marginVertical: 12,
            borderColor: colors['grey-150'],
          },
        ]}>
        <View
          style={[
            shadowStyle,
            shadowStyle2,
            {
              width: Dimensions.get('screen').width - 48,
              height: 419,
              position: 'relative',
              backgroundColor: colors['background-white'],
              borderRadius: 14,
            },
          ]}>
          <CircleComponent
            size={100}
            styles={{
              ...shadowStyle,
              ...shadowStyle2,
              backgroundColor: colors['background-white'],
              position: 'absolute',
              top: -50,
              left: (Dimensions.get('screen').width - 48) / 3,
            }}>
            <View
              style={{
                width: 77,
                height: 77,
                borderRadius: 100,
              }}
            />
          </CircleComponent>
          <View
            style={[
              globalStyles.center,
              {
                width: Dimensions.get('screen').width - 48,
                height: 419,
                backgroundColor: colors['background-white'],
                borderRadius: 14,
              },
            ]}>
            <QRCode
              value={`Meet ${data?.name_pet}, a ${data?.breed} owned by ${current?.fullName}. `}
              logoSize={240}
              logoBackgroundColor="transparent"
            />
          </View>
          {data && (
            <Image
              resizeMode="cover"
              source={{uri: data.photo ?? ''}}
              style={{
                width: 77,
                height: 77,
                borderRadius: 100,
                position: 'absolute',
                top: -37,
                left: Dimensions.get('screen').width / 3.1,
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default QRScreen;
