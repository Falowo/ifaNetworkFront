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
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
      "cache-control": "no-cache",
    },
    data: { grant_types: "authorization_code" },
  });



// export const authInstance = axios.create({
//   baseURL: url,
//   timeout: 60000,
// });
