import { AxiosResponse } from "axios";
import { instance } from ".";

export const getPublicRequest = (
  token: string,
): Promise<AxiosResponse> => {
  return instance(token).get("public/auth/req");
};
export const getPrivateRequest = (
  token: string,
): Promise<AxiosResponse> => {
  return instance(token).get("private/auth/req");
};
