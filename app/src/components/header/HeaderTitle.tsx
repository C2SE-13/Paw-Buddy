import {StyleProp, View, ViewStyle} from 'react-native';
import {TextComponent} from '..';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import {ReactNode} from 'react';
import {globalStyles} from '../../styles/globalStyles';

interface IProps {
  title: string;
  leftButton?: ReactNode;
  rightButton?: ReactNode;
  styles?: StyleProp<ViewStyle>;
  size?: number;
  font?: string;
  color?: string;
}

const HeaderTitle = ({
  title,
  leftButton,
  rightButton,
  styles,
  size,
  font,
  color,
}: IProps) => {
  return (
    <View
      style={[
        globalStyles.row,
        {justifyContent: 'center', alignItems: 'center'},
        styles,
      ]}>
      {leftButton && leftButton}
      <TextComponent
        text={title}
        size={size}
        font={font}
        styles={{textAlign: 'center'}}
        color={color}
        flex={1}
      />
      {rightButton && rightButton}
    </View>
  );
};

export default HeaderTitle;
