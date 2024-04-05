// import {useDispatch} from 'react-redux';
import {updateLoading} from '../redux/app/appSlice';
// import {AppDispatch} from '../redux/store';
import {useAppDispatch} from '../redux/hooks';

export default function useUpdateLoading() {
  const dispatch = useAppDispatch();
  const isLoading = (value: boolean) => {
    dispatch(updateLoading(value));
  };
  return {isLoading};
}
