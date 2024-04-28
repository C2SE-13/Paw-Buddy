/* eslint-disable react-native/no-inline-styles */
import {ScrollView, View} from 'react-native';
import React, {useState} from 'react';
import {RouteProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigators/MainNavigator';
import {globalStyles} from '../../styles/globalStyles';
import {HeaderBookDate, InputComponent} from '../../components';
import {SearchProfileIcon} from '../../assets/icons';
import {colors} from '../../constants/colors';

interface Props {
  route: RouteProp<MainStackParamList, 'HealthCardScreen'>;
}

const HealthCardScreen = ({route}: Props) => {
  const {petId} = route.params;
  const [search, setSearch] = useState('');
  return (
    <View style={[globalStyles.container]}>
      <HeaderBookDate title="Record" subTitle="Pet Profile" />
      <View
        style={{
          padding: 24,
        }}>
        <InputComponent
          value={search}
          onChange={setSearch}
          placeholder="Search by vaccine type"
          iconLeft={<SearchProfileIcon />}
          styles={{
            backgroundColor: colors['background-white'],
          }}
          allowClear
        />
      </View>
      {/* <ScrollView>

      </ScrollView> */}
    </View>
  );
};

export default HealthCardScreen;
