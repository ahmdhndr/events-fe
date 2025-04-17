import { instance } from "@/lib/axios/instance";
import { ENDPOINT } from "@/utils/constants/endpoint.constant";

const formDataHeader = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

type TFileURL = {
  fileUrl: string;
};

export const mediaServices = {
  upload: (payload: FormData) =>
    instance.post(`${ENDPOINT.MEDIA}/upload-single`, payload, formDataHeader),
  remove: (payload: TFileURL) =>
    instance.delete(`${ENDPOINT.MEDIA}/remove`, { data: payload }),
};
