/* eslint-disable react-native/no-inline-styles */
import {ScrollView, View} from 'react-native';
import React, {SetStateAction, useEffect, useState} from 'react';
import {
  ButtonComponent,
  HeaderBookDate,
  InputComponent,
  SpaceComponent,
  TextComponent,
} from '../../components';
import {globalStyles} from '../../styles/globalStyles';
import CardService from './components/CardService';
import {RouteProp} from '@react-navigation/native';
import {MainStackParamList} from '../../navigators/MainNavigator';
import DateService from './components/DateService';
import {apiGetPetService} from '../../apis';
import CardServiceComponent from './components/CardServiceComponent';
import {IPetServies} from '../../utils/interface';
import {colors} from '../../constants/colors';
import moment from 'moment';

interface Props {
  navigation: any;
  route: RouteProp<MainStackParamList, 'BookDateScreen'>;
}

const BookDateScreen = ({route}: Props) => {
  const {chosenServices, idService, nameService} = route.params;
  const [dataService, setDataService] = useState<IPetServies[]>([]);
  const [chosen, setChosen] = useState(chosenServices ?? []);
  const [note, setNote] = useState('');
  const [bookDate, setBookDate] = useState<SetStateAction<string>>(
    moment().format(),
  );

  useEffect(() => {
    const getItemDetail = async (id: number) => {
      const reponse: any = await apiGetPetService({category_id: id});
      if (reponse.success) {
        setDataService(reponse.data);
      }
    };

    getItemDetail(idService);
  }, [idService]);

  const handlechosenServices = (item: IPetServies) => {
    const check = chosenServices.includes(item);
    if (check) {
      const newArr = chosenServices.filter(i => i !== item);
      setChosen(newArr);
    } else {
      setChosen(prev => [...prev, item]);
    }
  };

  return (
    <View style={[globalStyles.container]}>
      <HeaderBookDate />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <SpaceComponent height={24} />
        <View style={{paddingHorizontal: 24}}>
          <CardService nameService={nameService} image={chosen[0].photo} />
        </View>
        <SpaceComponent height={20} />
        <DateService date={bookDate} setBookDate={setBookDate} />
        <SpaceComponent height={20} />
        <View style={{paddingHorizontal: 24}}>
          <View
            style={{
              gap: 16,
              borderBottomWidth: 1,
              paddingBottom: 20,
              borderColor: colors['grey-150'],
            }}>
            <TextComponent
              text="Services"
              title
              size={16}
              color={colors['grey-800']}
            />
            <View style={{gap: 16}}>
              {dataService.map((item: IPetServies) => (
                <CardServiceComponent
                  key={item.id}
                  item={item}
                  chosenServices={chosen}
                  onPress={handlechosenServices}
                />
              ))}
            </View>
            <TextComponent
              text="Prices are estimative and the payment will be made at the location."
              size={14}
              color="#808B9A"
            />
          </View>
        </View>
        <SpaceComponent height={20} />
        <View style={{paddingHorizontal: 24, gap: 5}}>
          <TextComponent
            text="Add Note"
            color="#808B9A"
            size={14}
            styles={{paddingLeft: 8}}
          />
          <InputComponent
            value={note}
            onChange={setNote}
            placeholder="Suggested"
            numberOfLine={5}
            multiline
            allowClear
          />
        </View>
        <SpaceComponent height={24} />
      </ScrollView>
      <View style={{padding: 24}}>
        <ButtonComponent
          text="Confirm booking"
          type={'primary'}
          size="large"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default BookDateScreen;
