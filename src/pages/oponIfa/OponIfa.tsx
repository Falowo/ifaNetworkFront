import React, { useState } from "react";
import "./oponIfa.css";
import OponIfaImage from "./square-opon-ifa-black.jpg";
import { Box, Container } from "@mui/material";
import * as timeago from "timeago.js";

import {
  Cached,
  QuestionMark,
  PlayArrow,
  SkipPrevious,
  SkipNext,
  MeetingRoom,
} from "@mui/icons-material";
import { Input } from "@mui/material";

import {
  useAppDispatch,
  useAppSelector,
} from "../../app/hooks";
import {
  askQuestionAsync,
  //   blankTrail,
  castOdu,
  decrementIndexCurrentOdu,
  decrementIndexCurrentQuestion,
  incrementIndexCurrentOdu,
  incrementIndexCurrentQuestion,
  initializeIndexCurrentOdu,
  initializeIndexCurrentQuestion,
  // selectCurrentOdu,
  selectIndexCurrentOdu,
  selectIndexCurrentQuestion,
  selectOduHistory,
  selectQuestionHistory,
} from "../../app/slices/ifaSlice";
import IsNotAsking from "../../components/oponIfaMods/IsNotAsking";
import IsAsking from "../../components/oponIfaMods/IsAsking";

export default function OponIfa() {
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const currentOdu = useAppSelector(selectCurrentOdu);
  const indexCurrentOdu = useAppSelector(
    selectIndexCurrentOdu,
  );
  const indexCurrentQuestion = useAppSelector(
    selectIndexCurrentQuestion,
  );
  const oduHistory = useAppSelector(selectOduHistory);
  const questionHistory = useAppSelector(
    selectQuestionHistory,
  );
  let currentOdu = oduHistory[indexCurrentOdu];
  return (
    <Container
      maxWidth="lg"
      sx={{
        margin: "0 auto !important",
        padding: "0 auto !important",
      }}
    >
      {!isAsking ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "5px",
          }}
        >
          <h1
            className="oduNameTitle"
            style={{
              textAlign: "center",
              color: `${
                !!currentOdu?.randomColor
                  ? "#" + currentOdu.randomColor
                  : "white"
              }`,
            }}
          >
            {!!currentOdu?.oduNames?.length
              ? currentOdu?.oduNames[0]
              : `e-opele`}
          </h1>
          <span
            className="spanTimeAgo"
            style={{
              color: !!currentOdu?.randomColor
                ? `${"#" + currentOdu?.randomColor}`
                : "white",
            }}
          >
            {!!currentOdu?.createdAt &&
              timeago.format(currentOdu?.createdAt)}
          </span>
        </Box>
      ) : (
        <Input
          sx={{
            flexGrow: "1",
          }}
          autoFocus={true}
          placeholder="Write your binary question or formalize it"
        />
      )}
      <div
        style={{
          display: "flex",
          flexFlow: "row-reverse",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          //   padding: "5px",
          alignItems: "center",
          border: "solid 3px red",
        }}
      >
        {!isAsking ? (
          <QuestionMark
            onClick={(e) => {
              e.stopPropagation();
              setIsAsking(true);
            }}
            sx={{
              fontSize: "3rem",
              fontWeight: "bolder",
              cursor: "pointer",
              margin: "16px",
              minWidth: "64px",
              minHeight: "64px",
            }}
          />
        ) : (
          <MeetingRoom
            onClick={(e) => {
              e.stopPropagation();
              setIsAsking(false);
            }}
            sx={{
              fontSize: "3rem",
              fontWeight: "bolder",
              cursor: "pointer",
              margin: "16px",
              minWidth: "64px",
              minHeight: "64px",
            }}
          />
        )}
        {
          <PlayArrow
            onClick={(e) => {
              e.stopPropagation();
              if (!isAsking) {
                dispatch(castOdu());
              } else {
                dispatch(askQuestionAsync({ ibo: true }));
              }
            }}
            sx={{
              fontSize: "3rem",
              fontWeight: "bolder",
              cursor: "pointer",
              margin: "16px",
              minWidth: "64px",
              minHeight: "64px",
            }}
          />
        }

        <div
          style={{
            minWidth: "64px",
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
          }}
        >
       
          {
            <>
              {((!isAsking &&
                indexCurrentOdu < oduHistory.length - 1) ||
                (!!isAsking &&
                  indexCurrentQuestion <
                    questionHistory.length - 1)) && (
                <SkipPrevious
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!!isAsking) {
                      dispatch(
                        incrementIndexCurrentQuestion(),
                      );
                    } else {
                      dispatch(incrementIndexCurrentOdu());
                    }
                  }}
                  sx={{
                    fontSize: "3rem",
                    fontWeight: "bolder",
                    cursor: "pointer",
                    margin: "16px",
                    minWidth: "64px",
                    minHeight: "64px",
                  }}
                />
              )}
              {((!isAsking &&
                !!oduHistory.length &&
                indexCurrentOdu !== 0) ||
                (!!isAsking &&
                  !!questionHistory.length &&
                  indexCurrentQuestion !== 0)) && (
                <SkipNext
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!!isAsking) {
                      dispatch(
                        decrementIndexCurrentQuestion(),
                      );
                    } else {
                      dispatch(decrementIndexCurrentOdu());
                    }
                  }}
                  sx={{
                    fontSize: "3rem",
                    fontWeight: "bolder",
                    cursor: "pointer",
                    margin: "16px",
                    minWidth: "64px",
                    minHeight: "64px",
                  }}
                />
              )}
            </>
          }
        </div>
      </div>

      <>
        <div
          className="divImageOpon"
          onClick={(e) => {
            e.stopPropagation();
            if (!isAsking) {
              dispatch(castOdu());
            } else {
              dispatch(askQuestionAsync({ ibo: true }));
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <img
            className="imageOpon"
            src={OponIfaImage}
            alt="Opon Ifa"
          />
          <Box
            className="boxOponIfaMods"
            sx={{ border: "solid 2px hotpink" }}
          >
            {!isAsking ? <IsNotAsking /> : <IsAsking />}
          </Box>
        </div>
      </>
    </Container>
  );
}
