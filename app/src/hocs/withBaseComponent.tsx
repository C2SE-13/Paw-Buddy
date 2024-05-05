import React, {ElementType} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../redux/store';

const withBaseComponent = (Component: ElementType) => (props: any) => {
  const dispatch = useDispatch<AppDispatch>();

  return <Component {...props} dispatch={dispatch} useSelector={useSelector} />;
};

export default withBaseComponent;
