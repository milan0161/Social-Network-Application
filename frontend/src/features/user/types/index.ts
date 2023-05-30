import { InitalUserState } from '../../auth/types';

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  mainImage: string;
}

export interface Followers {
  followers: InitalUserState[];
  message?: string;
}

export interface Following {
  following: InitalUserState[];
}

export interface UnfollowedUsers {
  users: InitalUserState[];
}

export interface Search {
  users: User[];
}
