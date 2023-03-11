import { ETheme } from "./themes.enum";


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
  title?:string;
  content?:string;
  imageNames?: string[];
  audioNames?: string[];
  videoNames?: string[];
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


