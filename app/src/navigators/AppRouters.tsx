/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {TypedUseSelectorHook} from 'react-redux';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {AppDispatch, RootState} from '../redux/store';
import {getCurrent} from '../redux/user/asyncActions';
import withBaseComponent from '../hocs/withBaseComponent';
import {SplashScreen} from '../screens';
import Toast from 'react-native-toast-message';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import {colors} from '../constants/colors';
import {getPetServices} from '../redux/app/asyncActions';

interface Props {
  dispatch: AppDispatch;
  useSelector: TypedUseSelectorHook<RootState>;
}

const AppRouters = ({dispatch, useSelector}: Props) => {
  const {token, isLoading: loading} = useSelector(state => state.user);
  const [isShowSplash, setIsShowSplash] = useState(true);
  const {isLoading} = useSelector(state => state.app);

  useEffect(() => {
    dispatch(getPetServices());
  }, [dispatch]);

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
      {(isLoading || loading) && (
        <View
          style={[
            globalStyles.center,
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          ]}>
          <ActivityIndicator size="large" color={colors['primary-100']} />
        </View>
      )}
    </>
  );
};

export default withBaseComponent(AppRouters);
