import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useState} from 'react';

export default function useCheckProfilePet() {
  const {petActive} = useSelector((state: RootState) => state.user);
  const [message] = useState("Don't have any pets yet?");

  const checkStatusPet = () => {
    if (petActive === null) {
      return false;
    } else {
      return true;
    }
  };
  return {message, checkStatusPet};
}
