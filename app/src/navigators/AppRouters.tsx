import React, {useEffect, useState} from 'react';
import {TypedUseSelectorHook} from 'react-redux';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {AppDispatch, RootState} from '../redux/store';
import {getCurrent} from '../redux/user/asyncActions';
import withBaseComponent from '../hocs/withBaseComponent';
import {SplashScreen} from '../screens';

interface Props {
  dispatch: AppDispatch;
  useSelector: TypedUseSelectorHook<RootState>;
}

const AppRouters = ({dispatch, useSelector}: Props) => {
  const {token} = useSelector(state => state.user);
  const [isShowSplash, setIsShowSplash] = useState(true);

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
      }, 1000);
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
    </>
  );
};

export default withBaseComponent(AppRouters);
