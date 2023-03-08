import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  ThunkDispatch,
  //   PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  red,
  yellow,
  lime,
  cyan,
  lightBlue,
  purple,
  pink,
  green,
} from "@mui/material/colors";
export interface Mark {
  legEntry: boolean;
  indexOfLeg: number;
}

export enum LegName {
  ogbe = "Ogbè",
  oyeku = "Ọ̀yẹ̀kú",
  iwori = "Ìwòrì",
  odi = "Òdí",
  irosun = "Ìrosùn",
  owonrin = "Ọ̀wọ́nrín",
  obara = "Ọ̀bàrà",
  okanran = "Ọ̀kànràn",
  ogunda = "Ògúndá",
  osa = "Ọ̀sá",
  ika = "Ìká",
  oturupon = "Òtúúrúpọ̀n",
  otura = "Òtúrá",
  irete = "Ìrẹ̀tẹ̀ ",
  ose = "Ọ̀ṣẹ́ ",
  ofun = "Òfún",
}

export interface OduItem {
  leg0: boolean[];
  leg1: boolean[];
  oduNames?: string[];
  randomColor?: string;
  createdAt?: string;
  questionPlace?: boolean;
  binId?: number;
}

export interface Question {
  question?: string;
  firstOdu: OduItem;
  secondOdu?: OduItem;
  response?: boolean;
}

export interface IfaCity {
  current: OduItem;
  indexCurrentOdu: number;
  indexCurrentQuestion: number;
  question?: Question;
  history: OduItem[];
  questionHistory: Question[];
  isFetching: boolean;
  isDivinationMode: boolean;
}

