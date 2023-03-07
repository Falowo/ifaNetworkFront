import { IText } from "../interfaces/post.interface";
// export interface IText {
//     _id?: string;
//     type:
//       | "h1"
//       | "h2"
//       | "h3"
//       | "h4"
//       | "body1"
//       | "body2"
//       | "body3"
//       | "body4"
//       | "caption"
//       | "subtitle1"
//       | "subtitle2";
//     content: string;
//     local?: string;
//     gutterBottom?: boolean;
//     postId?: string;
//   }

export const texts: IText[] = [
  {
    _id: "1",
    type: "h1",
    content: "Hello world",
    local: "en",
    postId: "1",
    gutterBottom: true,
  },
  {
    _id: "2",
    type: "subtitle1",
    content: "Hello world",
    local: "en",
    postId: "1",
    gutterBottom: true,
  },
  {
    _id: "3",
    type: "body1",
    content: `The world is fun and nice.
    I love you. I love my baby, I love my childs`,
    local: "en",
    postId: "1",
    gutterBottom: true,
  },
];
