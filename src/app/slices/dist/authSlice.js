"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a;
exports.__esModule = true;
exports.selectToken = exports.selectAuthUser = exports.setToken = exports.toggleDarkMode = exports.authSlice = exports.tryTheRequestAndDbAsync = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var auth_api_1 = require("../../api/auth.api");
var react_toastify_1 = require("react-toastify");
// import { AxiosResponse } from "axios";
var position = {
    position: react_toastify_1.toast.POSITION.BOTTOM_RIGHT
};
var initialState = {
    authUser: undefined,
    token: undefined,
    isFetching: false,
    error: false,
    darkMode: false
};
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
exports.tryTheRequestAndDbAsync = toolkit_1.createAsyncThunk("auth/tryTheRequestAndDb", function (anyString, _a) {
    var dispatch = _a.dispatch, getState = _a.getState;
    return __awaiter(void 0, void 0, void 0, function () {
        var token, privateResponse, privateRequestData;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(anyString);
                    token = exports.selectToken(getState());
                    console.log(token);
                    if (!!!token) return [3 /*break*/, 2];
                    return [4 /*yield*/, auth_api_1.getPrivateRequest(token)];
                case 1:
                    privateResponse = _b.sent();
                    privateRequestData = response.data;
                    return [2 /*return*/, privateRequestData];
                case 2: return [2 /*return*/, null];
            }
        });
    });
});
exports.authSlice = toolkit_1.createSlice({
    name: "auth",
    initialState: initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        // Use the PayloadAction type to declare the contents of `action.payload`
        toggleDarkMode: function (state, action) {
            state.darkMode = action
                ? action.payload
                : !state.darkMode;
        },
        setToken: function (state, action) {
            state.token = action.payload;
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: function (builder) {
        builder
            .addCase(exports.tryTheRequestAndDbAsync.pending, function (state) {
            state.isFetching = true;
        })
            .addCase(exports.tryTheRequestAndDbAsync.fulfilled, function (state, action) {
            var req = action.payload;
            state.isFetching = false;
            console.log({ req: req });
        })
            .addCase(exports.tryTheRequestAndDbAsync.rejected, function (state, action) {
            state.isFetching = false;
            react_toastify_1.toast(action.error.message, position);
        });
    }
});
exports.toggleDarkMode = (_a = exports.authSlice.actions, _a.toggleDarkMode), exports.setToken = _a.setToken;
exports.selectAuthUser = function (state) {
    return state.auth.authUser;
};
exports.selectToken = function (state) {
    return state.auth.token;
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
exports["default"] = exports.authSlice.reducer;
