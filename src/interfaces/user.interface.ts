export enum Status {
  FREE = 10,
  ECO = 20,
  PREMIUM = 30,
}

export interface IUser {
  _id?: string;
  sub?: String;
  createdAt?: Date;
  updatedAt?: Date;
  name?: String;
  given_name?: String;
  family_name?: String;
  middle_name?: String;
  nickname?: String;
  preferred_username?: String;
  profile?: String;
  picture?: String;
  website?: String;
  email?: String;
  email_verified?: boolean;
  gender?: String;
  birthdate?: String;
  zoneinfo?: String;
  locale?: String;
  phone_number?: String;
  phone_number_verified?: boolean;
  address?: String;
  updated_at?: string;
  friendsIds?: string[];
  followersIds?: string[];
  notCheckedNewFollowersIds?: string[];
  blockedIds?: string[];
  isAdmin?: boolean;
  isBabalawo?: boolean;
  desc?: String;
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

// export interface IFakeUser {
//   token?: string;
//   _id?: string;
//   username: string;
//   email?: string;
//   password?: string;
//   profilePicture?: string;
//   coverPicture?: string;
//   followersIds?: string[];
//   followedIds?: string[];
//   isAdmin?: boolean;
//   desc?: string;
//   city?: string;
//   from?: string;
//   relationship?: Relationship;
//   birthDate?: Date;
// }
