import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import ifaReducer from "./slices/ifaSlice";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";

export const rootReducer = combineReducers({
  ifa: ifaReducer,
  auth: authReducer,
  post: postReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
