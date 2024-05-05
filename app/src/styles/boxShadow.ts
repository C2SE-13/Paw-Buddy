import {Platform} from 'react-native';

export const shadowStyle = Platform.select({
  ios: {
    shadowColor: 'rgba(50, 50, 71, 0.04)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  android: {
    elevation: 5,
  },
});

export const shadowStyle2 = Platform.select({
  ios: {
    shadowColor: 'rgba(12, 26, 75, 0.05)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  android: {
    elevation: 2,
  },
});
