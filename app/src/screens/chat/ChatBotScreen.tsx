/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Dimensions, FlatList, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  HeaderTitle,
  InputComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import {colors} from '../../constants/colors';
import {shadowStyle, shadowStyle2} from '../../styles/boxShadow';
import {ChevronBack, SendIcon} from '../../assets/icons';
import {NavigationProp} from '@react-navigation/native';
import {API_URL_2} from '../../config/env';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../utils/toast';

interface Props {
  navigation: NavigationProp<any, any>;
}

interface IMessageChatBot {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
}

const ChatBotScreen = ({navigation}: Props) => {
  const [data, setData] = useState<IMessageChatBot[]>([]);
  const {token, current} = useSelector((state: RootState) => state.user);
  const [sendMess, setsendMess] = useState('');

  const getMessageChat = async () => {
    const response: any = await axios.get(API_URL_2 + 'chatbot', {
      headers: {
        Authorization: `Bear ${token}`,
      },
    });
    setData(response.data.reverse());
  };

  useEffect(() => {
    getMessageChat();
  }, []);

  const handleSendMess = async () => {
    if (sendMess.length < 1) {
      return Toast.show(
        toastConfig({
          textMain: 'Please enter content!',
          visibilityTime: 2000,
          type: 'error',
        }),
      );
    }
    const response: any = await axios.post(
      API_URL_2 + 'chatbot/chat',
      {
        message: sendMess,
      },
      {
        headers: {
          Authorization: `Bear ${token}`,
        },
      },
    );
    if (response.data.senderId || response.data.receiverId) {
      setsendMess('');
      getMessageChat();
    } else {
      Toast.show(
        toastConfig({
          textMain: response.data.response,
          visibilityTime: 2000,
          type: 'error',
        }),
      );
      getMessageChat();
    }
  };

  return (
    <View style={[globalStyles.container]}>
      <HeaderTitle
        text="ChatBox"
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
            onPress={() => navigation.goBack()}
            style={[
              globalStyles.center,
              {
                width: 40,
                height: 40,
                borderWidth: 1,
                borderRadius: 14,
                borderColor: colors['grey-150'],
              },
            ]}>
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
          onPress={handleSendMess}
          style={[
            globalStyles.center,
            {
              backgroundColor: colors['primary-100'],
              width: 58,
              height: 58,
              borderRadius: 16,
            },
          ]}>
          <SendIcon />
        </TouchableOpacity>
      </RowComponent>
    </View>
  );
};

export default ChatBotScreen;
