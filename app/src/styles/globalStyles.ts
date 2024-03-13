import {StyleSheet} from 'react-native';
import {colors} from '../constants/colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors['background-white'],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: colors.form,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
