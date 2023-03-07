import { ETheme } from "./themes.enum";
export interface IImage {
  _id?: string;
  fileName: string;
  alt?: string;
  postId?: string;
}

export interface IVideo {
  _id?: string;
  fileName: string;
  type?: string;
  local?: string;
  postId?: string;
}
export interface IAudio {
  _id?: string;
  fileName: string;
  local?: string;
  type?: string;
  postId?: string;
}

export interface IText {
  _id?: string;
  content: string;
  local?: string;
  postId?: string;
}

export interface IComment {
  _id?: string;
  postId: string;
  content: string;
  userId: string;
  isEditing?: boolean;
}

export interface IPost {
  _id?: string;
  oduBin?: number;
  classicPageId?: string;
  userId?: string;
  images?: IImage[];
  audios?: IAudio[];
  videos?: IVideo[];
  comments?: Comment[];
  hashTags?: string[];
  locals?: string[];
  backGround?: string;
  targetUserIds?: string[];
  likingUserIds?: string[];
  isEditing?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IClassicPage {
  _id?: string;
  title?: string;
  posts?: IPost[];
  theme?: ETheme;
}


