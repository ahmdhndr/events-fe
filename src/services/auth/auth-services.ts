import { instance } from "@/lib/axios/instance";
import { ENDPOINT } from "@/utils/constants/endpoint.constant";
import type { IActivation, ILogin, IRegister } from "@/utils/types/auth";

export const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${ENDPOINT.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    instance.post(`${ENDPOINT.AUTH}/activation`, payload),
  login: (payload: ILogin) => instance.post(`${ENDPOINT.AUTH}/login`, payload),
  getProfile: (token: string) =>
    instance.get(`${ENDPOINT.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