const initialState: IfaCity = {
  current: {
    leg0: [true, true, true, true],
    leg1: [true, true, true, true],
    oduNames: ["Èjìogbè"],
    createdAt: undefined,
    binId: 255,
  },
  indexCurrentOdu: 0,
  indexCurrentQuestion: 0,
  history: [],
  questionHistory: [],
  isFetching: false,
  isDivinationMode: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

const getLegName = (leg: boolean[]): LegName => {
  if (
    leg[0] === true &&
    leg[1] === true &&
    leg[2] === true &&
    leg[3] === true
  ) {
    return LegName.ogbe;
  } else if (
    leg[0] === false &&
    leg[1] === false &&
    leg[2] === false &&
    leg[3] === false
  ) {
    return LegName.oyeku;
  } else if (
    leg[0] === false &&
    leg[1] === true &&
    leg[2] === true &&
    leg[3] === false
  ) {
    return LegName.iwori;
  } else if (
    leg[0] === true &&
    leg[1] === false &&
    leg[2] === false &&
    leg[3] === true
  ) {
    return LegName.odi;
  } else if (
    leg[0] === true &&
    leg[1] === true &&
    leg[2] === false &&
    leg[3] === false
  ) {
    return LegName.irosun;
  } else if (
    leg[0] === false &&
    leg[1] === false &&
    leg[2] === true &&
    leg[3] === true
  ) {
    return LegName.owonrin;
  } else if (
    leg[0] === true &&
    leg[1] === false &&
    leg[2] === false &&
    leg[3] === false
  ) {
    return LegName.obara;
  } else if (
    leg[0] === false &&
    leg[1] === false &&
    leg[2] === false &&
    leg[3] === true
  ) {
    return LegName.okanran;
  } else if (
    leg[0] === true &&
    leg[1] === true &&
    leg[2] === true &&
    leg[3] === false
  ) {
    return LegName.ogunda;
  } else if (
    leg[0] === false &&
    leg[1] === true &&
    leg[2] === true &&
    leg[3] === true
  ) {
    return LegName.osa;
  } else if (
    leg[0] === false &&
    leg[1] === true &&
    leg[2] === false &&
    leg[3] === false
  ) {
    return LegName.ika;
  } else if (
    leg[0] === false &&
    leg[1] === false &&
    leg[2] === true &&
    leg[3] === false
  ) {
    return LegName.oturupon;
  } else if (
    leg[0] === true &&
    leg[1] === false &&
    leg[2] === true &&
    leg[3] === true
  ) {
    return LegName.otura;
  } else if (
    leg[0] === true &&
    leg[1] === true &&
    leg[2] === false &&
    leg[3] === true
  ) {
    return LegName.irete;
  } else if (
    leg[0] === true &&
    leg[1] === false &&
    leg[2] === true &&
    leg[3] === false
  ) {
    return LegName.ose;
  } else if (
    leg[0] === false &&
    leg[1] === true &&
    leg[2] === false &&
    leg[3] === true
  ) {
    return LegName.ofun;
  } else {
    console.log(leg);
    return LegName.ogbe;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getOduBinId = (legs: {
  leg0: boolean[];
  leg1: boolean[];
}): number => {
  const { leg0, leg1 } = legs;
  const oduArray = leg0.concat(leg1);
  let oduBinId: number = 0;
  let iValue: number = 1;
  for (const mark of oduArray) {
    oduBinId += Number(mark) * iValue;
    iValue = iValue * 2;
  }
  return oduBinId;
};

const nameOdu = (
  leg0: boolean[],
  leg1: boolean[],
): string => {
  const nameLeg0 = getLegName(leg0);
  const nameLeg1 = getLegName(leg1);
  let oduName: string;
  console.log({ leg0, leg1, nameLeg0, nameLeg1 });

  if (nameLeg0 === nameLeg1) {
    if (nameLeg0 === LegName.ogbe) {
      oduName = "Èjìogbè";
    } else if (nameLeg0 === LegName.ofun) {
      oduName = "Ọ̀ràngún";
    } else {
      oduName = `${nameLeg0} méjì`;
    }
  } else {
    oduName = `${nameLeg0} ${nameLeg1}`;
  }

  return oduName;
};

export const searchRoomAsync = createAsyncThunk<
  OduItem,
  {
    current: OduItem;
  },
  { state: RootState }
>("ifa/searchRoom", async (props: { current: OduItem }) => {
  const { current } = props;

  return current;
});

export const askQuestionAsync = createAsyncThunk<
  Question,
  { ibo: boolean; question?: string },
  {
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
    state: RootState;
  }
>(
  "ifa/askQuestion",
  async (
    props: { ibo: boolean; question?: string },
    { dispatch, getState },
  ) => {
    const { ibo, question } = props;
    await dispatch(castOdu());
    const firstOdu: OduItem = selectCurrentOdu(getState());
    let secondOdu: OduItem;
    if (
      // Ejiogbe
      JSON.stringify(firstOdu.leg0) ===
        JSON.stringify([true, true, true, true]) &&
      JSON.stringify(firstOdu.leg1) ===
        JSON.stringify([true, true, true, true])
    ) {
      const payload: Question = {
        response: !!ibo,
        question,
        firstOdu,
      };
      return payload;
    } else if (
      // orangun
      JSON.stringify(firstOdu.leg0) ===
        JSON.stringify([false, true, false, true]) &&
      JSON.stringify(firstOdu.leg1) ===
        JSON.stringify([false, true, false, true])
    ) {
      const payload: Question = {
        response: !!ibo,
        question,
        firstOdu,
      };
      return payload;
    } else {
      // throw second time
      await dispatch(castOdu());
      secondOdu = selectCurrentOdu(getState());

      if (
        // first odu is oju odu only
        JSON.stringify(firstOdu.leg0) ===
          JSON.stringify(firstOdu.leg1) &&
        (!secondOdu ||
          JSON.stringify(secondOdu?.leg0) !==
            JSON.stringify(secondOdu?.leg1))
      ) {
        const payload: Question = {
          response: !!ibo,
          question,
          firstOdu,
          secondOdu,
        };
        return payload;
      } else if (
        // secondOdu is oju odu only
        !!secondOdu &&
        JSON.stringify(secondOdu?.leg0) ===
          JSON.stringify(secondOdu?.leg1) &&
        JSON.stringify(firstOdu?.leg0) !==
          JSON.stringify(firstOdu?.leg1)
      ) {
        const payload: Question = {
          response: !ibo,
          question,
          firstOdu,
          secondOdu,
        };
        return payload;
        // both odu are oju odu or both are not oju odu
      } else {
        const firstOduLegsName: LegName = getLegName(
          firstOdu.leg0,
        );
        const secondOduLegsName: LegName = getLegName(
          secondOdu.leg0,
        );
        const indexOfFirst: number = Object.values(
          LegName,
        ).indexOf(firstOduLegsName);
        const indexOfSecond: number = Object.values(
          LegName,
        ).indexOf(secondOduLegsName);

        console.log({ indexOfFirst, indexOfSecond });

        if (indexOfFirst <= indexOfSecond) {
          const payload: Question = {
            response: !!ibo,
            question,
            firstOdu,
            secondOdu,
          };
          console.log({ payload });

          return payload;
        } else {
          const payload: Question = {
            response: !ibo,
            question,
            firstOdu,
            secondOdu,
          };

          console.log({ payload });

          return payload;
        }
      }
    }
  },
);

export const ifaSlice = createSlice({
  name: "ifa",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    castOdu: (state) => {
      const leg0: [boolean, boolean, boolean, boolean] = [
        !!Math.round(Math.random()),
        !!Math.round(Math.random()),
        !!Math.round(Math.random()),
        !!Math.round(Math.random()),
      ];

      const leg1: [boolean, boolean, boolean, boolean] = [
        !!Math.round(Math.random()),
        !!Math.round(Math.random()),
        !!Math.round(Math.random()),
        !!Math.round(Math.random()),
      ];
      const binId = getOduBinId({ leg0, leg1 });
      state.current = {
        leg0,
        leg1,
        binId,
      };

      if (!state.current.oduNames?.length) {
        const nameLeg0 = getLegName(leg0);
        const nameLeg1 = getLegName(leg1);
        console.log({ leg0, leg1, nameLeg0, nameLeg1 });

        const oduName: string = nameOdu(leg0, leg1);

        const oduNames = [oduName];

        const colors = [
          red.A700,
          yellow.A700,
          lime.A700,
          cyan.A200,
          lightBlue.A700,
          purple.A700,
          purple.A200,
          pink.A700,
          green.A400,
        ];

        let previousRandomColor = "";
        if (!!state.history.length) {
          previousRandomColor =
            state.history[0].randomColor || "white";
        } else {
          previousRandomColor = "white";
        }

        let randomColor =
          colors[
            Math.round((colors.length - 1) * Math.random())
          ];

        while (randomColor === previousRandomColor) {
          randomColor =
            colors[Math.round(7 * Math.random())];
        }
        const createdAt = new Date().toString();

        state.current = {
          ...state.current,
          oduNames,
          randomColor,
          createdAt,
        };
      }

      state.history = [state.current, ...state.history];
      if (state.history?.length > 16) {
        state.history = state.history.filter(
          (o) => state.history.indexOf(o) < 16,
        );
      }

      state.indexCurrentOdu = 0;
    },
    blankTrail: (state) => {
      state.current = initialState.current;
      state.question = initialState.question;
    },
    toggleIsDivinationMode: (state) => {
      state.isDivinationMode = !state.isDivinationMode;
    },
    initializeIndexCurrentOdu: (state) => {
      state.indexCurrentOdu = 0;
    },
    initializeIndexCurrentQuestion: (state) => {
      state.indexCurrentQuestion = 0;
    },
    incrementIndexCurrentOdu: (state) => {
      if (
        state.indexCurrentOdu <
        state.history.length - 1
      ) {
        state.indexCurrentOdu += 1;
      }
    },
    decrementIndexCurrentOdu: (state) => {
      if (state.indexCurrentOdu > 0) {
        state.indexCurrentOdu += -1;
      }
    },
    incrementIndexCurrentQuestion: (state) => {
      if (
        state.indexCurrentQuestion <
        state.questionHistory.length - 1
      ) {
        state.indexCurrentQuestion += 1;
      }
    },
    decrementIndexCurrentQuestion: (state) => {
      if (state.indexCurrentQuestion > 0) {
        state.indexCurrentQuestion -= 1;
      }
    },
    modifyCurrentOdu: (
      state,
      action: PayloadAction<{
        mark: Mark;
        currentOdu: OduItem;
      }>,
    ) => {
      if (action.payload) {
        const { mark } = action.payload;

        const { legEntry, indexOfLeg } = mark;

        if (legEntry === false) {
          state.current = {
            ...state.current,
            leg0: state.current.leg0.map((m, i) => {
              if (i === indexOfLeg) {
                return !m;
              } else return !!m;
            }),
          };
          // const nameLeg0 = getLegName(state.current.leg0);
          // state.current = { ...state.current, nameLeg0 };
        } else if (legEntry === true) {
          state.current = {
            ...state.current,
            leg1: state.current.leg1.map((m, i) => {
              if (i === indexOfLeg) {
                return !m;
              } else return !!m;
            }),
          };
          // const nameLeg1 = getLegName(state.current.leg1);
          // state.current = { ...state.current, nameLeg1 };
        }
        const binId = getOduBinId({
          leg0: state.current.leg0,
          leg1: state.current.leg1,
        });

        const oduName = nameOdu(
          state.current.leg0,
          state.current.leg1,
        );

        state.current = {
          ...state.current,
          binId,
          oduNames: [oduName],
        };

        state.history = [state.current, ...state.history];
        if (state.history?.length > 16) {
          state.history = state.history.filter(
            (o) => state.history.indexOf(o) < 16,
          );
        }
      }
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(searchRoomAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        searchRoomAsync.fulfilled,
        (state, action) => {
          state.isFetching = false;
          if (!!action.payload) {
            state.current = action.payload;
          }
        },
      )
      .addCase(
        searchRoomAsync.rejected,
        (state, action) => {
          console.log(action);

          state.isFetching = false;
        },
      )
      .addCase(askQuestionAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        askQuestionAsync.fulfilled,
        (state, action) => {
          state.isFetching = false;
          if (!!action.payload) {
            const question = action.payload;
            state.question = question;
            state.questionHistory = [
              question,
              ...state.questionHistory,
            ];
            if (state.questionHistory?.length > 16) {
              state.questionHistory =
                state.questionHistory.filter(
                  (o) =>
                    state.questionHistory.indexOf(o) < 16,
                );
            }

            state.indexCurrentQuestion = 0;
          }
        },
      )
      .addCase(
        askQuestionAsync.rejected,
        (state, action) => {
          console.log(action);

          state.isFetching = false;
        },
      );
  },
});

export const {
  castOdu,
  blankTrail,
  toggleIsDivinationMode,
  modifyCurrentOdu,
  incrementIndexCurrentOdu,
  incrementIndexCurrentQuestion,
  decrementIndexCurrentQuestion,
  decrementIndexCurrentOdu,
  initializeIndexCurrentOdu,
  initializeIndexCurrentQuestion,
} = ifaSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectCurrentOdu = (state: RootState) =>
  state.ifa.current;
export const selectOduHistory = (state: RootState) =>
  state.ifa.history;

export const selectQuestionHistory = (state: RootState) =>
  state.ifa.questionHistory;
export const selectQuestion = (state: RootState) =>
  state.ifa.question;
export const selectIndexCurrentOdu = (state: RootState) =>
  state.ifa.indexCurrentOdu;
export const selectIndexCurrentQuestion = (
  state: RootState,
) => state.ifa.indexCurrentQuestion;
export const selectIsDivinationMode = (state: RootState) =>
  state.ifa.isDivinationMode;

export default ifaSlice.reducer;
