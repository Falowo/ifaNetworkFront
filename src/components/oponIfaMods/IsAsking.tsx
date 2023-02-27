import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import {
  selectIndexCurrentQuestion,
  selectQuestionHistory,
} from "../../app/slices/ifaSlice";

export default function IsAsking() {
  const questionHistory = useAppSelector(
    selectQuestionHistory,
  );
  const indexCurrentQuestion = useAppSelector(
    selectIndexCurrentQuestion,
  );
  const textShadow = "-4px 1px #002021";
  const textShadow2 = "-1px 1px #002021";

  const [question, setQuestion] = useState(
    questionHistory[indexCurrentQuestion],
  );

  useEffect(() => {
    setQuestion(questionHistory[indexCurrentQuestion]);
  }, [indexCurrentQuestion, questionHistory]);

  return (
    <div style={{ marginTop: "10%" }}>
      <Grid
        // className="printGrid"
        container
        spacing={1}
        margin="0 auto"
        width="100%"
      >
        <Grid item xs={3.5}></Grid>
        {/*question secondOdu */}
        {/* leg1 */}
        <Grid
          item
          xs={1}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {!!questionHistory.length &&
              question?.secondOdu &&
              questionHistory[
                indexCurrentQuestion
              ]?.secondOdu?.leg1?.map(
                (m: boolean, i: number) => (
                  <h2
                    key={i}
                    className="markItemIsAsking"
                    style={{
                      textShadow,
                      color: !!questionHistory[
                        indexCurrentQuestion
                      ]?.secondOdu?.randomColor
                        ? `${
                            "#" +
                            questionHistory[
                              indexCurrentQuestion
                            ]?.secondOdu?.randomColor
                          }`
                        : "white",
                    }}
                  >
                    {m === true ? "I" : "II"}
                  </h2>
                ),
              )}
          </div>
        </Grid>
        <Grid item xs={1}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {!!questionHistory.length &&
              question?.secondOdu &&
              questionHistory[
                indexCurrentQuestion
              ]?.secondOdu?.leg0?.map((m, i) => (
                <h2
                  key={i}
                  className="markItemIsAsking"
                  style={{
                    textShadow,
                    color: !!questionHistory[
                      indexCurrentQuestion
                    ]?.secondOdu?.randomColor
                      ? `${
                          "#" +
                          questionHistory[
                            indexCurrentQuestion
                          ]?.secondOdu?.randomColor
                        }`
                      : "white",
                  }}
                >
                  {m === true ? "I" : "II"}
                </h2>
              ))}
          </div>
        </Grid>
        {/* between the two odu */}
        <Grid item xs={1}></Grid>
        {/* first odu leg1*/}
        <Grid item xs={1}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {!!questionHistory.length &&
              questionHistory[
                indexCurrentQuestion
              ]?.firstOdu?.leg1?.map(
                (m: boolean, i: number) => (
                  <h2
                    key={i}
                    className="markItemIsAsking"
                    style={{
                      textShadow,
                      color: !!questionHistory[
                        indexCurrentQuestion
                      ].firstOdu.randomColor
                        ? `${
                            "#" +
                            questionHistory[
                              indexCurrentQuestion
                            ].firstOdu.randomColor
                          }`
                        : "white",
                    }}
                  >
                    {m === true ? "I" : "II"}
                  </h2>
                ),
              )}
          </div>
        </Grid>
        {/* firstOdu leg0 */}
        <Grid item xs={1}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {!!questionHistory.length &&
              questionHistory[
                indexCurrentQuestion
              ]?.firstOdu?.leg0?.map((m, i) => (
                <h2
                  key={i}
                  className="markItemIsAsking"
                  style={{
                    textShadow,
                    color: !!questionHistory[
                      indexCurrentQuestion
                    ].firstOdu.randomColor
                      ? `${
                          "#" +
                          questionHistory[
                            indexCurrentQuestion
                          ].firstOdu.randomColor
                        }`
                      : "white",
                  }}
                >
                  {m === true ? "I" : "II"}
                </h2>
              ))}
          </div>
        </Grid>

        <Grid item xs={3.5}></Grid>

        {/* new row */}
        <Grid item xs={3.5}></Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {!!question?.secondOdu?.oduNames?.length && (
            <span
              className="oduQuestion"
              style={{
                textShadow: textShadow2,
                color: !!questionHistory[
                  indexCurrentQuestion
                ]?.secondOdu?.randomColor
                  ? `${
                      "#" + question?.secondOdu?.randomColor
                    }`
                  : "white",
              }}
            >
              {!!questionHistory.length &&
                !!question?.secondOdu?.oduNames?.length &&
                question?.secondOdu?.oduNames[0]}
            </span>
          )}
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {!!question?.firstOdu?.oduNames?.length && (
            <span
              className="oduQuestion"
              style={{
                textShadow: textShadow2,
                color: !!questionHistory[
                  indexCurrentQuestion
                ]?.firstOdu?.randomColor
                  ? `${
                      "#" + question?.firstOdu?.randomColor
                    }`
                  : "white",
              }}
            >
              {!!question?.firstOdu?.oduNames?.length &&
                question?.firstOdu?.oduNames[0]}
            </span>
          )}
        </Grid>
        <Grid item xs={3.5}></Grid>

        <Grid item xs={12}>
          {typeof question?.response === "boolean" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <span>{question?.question}</span>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {question?.response?.toString()}
              </h1>
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
