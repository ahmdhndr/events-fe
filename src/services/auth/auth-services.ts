import { instance } from "@/lib/axios/instance";
import { ENDPOINT } from "@/utils/constants/endpoint.constant";
import { IRegister } from "@/utils/types/auth";

export const authServices = {
  register: (payload: IRegister) =>
    instance.post(`${ENDPOINT.AUTH}/register`, payload),
};
