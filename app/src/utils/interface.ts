export interface IParams {
  limit?: number;
  page?: number;
  category_id?: number;
}

export interface IUser {
  address: string | null;
  avatar: string | null;
  createdAt: Date;
  email: string | null;
  fullName: string | null;
  gender: boolean;
  id: number;
  password: string | null;
  petData: IPet[];
  phone: string | null;
  refreshToken: string | null;
  roleData: any[];
  roleId: number;
  updatedAt: Date;
}

export interface IPet {
  adoption: Date;
  breed: string | null;
  createdAt: Date;
  date_of_birth: Date;
  gender: boolean | null;
  id: number;
  is_neutered: boolean;
  name_pet: string | null;
  size: string | null;
  species: string | null;
  updatedAt: string | null;
  user_id: number;
  weight: number;
  photo: string | null;
}

export interface IServieCategories {
  id: number;
  type_service: string;
  image?: string | null;
}

export interface IPetServies {
  id: number;
  name_service: string | null;
  description: string | null;
  price: number;
  photo: string;
  species: number;
  note: string | null;
  estimated_duration: number;
  category_id: number;
  dataCategory: IServieCategories[];
}
