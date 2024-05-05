/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RowComponent from '../common/RowComponent';
import TextComponent from '../text/TextComponent';
import withBaseComponent from '../../hocs/withBaseComponent';
import {TypedUseSelectorHook} from 'react-redux';
import {RootState} from '../../redux/store';
import {globalStyles} from '../../styles/globalStyles';
import {AlertIcon} from '../../assets/icons';
import {colors} from '../../constants/colors';

interface Props {
  useSelector: TypedUseSelectorHook<RootState>;
}

interface IPet {
  name: string;
  id: number;
}

const HeaderPet = ({useSelector}: Props) => {
  const {petActive} = useSelector(state => state.user);
  const [dataPet, setDataPet] = useState<IPet>({
    name: '',
    id: 0,
  });

  useEffect(() => {
    petActive &&
      setDataPet({
        name: petActive.name_pet,
        id: petActive.id,
      });
  }, [petActive]);

  return (
    <RowComponent
      alignItems="center"
      gap={20}
      styles={[
        {
          paddingVertical: 12,
          paddingHorizontal: 16,
        },
      ]}>
      <View style={{flex: 1, gap: 2}}>
        <TextComponent
          title
          text={`Hi, ${dataPet.name}!`}
          color={colors['text-100']}
        />
        <TextComponent
          text="How is your pet Today?"
          color={colors['text-80']}
        />
      </View>
      <TouchableOpacity
        style={[
          globalStyles.center,
          {
            backgroundColor: colors['text-20'],
            width: 48,
            height: 48,
            borderRadius: 48,
            position: 'relative',
          },
        ]}>
        <AlertIcon />
        {false && (
          <View
            style={{
              position: 'absolute',
              width: 8,
              height: 8,
              borderRadius: 1000,
              top: 13,
              right: 13,
              backgroundColor: colors['fill-red'],
            }}
          />
        )}
      </TouchableOpacity>
    </RowComponent>
  );
};

export default withBaseComponent(HeaderPet);
