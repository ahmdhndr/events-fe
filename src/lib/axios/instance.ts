import axios from "axios";
import { getSession } from "next-auth/react";

import { env } from "@/lib/env/client";
import { SessionExtended } from "@/utils/types/auth";

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
    const session: SessionExtended | null = await getSession();
    console.log("session instance \n", session);

    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
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
