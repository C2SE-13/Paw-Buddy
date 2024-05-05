import {Dispatch, SetStateAction} from 'react';
import {
  Control,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {FormData} from '../AddPetProfileScreen';

export interface Props {
  control: Control<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
  setstatusButton: Dispatch<
    SetStateAction<'disabled' | 'primary' | 'secondary'>
  >;
  getValues: UseFormGetValues<FormData>;
  watch: UseFormWatch<FormData>;
  nameStep: string;
}
