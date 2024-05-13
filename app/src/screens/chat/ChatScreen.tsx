/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  HeaderTitle,
  InputComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import {MessageAddIcon, SearchProfileIcon} from '../../assets/icons';
import {colors} from '../../constants/colors';
import {NavigationProp} from '@react-navigation/native';
import {fontFamilies} from '../../constants/fontFamilies';
import {apiGetConversations} from '../../apis';
import useUpdateStatusLoading from '../../hooks/useUpdateStatusLoading';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import moment from 'moment';

interface Props {
  navigation: NavigationProp<MainStackParamList, 'ChatBotScreen'>;
}

interface IConversations {
  _id: string;
  participants: {
    _id: string;
    fullName: string;
    email: string;
    profilePic: string;
  }[];
  updatedAt: string;
}

const ChatScreen = ({navigation}: Props) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<IConversations[]>([]);
  const {updateStatusLoading} = useUpdateStatusLoading();
  const {current} = useSelector((state: RootState) => state.user);

  const getConversations = async () => {
    updateStatusLoading(true);
    const response: any = await apiGetConversations();
    updateStatusLoading(false);
    if (response.success) {
      setData(response.data);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <View style={[globalStyles.container]}>
      <HeaderTitle
        text="Message"
        color={colors['text-100']}
        size={18}
        font={fontFamilies['inter-semibold']}
        leftButton={
          <View
            style={{
              width: 40,
              height: 40,
            }}
          />
        }
        rightButton={
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
            onPress={() => navigation.navigate('ChatBotScreen')}>
            <MessageAddIcon />
          </TouchableOpacity>
        }
      />
      <View
        style={{
          padding: 24,
        }}>
        <InputComponent
          value={search}
          onChange={setSearch}
          placeholder="Search Message"
          iconLeft={<SearchProfileIcon />}
          styles={{
            backgroundColor: colors['secondary-text'],
            borderRadius: 100,
            borderWidth: 0,
          }}
          allowClear
        />
      </View>
      {data.length > 0 ? (
        <FlatList
          contentContainerStyle={{
            gap: 12,
          }}
          data={data}
          renderItem={({item}) => {
            const senderObj = item.participants.find(
              el => el._id !== current?._id,
            );
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ChatUserScreen', {
                    userId: senderObj?._id ?? '',
                    name: senderObj?.fullName ?? '',
                  })
                }
                style={{
                  marginHorizontal: 24,
                  borderWidth: 1,
                  padding: 12,
                  borderColor: colors['grey-150'],
                  borderRadius: 12,
                }}>
                <RowComponent gap={12}>
                  <Image
                    source={{uri: senderObj?.profilePic}}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 100,
                    }}
                  />
                  <TextComponent
                    text={senderObj?.fullName ?? ''}
                    size={14}
                    title
                    flex={1}
                    color={colors['text-100']}
                  />
                  <TextComponent
                    text={moment(item.updatedAt).format('hh:mm A') ?? ''}
                    size={10}
                    color={colors['text-body']}
                  />
                </RowComponent>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={[globalStyles.center, {flex: 1, padding: 24}]}>
          <TextComponent
            text="There have been no discussions yet"
            size={14}
            color={colors['text-body']}
          />
        </View>
      )}
    </View>
  );
};

export default ChatScreen;
