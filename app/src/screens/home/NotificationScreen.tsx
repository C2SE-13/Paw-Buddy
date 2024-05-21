/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  HeaderTitle,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ChevronBack} from '../../assets/icons';
import {NavigationProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {colors} from '../../constants/colors';
import moment from 'moment';
import {fontFamilies} from '../../constants/fontFamilies';
import {useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store';
import {apiUpdateNotification} from '../../apis';
import withBaseComponent from '../../hocs/withBaseComponent';
import {getNotification} from '../../redux/user/asyncActions';

interface IProps {
  navigation: NavigationProp<MainStackParamList>;
  dispatch: AppDispatch;
}

const NotificationScreen = ({navigation, dispatch}: IProps) => {
  const [data, setData] = useState<
    {content: string; createdAt: string; is_read: boolean}[]
  >([]);
  const [watched, setWatched] = useState({
    status: true,
    number: 0,
  });
  const {notificationData} = useSelector((state: RootState) => state.user);

  const updateNotification = async () => {
    if (notificationData.length > 0) {
      setData(notificationData);

      const check = notificationData.some(
        (item: any) => item.is_read === false,
      );

      if (check) {
        setWatched({
          status: false,
          number: notificationData.reduce(
            (accumulator: any, currentValue: any) =>
              currentValue.is_read === false ? accumulator + 1 : accumulator,
            0,
          ),
        });
      }
    }
  };

  useEffect(() => {
    dispatch(getNotification());
  }, []);

  useEffect(() => {
    updateNotification();
  }, [notificationData]);

  const handleBack = async () => {
    await apiUpdateNotification();
    navigation.goBack();
  };

  return (
    <View style={[globalStyles.container]}>
      <HeaderTitle
        text="Notification"
        leftButton={
          <TouchableOpacity
            onPress={handleBack}
            style={[
              globalStyles.center,
              {
                width: 40,
                height: 40,
                borderWidth: 1,
                borderColor: colors['grey-200'],
                borderRadius: 10,
              },
            ]}>
            <ChevronBack />
          </TouchableOpacity>
        }
        rightButton={
          watched.status ? (
            <View
              style={{
                width: 40,
                height: 40,
              }}
            />
          ) : (
            <View
              style={[
                globalStyles.center,
                {
                  width: 51,
                  paddingVertical: 7,
                  backgroundColor: colors['blue-500'],
                  borderRadius: 24,
                },
              ]}>
              <TextComponent
                text={`${watched.number.toString()} NEW`}
                color={colors['background-white']}
                size={10}
              />
            </View>
          )
        }
      />
      <SpaceComponent height={24} />
      <FlatList
        data={data}
        contentContainerStyle={{gap: 2}}
        renderItem={({item}) => (
          <RowComponent
            gap={8}
            styles={{
              paddingHorizontal: 24,
              height: 121,
              paddingTop: 16,
              paddingBottom: 24,
              backgroundColor: item.is_read
                ? 'transparent'
                : colors['secondary-text'],
            }}
            justify="space-between"
            alignItems="flex-start">
            <TextComponent
              text={item.content ?? ''}
              flex={1}
              title
              size={14}
              font={fontFamilies['inter-medium']}
            />
            <View style={[{gap: 20, alignItems: 'flex-end'}]}>
              <TextComponent text={moment(item.createdAt).fromNow()} />
              {!watched.status && (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 10000,
                    backgroundColor: colors['fill-red'],
                  }}
                />
              )}
            </View>
          </RowComponent>
        )}
      />
    </View>
  );
};

export default withBaseComponent(NotificationScreen);
