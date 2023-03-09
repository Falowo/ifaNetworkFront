import React, { useEffect, useState, useRef } from "react";
import "./oponIfa.css";
import OponIfaImage from "./square-opon-ifa-black.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  FormGroup,
  Stack,
  Switch,
  Typography,
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
  castOdu,
  decrementIndexCurrentOdu,
  decrementIndexCurrentQuestion,
  incrementIndexCurrentOdu,
  incrementIndexCurrentQuestion,
  selectCurrentOdu,
  selectIndexCurrentOdu,
  selectIndexCurrentQuestion,
  selectIsDivinationMode,
  selectOduHistory,
  selectQuestionHistory,
  toggleIsDivinationMode,
} from "../../app/slices/ifaSlice";
import { selectUserDB } from "../../app/slices/authSlice";
import IsNotAsking from "../../components/oponIfaMods/IsNotAsking";
import IsAsking from "../../components/oponIfaMods/IsAsking";
import {
  alpha,
  styled,
  useTheme,
} from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";

const DeepPurpleSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: deepPurple["A400"],
    "&:hover": {
      backgroundColor: alpha(
        deepPurple["A400"],
        theme.palette.action.hoverOpacity,
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
    {
      backgroundColor: deepPurple["A400"],
    },
}));

export default function OponIfa() {
  const theme = useTheme();
  const userDB = useAppSelector(selectUserDB);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();
  const [isAsking, setIsAsking] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const currentOdu = useAppSelector(selectCurrentOdu);
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
  const isDivinationMode = useAppSelector(
    selectIsDivinationMode,
  );
  const [odu, setOdu] = useState(currentOdu);
  useEffect(() => {
    console.log({ deepPurple: deepPurple["A400"] });
  }, []);

  useEffect(() => {
    if (indexCurrentOdu === 0) {
      setOdu(currentOdu);
    } else {
      setOdu(oduHistory[indexCurrentOdu]);
    }
  }, [indexCurrentOdu, oduHistory, currentOdu]);

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

  useEffect(() => {
    isAsking &&
      inputEl.current?.focus({ preventScroll: true });
  }, [isAsking]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <FormGroup>
          {/* <FormControlLabel
            control={ */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Typography
              color={
                !isDivinationMode
                  ? "inherit"
                  : theme.palette.text.disabled
              }
            >
              Study
            </Typography>
            <DeepPurpleSwitch
              checked={isDivinationMode}
              onChange={() =>
                dispatch(toggleIsDivinationMode())
              }
              aria-label="divinationMode switch"
              color="warning"
              disabled={
                process.env.NODE_ENV === "production"
                  ? !(
                      isAuthenticated &&
                      !!userDB?.isBabalawo
                    )
                  : false
              }
            />
            <Typography
              color={
                !!isDivinationMode
                  ? "inherit"
                  : theme.palette.text.disabled
              }
            >
              Divination
            </Typography>
          </Stack>
          {/* }
            label={
              isDivinationMode
                ? "Divination Mode"
                : `Study Mode`
            }
          /> */}
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
                !!odu?.randomColor
                  ? odu.randomColor
                  : theme.palette.text.primary
              }`,
            }}
          >
            {!!odu?.oduNames?.length
              ? odu?.oduNames[0]
              : `e-opele`}
          </h1>
          <span
            className="spanTimeAgo"
            style={{
              color: !!odu?.randomColor
                ? odu?.randomColor
                : theme.palette.text.primary,
            }}
          >
            {!!odu?.createdAt &&
              timeago.format(odu?.createdAt)}
          </span>
        </Box>
      ) : (
        <input
          style={{ width: "100%", padding: "8px" }}
          autoFocus={false}
          placeholder="Write your yes/no affirmative question or formalize it"
          ref={inputEl}
          type="text"
          onKeyDownCapture={(e) => {
            console.log("onKeyDownCapture");
            console.log(e);

            if (e.key === "Enter") {
              const question = inputEl.current?.value;
              console.log("Enter");

              dispatch(
                askQuestionAsync({
                  ibo: true,
                  question,
                }),
              );
              if (!!inputEl?.current?.value) {
                inputEl.current.blur();
                inputEl.current.value = "";
              }
            }
          }}
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
              navigate(`/odu_room/${odu.binId}`);
            }}
            sx={{
              fontSize: "1.5rem",
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

                dispatch(
                  askQuestionAsync({
                    ibo: true,
                    question,
                  }),
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
            e.preventDefault();
            e.stopPropagation();
            if (!isDivinationMode) {
              if (!isAsking) {
                dispatch(castOdu());
              } else {
                const question = inputEl.current?.value;

                dispatch(
                  askQuestionAsync({ ibo: true, question }),
                );
              }
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
            {!isAsking || !questionHistory.length ? (
              <IsNotAsking
                isDivinationMode={isDivinationMode}
              />
            ) : (
              <IsAsking />
            )}
          </Box>
        </div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Switch
              checked={isAsking}
              onChange={() => setIsAsking(!isAsking)}
              aria-label="isAsking switch"
              color="default"
            />
            <Typography
              color={
                !!isAsking
                  ? "inherit"
                  : theme.palette.text.disabled
              }
            >
              ?
            </Typography>
          </Stack>
        </Box>
      </>
    </>
  );
}
