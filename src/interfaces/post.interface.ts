export interface IEmoji {
  unified: string;
  size?: string;
}

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
  type:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "body1"
    | "body2"
    | "body3"
    | "body4"
    | "caption"
    | "subtitle1"
    | "subtitle2";
  content: string;
  local?: string;
  gutterBottom?: boolean;
  postId?: string;
}

export interface IBox {
  _id?: string;
  arrayElements: Array<
    IText | IVideo | IAudio | IImage | IEmoji
  >;
  postId?: string;
  display?: "flex" | "bloc" | "inline" | "inline-block";
  flexDirection?: "row" | "column" | "row-reverse";
  flexWrap?: "wrap" | "nowrap";
  justifyContent?:
    | "center"
    | "start"
    | "end"
    | "space-between"
    | "space-evenly"
    | "space-around";

  alignItems?: "center" | "start" | "end" | "baseline";
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
  arrayElements: Array<
    IText | IVideo | IAudio | IImage | IEmoji | IBox
  >;
  oduBin?: number;
  classicPageId?: string;
  hashTags?: string[];
  userId?: string;
  locals?: string[];
  backGround?: string;
  comments?: Comment[];
  targetUserIds?: string[];
  likingUserIds?: string[];
  isEditing?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
