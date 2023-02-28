export enum Status {
  FREE = 10,
  ECO = 20,
  PREMIUM = 30,
}

export interface IUser {
  _id?: string;
  sub?: string;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
  email_verified?: boolean;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  address?: string;
  updated_at?: string;
  friendsIds?: string[];
  followersIds?: string[];
  notCheckedNewFollowersIds?: string[];
  blockedIds?: string[];
  isAdmin?: boolean;
  isBabalawo?: boolean;
  desc?: string;
  status?: Status;
  [key: string]: any;
}

export interface ToUpdateUserInfo {
  adress?: string;
  from?: string;
}
export interface ToUpdateUserDesc {
  desc?: string;
}

