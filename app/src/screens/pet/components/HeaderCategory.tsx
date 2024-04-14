import {TouchableOpacity} from 'react-native';
import React from 'react';
import {RowComponent, TextComponent} from '../../../components';
import {colors} from '../../../constants/colors';
import {HidenIcon, MoreIcon} from '../../../assets/icons';

interface Props {
  text: string;
  onPress: () => void;
  isShow: boolean;
}

const HeaderCategory = ({text, onPress, isShow = true}: Props) => {
  return (
    <RowComponent>
      <TextComponent
        text={text}
        flex={1}
        title
        color={colors['grey-800']}
        size={16}
      />
      <TouchableOpacity onPress={onPress}>
        {isShow ? <HidenIcon /> : <MoreIcon />}
      </TouchableOpacity>
    </RowComponent>
  );
};

export default HeaderCategory;
