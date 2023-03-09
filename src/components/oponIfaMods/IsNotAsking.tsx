import React, { useEffect, useState } from "react";
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

export default function IsNotAsking(props: {
  isDivinationMode: boolean;
}) {
  const { isDivinationMode } = props;
  console.log({ isDivinationMode });
  const [markItemClassName, setMarkItemClassName] =
    useState("markItem");
  const dispatch = useAppDispatch();
  const currentOdu = useAppSelector(selectCurrentOdu);
  console.log({ currentOdu });

  const oduHistory = useAppSelector(selectOduHistory);
  const indexCurrentOdu = useAppSelector(
    selectIndexCurrentOdu,
  );
  const textShadow = "-4px 1px #002021";

  const [odu, setOdu] = useState(currentOdu);

  useEffect(() => {
   if (indexCurrentOdu === 0){
      setOdu(currentOdu);
    }else{
      setOdu(oduHistory[indexCurrentOdu]);
    }
      
  }, [currentOdu, indexCurrentOdu, oduHistory]);

  useEffect(() => {
    if (indexCurrentOdu === 0) {
      if (
        window.screen.width >= 1280 
      ) {
        setMarkItemClassName("markItem");
      } else if (
        window.screen.width < 1280
      ) {
        setMarkItemClassName("mobileMarkItem");
      } else {
        setMarkItemClassName("markItemIsAsking");
      }
    } else {
      setMarkItemClassName("markItemIsAsking");
    }
  }, [indexCurrentOdu, isDivinationMode]);

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
            {!!odu &&
              odu?.leg1?.map((m: boolean, i: number) => (
                <h2
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    !isDivinationMode &&
                      e.stopPropagation();

                    const mark: Mark = {
                      legEntry: true,
                      indexOfLeg: i,
                    };
                    const payload = {
                      mark,
                      currentOdu,
                    };
                    
                      indexCurrentOdu === 0 &&
                        dispatch(modifyCurrentOdu(payload));
                    
                  }}
                  className={markItemClassName}
                  style={{
                    textShadow,
                    color: !!odu.randomColor
                      ? odu.randomColor
                      : "inherit",
                  }}
                >
                  {m === true ? "I" : "II"}
                </h2>
              ))}
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
            {!!odu &&
              odu.leg0?.map((m, i) => (
                <h2
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    !isDivinationMode &&
                      e.stopPropagation();
                    const mark: Mark = {
                      legEntry: false,
                      indexOfLeg: i,
                    };
                    const payload = { mark, currentOdu };
                    // if (window.screen.width >= 1280) {
                    
                      indexCurrentOdu === 0 &&
                        dispatch(modifyCurrentOdu(payload));
                    
                  }}
                  className={markItemClassName}
                  style={{
                    textShadow,
                    color: !!odu.randomColor
                      ? odu.randomColor
                      : "inherit",
                  }}
                >
                  {m === true ? "I" : "II"}
                </h2>
              ))}
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
