import axios from "axios";

export const url = process.env.REACT_APP_API_URL;

const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const clientId = process.env.REACT_APP_CLIENT_ID;

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
export const instance = () =>
  axios.create({
    baseURL: url,
    timeout: 60000,
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId!,
      client_secret: clientSecret!,
      audience: 'YOUR_API_IDENTIFIER'
    })
  });

// export const authInstance = axios.create({
//   baseURL: url,
//   timeout: 60000,
// });


