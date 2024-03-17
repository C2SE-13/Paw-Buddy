import React, {ElementType} from 'react';
import {useDispatch, useSelector} from 'react-redux';

const withBaseComponent = (Component: ElementType) => (props: any) => {
  const dispatch = useDispatch();

  return <Component {...props} dispatch={dispatch} useSelector={useSelector} />;
};

export default withBaseComponent;
