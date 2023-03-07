import { instance, publicInstance } from ".";
import { User } from "@auth0/auth0-react";
import { AxiosResponse } from "axios";

// public

export const getOrCreateCurrentUser = (
  authUser: User,
): Promise<AxiosResponse> => {
  return publicInstance().post(
    "public/currentUser/getOrCreate",
    { authUser },
  );
};

// private

export const getOrCreateCurrentUserSecure = (
  accessToken: string,
  authUser: User,
): Promise<AxiosResponse> => {
  return instance(accessToken).post(
    "private/currentUser/getOrCreate",
    { authUser },
  );
};
