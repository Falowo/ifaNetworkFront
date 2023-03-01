import React, { useEffect, useState, useRef } from "react";
import "./oponIfa.css";
import OponIfaImage from "./square-opon-ifa-black.jpg";

import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Container,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import * as timeago from "timeago.js";

import {
  QuestionMark,
  PlayArrow,
  SkipPrevious,
  SkipNext,
  MeetingRoom,
} from "@mui/icons-material";

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
  // selectCurrentOdu,
  selectIndexCurrentOdu,
  selectIndexCurrentQuestion,
  selectOduHistory,
  selectQuestionHistory,
} from "../../app/slices/ifaSlice";
import IsNotAsking from "../../components/oponIfaMods/IsNotAsking";
import IsAsking from "../../components/oponIfaMods/IsAsking";

export default function OponIfa() {
  const { isAuthenticated, user } = useAuth0();
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const [isDivinationMode, setIsDivinationMode] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  // const currentOdu = useAppSelector(selectCurrentOdu);
  const inputEl = useRef<HTMLInputElement>(null);
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
  const [colorSkipNextCommand, setSkipNextColorCommand] =
    useState<
      | "disabled"
      | "action"
      | "inherit"
      | "error"
      | "primary"
      | "secondary"
      | "info"
      | "success"
      | "warning"
      | undefined
    >(undefined);
  const [
    colorSkipPreviousCommand,
    setSkipPreviousColorCommand,
  ] = useState<
    | "disabled"
    | "action"
    | "inherit"
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | undefined
  >(undefined);

  const skipPreviousOnClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    if (
      !!isAsking &&
      indexCurrentQuestion !== questionHistory.length - 1 &&
      questionHistory.length > 1
    ) {
      dispatch(incrementIndexCurrentQuestion());
    } else if (
      !isAsking &&
      indexCurrentOdu !== oduHistory.length - 1 &&
      oduHistory.length > 1
    ) {
      dispatch(incrementIndexCurrentOdu());
    } else {
      console.log("lastSSp");
    }
  };
  const skipNextOnClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    if (!!isAsking && indexCurrentQuestion !== 0) {
      dispatch(decrementIndexCurrentQuestion());
    } else if (!isAsking && indexCurrentOdu !== 0) {
      dispatch(decrementIndexCurrentOdu());
    } else {
      console.log("lastSF");
    }
  };

  useEffect(() => {
    if (!isAsking) {
      if (indexCurrentOdu === 0) {
        setSkipNextColorCommand("disabled");
        if (oduHistory.length <= 1) {
          setSkipPreviousColorCommand("disabled");
        } else {
          setSkipPreviousColorCommand(undefined);
        }
      } else if (
        indexCurrentOdu ===
        oduHistory.length - 1
      ) {
        setSkipPreviousColorCommand("disabled");
        if (indexCurrentOdu !== 0) {
          setSkipNextColorCommand(undefined);
        }
      } else {
        setSkipNextColorCommand(undefined);
        setSkipPreviousColorCommand(undefined);
      }
    }
    if (!!isAsking) {
      inputEl.current?.focus();

      if (indexCurrentQuestion === 0) {
        setSkipNextColorCommand("disabled");
        if (questionHistory.length <= 1) {
          setSkipPreviousColorCommand("disabled");
        } else {
          setSkipPreviousColorCommand(undefined);
        }
      } else if (
        indexCurrentQuestion ===
        questionHistory.length - 1
      ) {
        setSkipPreviousColorCommand("disabled");
        if (indexCurrentQuestion !== 0) {
          setSkipNextColorCommand(undefined);
        }
      } else {
        setSkipNextColorCommand(undefined);
        setSkipPreviousColorCommand(undefined);
      }
    }
  }, [
    indexCurrentOdu,
    indexCurrentQuestion,
    isAsking,
    oduHistory.length,
    questionHistory.length,
  ]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        margin: "0 auto !important",
        padding: "0 auto !important",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isDivinationMode}
                onChange={() =>
                  setIsDivinationMode(!isDivinationMode)
                }
                aria-label="isAsking switch"
                color="warning"
                disabled={!isAuthenticated || user?.name !== "Josselin Falowo Krikorian" }
              />
            }
            label={
              isDivinationMode
                ? "Divination Mode"
                : "Study Mode"
            }
          />
        </FormGroup>
      </Box>
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
        <input
          style={{ width: "100%", padding: "8px" }}
          autoFocus={true}
          placeholder="Write your binary question or formalize it"
          ref={inputEl}
          onChange={() =>
            console.log(inputEl.current?.value)
          }
        />
      )}
      <div
        style={{
          display: "flex",
          flexFlow: "row-reverse",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!!isAsking ? (
          <QuestionMark
            sx={{
              fontSize: "1.5rem",
              //   fontWeight: "bolder",
              cursor: "pointer",
              margin: "8px",
              minWidth: "32px",
              minHeight: "32px",
              display: "none",
            }}
          />
        ) : (
          <MeetingRoom
            onClick={(
              e: React.MouseEvent<
                SVGSVGElement,
                MouseEvent
              >,
            ) => {
              e.stopPropagation();
              console.log("go room");
            }}
            sx={{
              fontSize: "1.5rem",
              //   fontWeight: "bolder",
              cursor: "pointer",
              margin: "8px",
              minWidth: "32px",
              minHeight: "32px",
            }}
          />
        )}
        {
          <PlayArrow
            onClick={(
              e: React.MouseEvent<
                SVGSVGElement,
                MouseEvent
              >,
            ) => {
              e.stopPropagation();
              if (!isAsking) {
                dispatch(castOdu());
              } else {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const question = inputEl.current?.value;
                console.log({ question });

                dispatch(
                  askQuestionAsync({ ibo: true, question }),
                );
                if (!!inputEl?.current?.value) {
                  inputEl.current.value = "";
                }
              }
            }}
            sx={{
              fontSize: "1.5rem",
              //   fontWeight: "bolder",
              cursor: "pointer",
              margin: "8px",
              minWidth: "32px",
              minHeight: "32px",
            }}
          />
        }

        <div
          style={{
            minWidth: "8px",
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
          }}
        >
          {
            <>
              <SkipPrevious
                onClick={(
                  e: React.MouseEvent<
                    SVGSVGElement,
                    MouseEvent
                  >,
                ) => skipPreviousOnClick(e)}
                sx={{
                  fontSize: "1.5rem",
                  // fontWeight: "bolder",
                  cursor: "pointer",
                  margin: "8px",
                  minWidth: "32px",
                  minHeight: "32px",
                }}
                color={colorSkipPreviousCommand}
              />

              <SkipNext
                onClick={(
                  e: React.MouseEvent<
                    SVGSVGElement,
                    MouseEvent
                  >,
                ) => skipNextOnClick(e)}
                sx={{
                  fontSize: "1.5rem",
                  // fontWeight: "bolder",
                  cursor: "pointer",
                  margin: "8px",
                  minWidth: "32px",
                  minHeight: "32px",
                }}
                color={colorSkipNextCommand}
              />
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
              const question = inputEl.current?.value;
              console.log({ question });

              dispatch(
                askQuestionAsync({ ibo: true, question }),
              );
              if (!!inputEl?.current?.value) {
                inputEl.current.value = "";
              }
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <img
            className="imageOpon"
            src={OponIfaImage}
            alt="Opon Ifa"
          />
          <Box className="boxOponIfaMods">
            {!isAsking ? <IsNotAsking /> : <IsAsking />}
          </Box>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isAsking}
                  onChange={() => setIsAsking(!isAsking)}
                  aria-label="isAsking switch"
                />
              }
              label="?"
            />
          </FormGroup>
        </Box>
      </>
    </Container>
  );
}
