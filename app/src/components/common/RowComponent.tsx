import {View, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../../styles/globalStyles';

interface Props {
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  alignItems?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'stretch'
    | undefined;
  styles?: StyleProp<ViewStyle>;
  children: ReactNode;
  gap?: number;
}

const RowComponent = (props: Props) => {
  const {styles, justify, alignItems, children, gap} = props;

  const localStyle = [
    globalStyles.row,
    {
      justifyContent: justify ?? 'center',
      alignItems: alignItems ?? 'center',
      gap: gap ?? 0,
    },
    styles,
  ];

  return <View style={localStyle}>{children}</View>;
};

export default RowComponent;
