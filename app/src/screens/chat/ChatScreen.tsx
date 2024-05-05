/* eslint-disable react-native/no-inline-styles */
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import React, {RefObject, useEffect, useRef, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {
  HeaderTitle,
  InputComponent,
  RowComponent,
  TextComponent,
} from '../../components';
import {
  ChevronBack,
  CloseIcon,
  MessageAddIcon,
  SearchProfileIcon,
} from '../../assets/icons';
import {colors} from '../../constants/colors';
import {NavigationProp} from '@react-navigation/native';
import {fontFamilies} from '../../constants/fontFamilies';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {apiGetDoctors} from '../../apis';
import {IDoctors} from '../../utils/interface';

interface Props {
  navigation: NavigationProp<any, any>;
}

interface ICreateMessage {
  actionSheetRef: RefObject<ActionSheetRef>;
}

const ChatScreen = ({navigation}: Props) => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const actionSheetRef = useRef<ActionSheetRef>(null);

  return (
    <View style={[globalStyles.container]}>
      <HeaderTitle
        text="Message"
        color={colors['text-100']}
        size={18}
        font={fontFamilies['inter-semibold']}
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
            onPress={() => actionSheetRef.current?.show()}>
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
      <ActionSheet ref={actionSheetRef}>
        <CreateNewMessage actionSheetRef={actionSheetRef} />
      </ActionSheet>
    </View>
  );
};

const CreateNewMessage = ({actionSheetRef}: ICreateMessage) => {
  const [searchDoctor, setSearchDoctor] = useState('');
  const [dataDoctor, setDataDoctor] = useState<IDoctors[]>([]);

  useEffect(() => {
    const getDoctors = async () => {
      const response: any = await apiGetDoctors({
        limit: 10,
        page: 0,
        roleId: 2,
      });
      if (response.success) {
        setDataDoctor(response.data);
      }
    };

    getDoctors();
  }, []);

  return (
    <View
      style={{
        backgroundColor: colors['background-white'],
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
      }}>
      <HeaderTitle
        text="Create New Message"
        color={colors['text-100']}
        size={18}
        font={fontFamilies['inter-semibold']}
        leftButton={
          <TouchableOpacity
            style={[
              globalStyles.center,
              {
                width: 40,
                height: 40,
              },
            ]}
            onPress={() => actionSheetRef.current?.hide()}>
            <CloseIcon />
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
      <View
        style={{
          padding: 24,
        }}>
        <InputComponent
          value={searchDoctor}
          onChange={setSearchDoctor}
          placeholder="Search Doctor"
          iconLeft={<SearchProfileIcon />}
          styles={{
            backgroundColor: colors['secondary-text'],
            borderRadius: 100,
            borderWidth: 0,
          }}
          allowClear
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 24, height: 400}}
        contentContainerStyle={{gap: 8}}
        data={dataDoctor}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              padding: 10,
              paddingBottom: 16,
              borderBottomWidth: 1,
              borderColor: colors['text-30'],
            }}>
            <RowComponent gap={12}>
              <Image
                source={{uri: item.avatar}}
                style={{width: 54, height: 54, borderRadius: 100}}
              />
              <TextComponent
                text={item.fullName}
                color={colors['text-100']}
                title
                size={14}
                flex={1}
              />
            </RowComponent>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
export default ChatScreen;
