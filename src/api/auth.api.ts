import { AxiosResponse } from "axios";
import { instance } from ".";

export const getPublicRequest = (
  token: string,
): Promise<AxiosResponse> => {
  return instance(token).get("auth/public/req");
};
export const getPrivateRequest = (
  token: string,
): Promise<AxiosResponse> => {
  return instance(token).get("auth/private/req");
};
