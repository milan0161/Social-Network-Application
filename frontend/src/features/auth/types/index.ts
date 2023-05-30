export interface InitialState {
  user: InitalUserState;
  isAuth: boolean;
}
export interface InitalUserState {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  mainImage?: string;
  followers?: [];
  following?: [];
  followedBy?: string[];
  allImages?: string[];
  informations?: UserInformations;
}

export interface UserInformations {
  // id: string;
  city?: string;
  placeOfBirth?: string;
  dateOfBirth?: string;
  age?: number;
  employed?: boolean;
  workPlace?: string;
  phoneNumber?: number;
}

export interface RequestRegister {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ResponseRegister {
  message: string;
}

export interface ResponseLogin {
  user: InitalUserState;
  aToken: string;
  rToken: string;
}
export interface RequestLogin {
  email: string;
  password: string;
}
