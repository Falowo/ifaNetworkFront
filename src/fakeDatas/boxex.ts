// export interface IBox {
//     _id?: string;
//     arrayElements: Array<
//       IText | IVideo | IAudio | IImage | IEmoji
//     >;
//     postId?: string;
//     display?: "flex" | "bloc" | "inline" | "inline-block";
//     flexDirection?: "row" | "column" | "row-reverse";
//     flexWrap?: "wrap" | "nowrap";
//     justifyContent?:
//       | "center"
//       | "start"
//       | "end"
//       | "space-between"
//       | "space-evenly"
//       | "space-around";

//     alignItems?: "center" | "start" | "end" | "baseline";
//   }

import { IBox } from "../interfaces/";
import { images } from "./Images";
import { texts } from "./Texts";
export const boxes: IBox[] = [
  {
    _id: "1",
    arrayElements: [
      images[0],
      texts[0],
      texts[1],
      texts[2],
    ],
  },
];
