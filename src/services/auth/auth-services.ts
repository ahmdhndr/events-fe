import { instance } from "@/lib/axios/instance";
import { ENDPOINT } from "@/utils/constants/endpoint.constant";
import type { IActivation, IRegister } from "@/utils/types/auth";

export const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${ENDPOINT.AUTH}/register`, payload),
  activation: (payload: IActivation) =>
    instance.post(`${ENDPOINT.AUTH}/activation`, payload),
};
