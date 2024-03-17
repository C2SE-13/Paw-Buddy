import React, {useEffect, useState} from 'react';
import SplashScreen from '../screens/SplashScreen';
import {useSelector} from 'react-redux';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import {RootState} from '../redux/store';

const AppRouters = () => {
  const {token} = useSelector((state: RootState) => state.user);
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* {isShowSplash ? (
        <SplashScreen />
      ) : token ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )} */}
      <MainNavigator />
    </>
  );
};

export default AppRouters;
