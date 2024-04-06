import {updateLoading} from '../redux/app/appSlice';
import {useAppDispatch} from '../redux/hooks';

export default function useUpdateStatusLoading() {
  const dispatch = useAppDispatch();

  const updateStatusLoading = (value: boolean) => {
    dispatch(updateLoading(value));
  };

  return {updateStatusLoading};
}
