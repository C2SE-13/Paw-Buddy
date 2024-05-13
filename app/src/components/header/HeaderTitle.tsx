/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {RowComponent, TextComponent} from '..';
import {fontFamilies} from '../../constants/fontFamilies';
import {colors} from '../../constants/colors';
import {ReactNode} from 'react';
import {globalStyles} from '../../styles/globalStyles';

interface IProps {
  text: string;
  subText?: string;
  leftButton?: ReactNode;
  rightButton?: ReactNode;
  styles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  size?: number;
  font?: string;
  color?: string;
  subColor?: string;
}

const HeaderTitle = ({
  text,
  leftButton,
  rightButton,
  styles,
  size,
  font,
  color,
  subText,
  textStyles,
  subColor,
}: IProps) => {
  return (
    <RowComponent
      styles={[
        {
          paddingHorizontal: 24,
          paddingTop: 24,
        },
        styles,
      ]}>
      {leftButton && leftButton}
      <View style={[globalStyles.center, {flex: 1}]}>
        <TextComponent
          title
          text={text}
          size={size ?? 16}
          font={font ?? fontFamilies['inter-semibold']}
          color={color ?? colors['grey-800']}
          styles={textStyles}
        />
        {subText && (
          <TextComponent
            text={subText}
            color={subColor ?? colors['grey-600']}
          />
        )}
      </View>
      {rightButton && rightButton}
    </RowComponent>
  );
};

export default HeaderTitle;
