import { instance } from "@/lib/axios/instance";
import { ENDPOINT } from "@/utils/constants/endpoint.constant";

export const categoryServices = {
  getCategories: (params: string) =>
    instance.get(`${ENDPOINT.CATEGORY}?${params}`),
};
