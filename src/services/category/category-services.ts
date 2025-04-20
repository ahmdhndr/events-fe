import { instance } from "@/lib/axios/instance";
import { ENDPOINT } from "@/utils/constants/endpoint.constant";
import { ICategory } from "@/utils/types/category";

export const categoryServices = {
  getCategories: (params: string) =>
    instance.get(`${ENDPOINT.CATEGORY}?${params}`),
  addCategory: (payload: ICategory) =>
    instance.post(`${ENDPOINT.CATEGORY}`, payload),
};
