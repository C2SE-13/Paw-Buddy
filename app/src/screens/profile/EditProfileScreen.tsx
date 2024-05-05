/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  ButtonComponent,
  HeaderTitle,
  InputComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {ProfileStackParamList} from '../../navigators/ProfileNavigator';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {apiUpdateCurrent} from '../../apis';
import {useDispatch} from 'react-redux';
import {getCurrent} from '../../redux/user/asyncActions';
import {AppDispatch} from '../../redux/store';
import {colors} from '../../constants/colors';
import Toast from 'react-native-toast-message';
import SelectDropdown from 'react-native-select-dropdown';
import {fontFamilies} from '../../constants/fontFamilies';
import MESSAGE from '../../constants/message';
import ModalComponent from '../../components/modal/ModalComponent';

interface IPageProps {
  navigation: NavigationProp<ProfileStackParamList>;
  route: RouteProp<ProfileStackParamList, 'EditProfileScreen'>;
}

const EditProfileScreen: React.FC<IPageProps> = ({navigation, route}) => {
  const {key, type, placeholder} = route.params;
  const [value, setValue] = useState(route.params.value || '');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    const updateResponse: any = await apiUpdateCurrent({
      [key]: value,
    });

    if (updateResponse?.success) {
      await dispatch(getCurrent());
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: MESSAGE.UPDATE_SUCCESS,
        position: 'top',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: MESSAGE.UPDATE_FAIL,
        position: 'bottom',
      });
    }
  };

  return (
    <View style={{height: '100%'}}>
      <ModalComponent
        handleSubmit={handleSubmit}
        setVisible={setModalVisible}
        text="Confirm Update?"
        visible={modalVisible}
      />
      <HeaderTitle
        text={placeholder}
        color={colors['text-10']}
        styles={{padding: 20, backgroundColor: colors['primary-100']}}
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
        rightButton={<SpaceComponent width={20} />}
      />
      <SpaceComponent height={10} />
      <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
        <View style={{flex: 1}}>
          {route.params.value === false || route.params.value === true ? (
            <SelectDropdown
              defaultValue={{
                title: route.params.value ? 'Male' : 'Female',
                value: route.params.value,
              }}
              data={[
                {title: 'Male', value: true},
                {title: 'Female', value: false},
              ]}
              onSelect={selectedItem => {
                setValue(selectedItem.value);
              }}
              renderButton={selectedItem => {
                return (
                  <View style={styles.dropdownBtn}>
                    <TextComponent
                      text={selectedItem ? selectedItem.title : ''}
                      font={fontFamilies['inter-medium']}
                      size={16}
                      color={colors['text-100']}
                    />
                  </View>
                );
              }}
              renderItem={item => {
                return (
                  <View style={styles.dropdownItem}>
                    <TextComponent
                      text={item.title}
                      font={fontFamilies['inter-medium']}
                      size={16}
                      color={colors['text-100']}
                    />
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <InputComponent
              value={value}
              onChange={setValue}
              placeholder={placeholder}
              type={type}
            />
          )}
          <SpaceComponent height={10} />
          <ButtonComponent
            text="Update"
            onPress={() => setModalVisible(true)}
            type="primary"
            size={'large'}
          />
        </View>
      </View>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  titleBtn: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownBtn: {
    padding: 20,
    backgroundColor: colors['background-white'],
    borderRadius: 20,
  },
  dropdownItem: {
    padding: 20,
    backgroundColor: colors['background-white'],
  },
});

export default EditProfileScreen;
