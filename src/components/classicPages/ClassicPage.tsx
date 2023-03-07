import React, { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaceHolder from "./images/placeHolderImage1.jpg";
import PlaceHolder2 from "./images/placeHolderImage2.jpg";
import { loremIpsum } from "react-lorem-ipsum";
export default function ClassicPage(props: {
  page: string;
}) {
  const page = props.page;
  const [title1ClassName, setTitle1ClassName] =
    useState<string>("title1");
  const [title2ClassName, setTitle2ClassName] =
    useState<string>("title2");
  const [title3ClassName, setTitle3ClassName] =
    useState<string>("title3");
  const [subTitle1ClassName, setSubTitle1ClassName] =
    useState<string>("subTitle1");
  const [imageTopClassName, setImageTopClassName] =
    useState<string>("imageTop");
  const [captionTopClassName, setCaptionTopClassName] =
    useState<string>("captionTop");
  const [body1ClassName, setBody1ClassName] =
    useState<string>("body1");
  const [body2ClassName, setBody2ClassName] =
    useState<string>("body2");
  return (
    <>
      <Typography
        className={title1ClassName}
        variant="h1"
        gutterBottom={false}
      >
        {page}
      </Typography>

      <Typography
        className={subTitle1ClassName}
        variant="subtitle1"
        gutterBottom
      >
        {loremIpsum()}
      </Typography>

      <img
        className={imageTopClassName}
        src={PlaceHolder}
        alt=""
        style={{
          width: "100%",
        }}
      />

      <Typography
        className={captionTopClassName}
        variant="caption"
        display="block"
        gutterBottom
      >
        {loremIpsum({
          avgSentencesPerParagraph: 1,
          avgWordsPerSentence: 5,
        })}
      </Typography>

      <Typography
        className={body1ClassName}
        variant="body1"
        gutterBottom
      >
        {loremIpsum({ p: 3 })}
      </Typography>

      <Typography
        className={title2ClassName}
        variant="h2"
        gutterBottom
      >
        {loremIpsum({
          avgSentencesPerParagraph: 1,
          avgWordsPerSentence: 3,
        })}
      </Typography>

      <Typography
        className={body2ClassName}
        variant="body2"
        gutterBottom
      >
        {loremIpsum({ p: 3 })}
      </Typography>

      <Typography className={title2ClassName} variant="h3" gutterBottom>
        {loremIpsum({
          avgSentencesPerParagraph: 1,
          avgWordsPerSentence: 3,
        })}
      </Typography>

      <Typography className={body2ClassName} variant="body2" gutterBottom>
        {loremIpsum({ p: 3 })}
      </Typography>

      <Box
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <img
          src={PlaceHolder2}
          alt=""
          style={{ width: "100%" }}
        />
        <Typography
          variant="caption"
          display="block"
          gutterBottom
        >
          {loremIpsum({
            avgSentencesPerParagraph: 1,
            avgWordsPerSentence: 5,
          })}
        </Typography>
      </Box>
    </>
  );
}
