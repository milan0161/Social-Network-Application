export interface Register {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Informations {
  city?: string;
  placeOfBirth?: string;
  dateOfBirth?: Date;
  age?: number;
  employed?: boolean;
  workPlace?: string;
  phoneNumber?: number;
}

export interface SysFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface Post {
  content: string;
}

export interface Images {
  authorId: string;
  path: string;
}
