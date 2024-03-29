import {
  Image,
  KeyboardType,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {HeaderTitle, SpaceComponent, TextComponent} from '../../components';
import {colors} from '../../constants/colors';
import {useSelector} from 'react-redux';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ProfileStackParamList} from '../../navigators/ProfileNavigator';
import Toast from 'react-native-toast-message';

interface State {
  user: {
    current: {
      id:string
      email: string;
      fullName?: string;
      avatar?: string;
      gender: boolean;
      address?: string;
      phone?: string;
    }[];
  };
}

interface IPageProps {
  navigation: NativeStackNavigationProp<ProfileStackParamList, 'AccountScreen'>;
}

const AccountScreen = ({navigation}: IPageProps) => {
  const user = useSelector((state: State) => state.user.current[0]);

  const handleOpenEditScreen = (
    key: string,
    value: any,
    type: KeyboardType,
    placeholder: string,
  ) => {
    navigation.navigate('EditProfileScreen', {key, value, placeholder, type});
  };

  return (
    <View style={styles.container}>
      <HeaderTitle
        leftButton={
          <TouchableOpacity
            style={styles.titleBtn}
            onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: 15,
                height: 15,
              }}
              source={require('../../assets/imgs/arrow-left-white.png')}
            />
          </TouchableOpacity>
        }
        rightButton={
          <TouchableOpacity
            onPress={() => console.log(1)}
            style={styles.titleBtn}>
            <Image
              style={{
                width: 20,
                height: 20,
              }}
              source={require('../../assets/imgs/icons8-settings-250.png')}
            />
          </TouchableOpacity>
        }
        title={'Profile'}
        color={colors['text-10']}
        styles={{padding: 20}}
      />
      <View style={styles.infoContainer}>
        <Image
          style={styles.avatar}
          source={
            user.avatar
              ? {uri: user.avatar}
              : require('../../assets/imgs/Default.png')
          }
        />
        <SpaceComponent height={80} />
        <TextComponent
          size={18}
          font={fontFamilies['inter-bold']}
          text={user.fullName || 'Your Name'}
          color={colors['text-100']}
        />
        <SpaceComponent height={5} />
        <TextComponent
          size={14}
          text={user.email}
          color={colors['text-60']}
          font={fontFamilies['inter-medium']}
        />
        <SpaceComponent height={20} />
        <View
          style={[
            globalStyles['w-100'],
            {
              flexDirection: 'row',
              backgroundColor: colors['text-20'],
              paddingVertical: 10,
              borderRadius: 20,
            },
          ]}>
          <TouchableOpacity style={styles.btn}>
            <TextComponent
              text="My Appointments"
              color={colors['text-100']}
              font={fontFamilies['inter-medium']}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <TextComponent
              text="Medical Records"
              color={colors['text-100']}
              font={fontFamilies['inter-medium']}
            />
          </TouchableOpacity>
        </View>
        <SpaceComponent height={20} />
        {/*editable profile info */}
        <ScrollView style={{height:'30%'}}>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() =>
              handleOpenEditScreen(
                'fullName',
                user.fullName,
                'default',
                'Input your name',
              )
            }>
            <TextComponent text="Full name" styles={styles.labelText} />
            <TextComponent
              text={user.fullName || 'Set now'}
              styles={[styles.valueText, styles.labelText]}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.infoRow}
            onPress={() =>
              handleOpenEditScreen(
                'password',
                user.id,
                'default',
                'Change your password',
              )
            }>
            <TextComponent text="Password" styles={styles.labelText} />
            <TextComponent
              text={'*********'}
              styles={[styles.valueText, styles.labelText]}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() =>
              handleOpenEditScreen(
                'phone',
                user.phone,
                'numeric',
                'Input your phone',
              )
            }>
            <TextComponent text="Phone" styles={styles.labelText} />
            <TextComponent
              text={user.phone || 'Set now'}
              styles={[styles.valueText, styles.labelText]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() =>
              handleOpenEditScreen(
                'gender',
                user.gender,
                'default',
                'Choose your gender',
              )
            }>
            <TextComponent text="Gender" styles={styles.labelText} />
            <TextComponent
              text={user.gender ? 'Male' : 'Female'}
              styles={[styles.valueText, styles.labelText]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoRow}
            onPress={() =>
              handleOpenEditScreen(
                'address',
                user.address,
                'default',
                'Input your address',
              )
            }>
            <TextComponent text="Address" styles={styles.labelText} />
            <TextComponent
              text={user.address || 'Set now'}
              styles={[styles.valueText, styles.labelText]}
            />
          </TouchableOpacity>
        </ScrollView>
        <SpaceComponent height={50} />
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['primary-100'],
    height: '100%',
    justifyContent: 'space-between',
  },
  titleBtn: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: colors['background-white'],
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    objectFit: 'cover',
    position: 'absolute',
    top: -70,
    backgroundColor: colors['background-white'],
    borderRadius: 70,
    zIndex: 10,
    borderColor: colors['secondary-blue'],
    borderWidth: 5,
  },
  btn: {
    padding: 10,
    width: '50%',
    alignItems: 'center',
  },
  infoRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors['text-40'],
    minHeight: 50,
  },
  labelText: {
    color: colors['text-100'],
    fontFamily: fontFamilies['inter-medium'],
  },
  valueText: {
    width: '50%',
    textAlign: 'right',
  },
});

export default AccountScreen;
