import {TouchableOpacity} from 'react-native';
import React from 'react';
import {RowComponent, TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';

interface Props {
  text: string;
  onPress: () => void;
}

const Category = ({text, onPress}: Props) => {
  return (
    <RowComponent>
      <TextComponent text={text} flex={1} title color={colors['text-100']} />
      <TouchableOpacity onPress={onPress}>
        <TextComponent text="See All" size={12} color={colors['primary-100']} />
      </TouchableOpacity>
    </RowComponent>
  );
};

export default Category;
