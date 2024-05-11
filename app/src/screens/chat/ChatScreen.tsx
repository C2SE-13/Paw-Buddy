/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {HeaderTitle, InputComponent, TextComponent} from '../../components';
import {MessageAddIcon, SearchProfileIcon} from '../../assets/icons';
import {colors} from '../../constants/colors';
import {NavigationProp} from '@react-navigation/native';
import {fontFamilies} from '../../constants/fontFamilies';
import {apiGetConversations} from '../../apis';
import useUpdateStatusLoading from '../../hooks/useUpdateStatusLoading';
import {MainStackParamList} from '../../navigators/MainNavigator';

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
}

const ChatScreen = ({navigation}: Props) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<IConversations[]>([]);
  const {updateStatusLoading} = useUpdateStatusLoading();

  const getConversations = async () => {
    updateStatusLoading(true);
    const response: any = await apiGetConversations();
    updateStatusLoading(false);
    console.log(response);
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
        <View>
          <TextComponent text="x" />
        </View>
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
