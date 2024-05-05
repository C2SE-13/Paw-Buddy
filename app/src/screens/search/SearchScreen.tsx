/* eslint-disable react-native/no-inline-styles */
import {Dimensions, FlatList, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {ButtonComponent, InputComponent, TextComponent} from '../../components';
import {SearchProfileIcon} from '../../assets/icons';
import YoutubeIframe from 'react-native-youtube-iframe';
import axios from 'axios';
import {toastConfig} from '../../utils/toast';
import Toast from 'react-native-toast-message';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {colors} from '../../constants/colors';
import {shadowStyle, shadowStyle2} from '../../styles/boxShadow';
import useUpdateStatusLoading from '../../hooks/useUpdateStatusLoading';

const maxResults = process.env.API_MAX_RESULTS_YOUTUBE || 3;

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [video, setVideo] = useState([]);
  const [playing, setPlaying] = useState(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const {updateStatusLoading} = useUpdateStatusLoading();

  const onChangeState = useCallback((state: any) => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

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
  };

  return (
    <View
      style={[
        globalStyles.center,
        {
          paddingVertical: 12,
        },
      ]}>
      {video.length > 0 ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={video}
          keyExtractor={item => item.id.videoId}
          contentContainerStyle={{gap: 14}}
          renderItem={({item}: {item: any}) => (
            <YoutubeIframe
              height={200}
              width={Dimensions.get('screen').width - 48}
              play={playing}
              videoId={item.id.videoId}
              onChangeState={onChangeState}
            />
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
        style={[
          globalStyles.center,
          shadowStyle,
          shadowStyle2,
          {
            position: 'absolute',
            width: 50,
            height: 50,
            backgroundColor: colors['background-white'],
            top: Dimensions.get('screen').height - 200,
            right: 32,
            borderRadius: 100,
          },
        ]}>
        <TouchableOpacity
          onPress={() => {
            setVideo([]);
            actionSheetRef.current?.show();
          }}>
          <SearchProfileIcon />
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
          <ButtonComponent
            size="large"
            type="primary"
            text={'Search'}
            onPress={handleSearch}
          />
        </View>
      </ActionSheet>
    </View>
  );
};

export default SearchScreen;
