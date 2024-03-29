/* eslint-disable react/react-in-jsx-scope */
import {
  SizeLargePet,
  SizeLargePetActive,
  SizeMediumPet,
  SizeMediumPetActive,
  SizeSmallPet,
  SizeSmallPetActive,
} from '../../../assets/icons';

export const sizes = [
  {
    id: 1,
    name: 'Small',
    value: 'under 14kg',
    icon: <SizeSmallPet />,
    iconActive: <SizeSmallPetActive />,
  },
  {
    id: 2,
    name: 'Medium',
    value: '14-25kg',
    icon: <SizeMediumPet />,
    iconActive: <SizeMediumPetActive />,
  },
  {
    id: 3,
    name: 'Large',
    value: 'over 25kg',
    icon: <SizeLargePet />,
    iconActive: <SizeLargePetActive />,
  },
];
