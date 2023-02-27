import React from "react";
import { Grid } from "@mui/material";
import {
  useAppDispatch,
  useAppSelector,
} from "../../app/hooks";
import {
  // castOdu,
  Mark,
  modifyCurrentOdu,
  selectCurrentOdu,
  selectIndexCurrentOdu,
  selectOduHistory,
} from "../../app/slices/ifaSlice";
// import * as timeago from "timeago.js";

export default function IsNotAsking() {
  const dispatch = useAppDispatch();
  const currentOdu = useAppSelector(selectCurrentOdu);
  const oduHistory = useAppSelector(selectOduHistory);
  const indexCurrentOdu = useAppSelector(
    selectIndexCurrentOdu,
  );
  const textShadow = "-4px 1px #002021";

  return (
    <div style={{ marginTop: "10%" }}>
      <Grid
        container
        spacing={1}
        width="100%"
        margin="0 auto"
      >
        <Grid item xs={4.5}></Grid>
        <Grid item xs={1.5}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {!!currentOdu &&
              !!oduHistory &&
              oduHistory[indexCurrentOdu]?.leg1?.map(
                (m: boolean, i: number) => (
                  <h2
                    key={i}
                    onClick={(e) => {
                      window.screen.width >= 1280 &&
                        e.stopPropagation();
                      const mark: Mark = {
                        legEntry: true,
                        indexOfLeg: i,
                      };
                      const payload = {
                        mark,
                        currentOdu,
                      };
                      if (window.screen.width >= 1280) {
                        indexCurrentOdu === 0 &&
                          dispatch(
                            modifyCurrentOdu(payload),
                          );
                      }
                    }}
                    className={
                      window.screen.width >= 1280
                        ? "markItem"
                        : "mobileMarkItem"
                    }
                    style={{
                      textShadow,
                      color: !!oduHistory[indexCurrentOdu]
                        .randomColor
                        ? `${
                            "#" +
                            oduHistory[indexCurrentOdu]
                              .randomColor
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
        <Grid item xs={1.5}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            {!!currentOdu &&
              !!oduHistory.length &&
              oduHistory[indexCurrentOdu].leg0?.map(
                (m, i) => (
                  <h2
                    key={i}
                    onClick={(e) => {
                      window.screen.width >= 1280 &&
                        e.stopPropagation();
                      const mark: Mark = {
                        legEntry: false,
                        indexOfLeg: i,
                      };
                      const payload = { mark, currentOdu };
                      if (window.screen.width >= 1280) {
                        indexCurrentOdu === 0 &&
                          dispatch(
                            modifyCurrentOdu(payload),
                          );
                      }
                    }}
                    className={
                      window.screen.width >= 1280
                        ? "markItem"
                        : "mobileMarkItem"
                    }
                    style={{
                      textShadow,
                      color: !!oduHistory[indexCurrentOdu]
                        .randomColor
                        ? `${
                            "#" +
                            oduHistory[indexCurrentOdu]
                              .randomColor
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

        <Grid
          item
          xs={4.5}
          style={{
            display: "flex",
          }}
        ></Grid>

        <Grid item xs={8}></Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  );
}
