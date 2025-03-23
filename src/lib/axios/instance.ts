import axios from "axios";

import { env } from "@/lib/env/client";

const headers = {
  "Content-Type": "application/json",
};

export const instance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  async (request) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);
