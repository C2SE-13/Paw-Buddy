/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {ButtonComponent, InputComponent, TextComponent} from '../../components';
import {
  AppsIcon,
  CloseIcon,
  HidenIcon,
  SearchProfileIcon,
} from '../../assets/icons';
import YoutubeIframe from 'react-native-youtube-iframe';
import axios from 'axios';
import {toastConfig} from '../../utils/toast';
import Toast from 'react-native-toast-message';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {colors} from '../../constants/colors';
import {shadowStyle, shadowStyle2} from '../../styles/boxShadow';
import useUpdateStatusLoading from '../../hooks/useUpdateStatusLoading';

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [video, setVideo] = useState([]);
  const [playing, setPlaying] = useState(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {updateStatusLoading} = useUpdateStatusLoading();
  const [animation] = useState(new Animated.Value(0));
  const [isVisible, setIsVisible] = useState(false);
  const [maxResults, setMaxResults] = useState(3);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoId, setVideoId] = useState('');

  const onChangeState = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const startAnimation = () => {
    if (isVisible) {
      Animated.spring(animation, {
        toValue: 0,
        friction: 10,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    } else {
      Animated.spring(animation, {
        toValue: 1,
        friction: 10,
        useNativeDriver: true,
      }).start(() => setIsVisible(true));
    }
  };

  const handleSearch = async () => {
    if (search.length <= 0) {
      return Toast.show(
        toastConfig({
          textMain: 'Please enter the content',
          visibilityTime: 2000,
          type: 'error',
        }),
      );
    }

    if (checkPetCareRelated(search)) {
      updateStatusLoading(true);
      const response: any = await axios.get(
        `${process.env.API_YOUTUBE}?key=${process.env.API_KEY_YOUTUBE}&q=${search}&part=snippet&type=video&maxResults=${maxResults}`,
      );
      updateStatusLoading(false);
      if (!response.data.error) {
        if (response.data.items.length > 0) {
          setVideo(response.data.items);
        } else {
          toastConfig({
            textMain: 'Not Found',
            visibilityTime: 2000,
            type: 'error',
          });
        }
      }

      actionSheetRef.current?.hide();
    } else {
      return Toast.show(
        toastConfig({
          textMain: 'You should ask questions related to pets',
          visibilityTime: 2000,
          type: 'error',
        }),
      );
    }
  };

  const checkPetCareRelated = (input: string): boolean => {
    const petCareRegex =
      /(pet|dog|cat|animal|care|vet|grooming|feeding|health|training|behavior|nutrition|exercise|companionship|adoption|rescue|vaccination|parasite|spaying|neutering)/gi;

    return petCareRegex.test(input);
  };

  return (
    <View
      style={[
        globalStyles.center,
        globalStyles['h-100'],
        {
          paddingVertical: 20,
        },
      ]}>
      {video.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={video}
          keyExtractor={item => item.id.videoId}
          contentContainerStyle={{gap: 14}}
          renderItem={({item}: {item: any}) => (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                setVideoId(item.id.videoId);
              }}
              style={{
                width: Dimensions.get('screen').width - 48,
                borderBottomWidth: 1,
                gap: 12,
                paddingBottom: 12,
                borderColor: colors['grey-300'],
              }}>
              <Image
                resizeMode="cover"
                source={{uri: item.snippet.thumbnails.high.url}}
                style={{
                  width: Dimensions.get('screen').width - 48,
                  height: 200,
                  borderRadius: 20,
                }}
              />
              <TextComponent
                text={item.snippet.title}
                size={14}
                color={colors['grey-800']}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <View
          style={[globalStyles.center, globalStyles['h-100'], {width: 250}]}>
          <TextComponent
            text="Please enter the content to search!"
            color={colors['grey-800']}
            size={18}
            align="center"
          />
        </View>
      )}
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
          bottom: 24,
          right: 32,
          gap: 16,
        }}>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0], // Chỉnh sửa giá trị -300 để thay đổi vị trí ban đầu
                  }),
                },
              ],
            },
          ]}>
          <TouchableOpacity
            style={[
              globalStyles.center,
              shadowStyle,
              shadowStyle2,
              stylesLocal.boxIcon,
            ]}
            onPress={() => {
              startAnimation();
              actionSheetRef.current?.show();
            }}>
            <SearchProfileIcon />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0], // Chỉnh sửa giá trị -300 để thay đổi vị trí ban đầu
                  }),
                },
              ],
            },
          ]}>
          <TouchableOpacity
            disabled={video.length === 0 && true}
            style={[
              globalStyles.center,
              shadowStyle,
              shadowStyle2,
              stylesLocal.boxIcon,
              {
                opacity: video.length === 0 ? 0.5 : 1,
              },
            ]}
            onPress={() => setVideo([])}>
            <HidenIcon />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
          style={[
            globalStyles.center,
            shadowStyle,
            shadowStyle2,
            stylesLocal.boxIcon,
          ]}
          onPress={startAnimation}>
          {isVisible ? <CloseIcon /> : <AppsIcon />}
        </TouchableOpacity>
      </View>
      <ActionSheet ref={actionSheetRef}>
        <View
          style={[
            globalStyles['w-100'],
            {
              padding: 24,
              gap: 12,
            },
          ]}>
          <InputComponent
            value={search}
            onChange={setSearch}
            placeholder="Search"
            allowClear
            iconLeft={<SearchProfileIcon />}
          />
          <InputComponent
            value={maxResults.toString()}
            onChange={value => setMaxResults(Number(value))}
            placeholder="Number of search results"
            type="numeric"
          />
          <ButtonComponent
            size="large"
            type="primary"
            text={'Search'}
            onPress={handleSearch}
          />
        </View>
      </ActionSheet>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <Pressable
          onPress={() => {
            setModalVisible(false);
            setVideoId('');
          }}
          style={[
            globalStyles.center,
            {
              backgroundColor: 'rgba(0,0,0,0.5)',
              flex: 1,
            },
          ]}>
          <Pressable
            onPress={() => null}
            style={[
              shadowStyle,
              shadowStyle2,
              globalStyles.center,
              {
                width: Dimensions.get('screen').width - 48,
                height: Dimensions.get('screen').width - 48,
                backgroundColor: colors['background-white'],
                borderRadius: 14,
                padding: 24,
                position: 'relative',
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setVideoId('');
              }}
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
              }}>
              <CloseIcon />
            </TouchableOpacity>
            <View style={{paddingTop: 24}}>
              <YoutubeIframe
                height={200}
                width={Dimensions.get('screen').width - 48 - 48}
                play={playing}
                videoId={videoId}
                onChangeState={onChangeState}
              />
            </View>
            <ButtonComponent
              text={playing ? 'Pause' : 'Play'}
              size="large"
              type="primary"
              onPress={() => setPlaying(!playing)}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const stylesLocal = StyleSheet.create({
  boxIcon: {
    width: 50,
    height: 50,
    backgroundColor: colors['background-white'],
    borderRadius: 100,
  },
});

export default SearchScreen;
