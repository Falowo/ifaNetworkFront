import { AxiosResponse } from "axios";
import { instance } from ".";

export const getRequest = (
  token: string,
): Promise<AxiosResponse> => {
  return instance(token).get("auth/req");
};
