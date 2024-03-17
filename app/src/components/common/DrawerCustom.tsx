/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  CircleComponent,
  HeaderProfile,
  LinkComponent,
  RowComponent,
  TextComponent,
} from '..';
import {AddIcon, CloseIcon, LogoutIcon} from '../../assets/icons';
import withBaseComponent from '../../hocs/withBaseComponent';
import {logout} from '../../redux/user/userSlice';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';

interface YourPets {
  id: number;
  image: string;
  name: string;
}

const YourPetsItem = (props: any) => {
  const {type, item} = props;
  return type === 'addNew' ? (
    <TouchableOpacity style={{gap: 8}}>
      <CircleComponent
        size={60}
        color="transparent "
        styles={{borderWidth: 1.5, borderColor: colors['primary-100']}}>
        <AddIcon />
      </CircleComponent>
      <TextComponent text="add New" color={colors['primary-100']} size={14} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={[globalStyles.center, {gap: 8}]}>
      <Image
        source={item.image}
        style={{
          width: 60,
          height: 60,
          objectFit: 'cover',
          borderRadius: 100,
        }}
      />
      <TextComponent text={item.name} color="#D9DFE6" size={14} />
    </TouchableOpacity>
  );
};

const DrawerCustom = ({navigation, dispatch}: any) => {
  const [yourPets, setyourPets] = useState<YourPets[]>([
    {
      id: 1,
      image: require('../../assets/imgs/Default.png'),
      name: 'Maxi',
    },
    {
      id: 2,
      image: require('../../assets/imgs/Default.png'),
      name: 'Fiona',
    },
  ]);

  const handleLogout = () => {
    Alert.alert('Log out', 'You will be returned to the login screen.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'Log out', onPress: () => dispatch(logout())},
    ]);
  };

  return (
    <View style={[localStyles.container]}>
      <HeaderProfile>
        <TouchableOpacity onPress={() => navigation.closeDrawer()}>
          <CloseIcon />
        </TouchableOpacity>
      </HeaderProfile>
      <View
        style={{
          paddingVertical: 24,
          borderBottomWidth: 1,
          borderColor: '#D9DFE6',
        }}>
        <TextComponent
          color={colors['text-100']}
          text="Your Pets"
          title
          size={16}
          font={fontFamilies['inter-medium']}
        />
        <RowComponent
          justify="space-between"
          styles={{paddingTop: 24, gap: 16}}>
          <YourPetsItem type="addNew" />
          <FlatList
            horizontal
            data={yourPets}
            contentContainerStyle={{gap: 16}}
            renderItem={({item}) => <YourPetsItem item={item} type="pet" />}
          />
        </RowComponent>
      </View>
      <LinkComponent
        icon={<LogoutIcon />}
        type="button"
        text="Logout"
        onPress={handleLogout}
      />
    </View>
  );
};

export default withBaseComponent(DrawerCustom);

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
