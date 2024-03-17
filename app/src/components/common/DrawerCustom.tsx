import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {HeaderProfile} from '..';
import {AddIcon} from '../../assets/icons';

const DrawerCustom = ({navigation}: any) => {
  return (
    <View style={[localStyles.container]}>
      <HeaderProfile>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <AddIcon />
        </TouchableOpacity>
      </HeaderProfile>
    </View>
  );
};

export default DrawerCustom;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
