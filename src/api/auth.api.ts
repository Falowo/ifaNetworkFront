import { AxiosResponse } from "axios";
import {  instance } from ".";


export const getRequest = (): Promise<AxiosResponse> => {
  return instance().get("auth/req");
};

