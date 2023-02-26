import axios from "axios";

export const url = process.env.REACT_APP_API_URL;

// export const instance = () =>
//   axios.create({
//     baseURL: url,
//     timeout: 60000,
//     headers: {
//       "x-auth-token": localStorage.getItem("token") || "",
//     },
//   });

// export const authInstance = axios.create({
//   baseURL: url,
//   timeout: 60000,
// });
export const instance = (token: string) =>
  axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { grant_types: "authorization_code" },
  });

export const publicInstance = () =>
  axios.create({
    baseURL: url,
  });

// export const authInstance = axios.create({
//   baseURL: url,
//   timeout: 60000,
// });
