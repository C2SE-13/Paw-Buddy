/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {colors} from '../../constants/colors';
import {shadowStyle, shadowStyle2} from '../../styles/boxShadow';
import {
  HeaderTitle,
  InputComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import {ChevronBack} from '../../assets/icons';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';
import {apiGetDetailMessages, apiSendMessage} from '../../apis';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import moment from 'moment';

interface Props {
  navigation: NavigationProp<MainStackParamList, any>;
  route: RouteProp<MainStackParamList, 'ChatUserScreen'>;
}

interface IMessageChat {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
}

const ChatUserScreen = ({navigation, route}: Props) => {
  const {name, userId} = route.params;
  const [sendMess, setsendMess] = useState('');
  const [data, setData] = useState<IMessageChat[]>([]);
  const {current} = useSelector((state: RootState) => state.user);
  const {usersOnline, socket} = useSelector((state: RootState) => state.app);

  const getMessageChat = async (id: string) => {
    const response: any = await apiGetDetailMessages(id);
    setData(response.reverse());
  };

  useEffect(() => {
    getMessageChat(userId);
  }, [userId]);

  const handleSendMess = async (id: string) => {
    if (sendMess.length < 1) {
      return Toast.show(
        toastConfig({
          textMain: 'Please enter content!',
          visibilityTime: 2000,
          type: 'error',
        }),
      );
    }

    const response: any = await apiSendMessage(id, {
      message: sendMess,
    });
    if (response.receiverId || response.senderId) {
      setsendMess('');
      getMessageChat(userId);
    } else {
      Toast.show(
        toastConfig({
          textMain: 'An error occurred, please try again!',
          visibilityTime: 2000,
          type: 'error',
        }),
      );
      getMessageChat(userId);
    }
  };

  useEffect(() => {
    if (socket !== null) {
      socket?.on('newMessage', newMessage => {
        console.log(newMessage);
        if (newMessage) {
          getMessageChat(userId);
        }
      });
    }
  }, [socket, userId]);

  return (
    <View style={[globalStyles.container]}>
      <HeaderTitle
        subText={`${
          usersOnline.some(el => el === userId) ? 'Online' : ' Offline'
        }`}
        subColor={
          usersOnline.some(el => el === userId)
            ? colors['green-500']
            : colors['grey-600']
        }
        text={name}
        color={colors['text-100']}
        styles={[
          shadowStyle,
          shadowStyle2,
          {
            backgroundColor: colors['background-white'],
            borderBottomWidth: 1,
            paddingBottom: 8,
            borderColor: colors['grey-150'],
          },
        ]}
        leftButton={
          <TouchableOpacity
            style={[
              globalStyles.center,
              {
                width: 40,
                height: 40,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors['text-30'],
              },
            ]}
            onPress={() => navigation.goBack()}>
            <ChevronBack />
          </TouchableOpacity>
        }
        rightButton={
          <View
            style={{
              width: 40,
              height: 40,
            }}
          />
        }
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        inverted
        keyExtractor={item => item._id}
        data={data}
        style={{
          backgroundColor: colors['background-chat'],
        }}
        renderItem={({item}) => {
          return current?._id === item.senderId ? (
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                paddingRight: 16,
                paddingVertical: 8,
              }}>
              <View
                style={{
                  alignItems: 'flex-end',
                  width: Dimensions.get('screen').width / 2,
                  gap: 12,
                }}>
                <View
                  style={{
                    paddingHorizontal: 19,
                    paddingVertical: 16,
                    backgroundColor: colors['primary-100'],
                    borderRadius: 20,
                    borderTopRightRadius: 0,
                  }}>
                  <TextComponent
                    align="justify"
                    text={item.message}
                    size={14}
                    color={colors['text-10']}
                  />
                </View>
                <TextComponent
                  text={moment(item.createdAt).fromNow()}
                  size={12}
                  color={colors['text-body']}
                />
              </View>
            </View>
          ) : (
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingLeft: 16,
              }}>
              <View
                style={{
                  alignItems: 'flex-start',
                  width: Dimensions.get('screen').width / 2,
                  gap: 12,
                }}>
                <View
                  style={{
                    paddingHorizontal: 19,
                    paddingVertical: 16,
                    backgroundColor: colors['text-10'],
                    borderRadius: 20,
                    borderTopLeftRadius: 0,
                  }}>
                  <TextComponent
                    align="justify"
                    text={item.message}
                    size={14}
                    color={colors['text-100']}
                  />
                </View>
                <TextComponent
                  text={moment(item.createdAt).fromNow()}
                  size={12}
                  color={colors['text-body']}
                />
              </View>
            </View>
          );
        }}
      />
      <RowComponent
        gap={12}
        styles={{
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderTopWidth: 1,
          borderColor: colors['grey-150'],
        }}>
        <InputComponent
          value={sendMess}
          onChange={setsendMess}
          placeholder="Type a message ..."
          isFull={false}
          allowClear
        />
        <TouchableOpacity
          onPress={() => handleSendMess(userId)}
          style={[
            globalStyles.center,
            {
              backgroundColor: colors['primary-100'],
              width: 58,
              height: 58,
              borderRadius: 100,
            },
          ]}>
          <TextComponent text="Send" color={colors['text-10']} />
        </TouchableOpacity>
      </RowComponent>
    </View>
  );
};

export default ChatUserScreen;
