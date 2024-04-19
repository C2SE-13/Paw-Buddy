/* eslint-disable react-native/no-inline-styles */
import {TouchableOpacity} from 'react-native';
import React from 'react';
import {RowComponent, TextComponent} from '../../../components';
import {IPetServies} from '../../../utils/interface';
import {shadowStyle, shadowStyle2} from '../../../styles/boxShadow';
import {colors} from '../../../constants/colors';

interface Props {
  item: IPetServies;
  onPress: (item: IPetServies) => void;
  chosenServices: IPetServies | null;
}

const CardServiceComponent = (props: Props) => {
  const {onPress, item, chosenServices} = props;
  return (
    <TouchableOpacity
      onPress={() => onPress(item)}
      key={item.id}
      style={[
        shadowStyle,
        shadowStyle2,
        {
          padding: 16,
          backgroundColor:
            chosenServices?.id === item.id
              ? colors['fill-green']
              : colors['background-white'],
          borderRadius: 14,
        },
      ]}>
      <RowComponent>
        <TextComponent
          title
          text={item.name_service ?? ''}
          flex={1}
          color={
            chosenServices?.id === item.id
              ? colors['background-white']
              : colors['grey-800']
          }
          size={14}
        />
        <RowComponent alignItems="flex-end">
          <TextComponent
            text="$"
            size={12}
            styles={{marginBottom: 3.5}}
            color={
              chosenServices?.id === item.id
                ? colors['background-white']
                : colors['grey-900']
            }
          />
          <TextComponent
            title
            text={item.price.toString() ?? ''}
            size={20}
            color={
              chosenServices?.id === item.id
                ? colors['background-white']
                : colors['grey-900']
            }
          />
        </RowComponent>
      </RowComponent>
    </TouchableOpacity>
  );
};

export default CardServiceComponent;
