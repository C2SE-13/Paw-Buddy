import React, {useEffect, useState} from 'react';
import {TypedUseSelectorHook} from 'react-redux';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {AppDispatch, RootState} from '../redux/store';
import {getCurrent} from '../redux/user/asyncActions';
import withBaseComponent from '../hocs/withBaseComponent';
import {SplashScreen} from '../screens';
import Toast from 'react-native-toast-message';
import {View} from 'react-native-reanimated/lib/typescript/Animated';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  dispatch: AppDispatch;
  useSelector: TypedUseSelectorHook<RootState>;
}

const AppRouters = ({dispatch, useSelector}: Props) => {
  const {token} = useSelector(state => state.user);
  const [isShowSplash, setIsShowSplash] = useState(true);
  const isLoading = useSelector((state: any) => state.app.isLoading);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (token) {
      timeout = setTimeout(() => {
        dispatch(getCurrent());
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [dispatch, token]);

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : token ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
      <Toast />
      {/* Nếu isLoading là true, hiển thị loading component*/}

      {isLoading && (
        <View style={[globalStyles.center, styles.loading]}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
});

export default withBaseComponent(AppRouters);
