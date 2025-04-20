import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authServices } from "@/services/auth/auth-services";
import type {
  JWTExtended,
  SessionExtended,
  UserExtended,
} from "@/utils/types/auth";

import { env } from "./env/server";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 jam
  },
  secret: env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<UserExtended | null> {
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

        const result = await authServices.login({ identifier, password });
        const accessToken = result.data.data.token;
        if (!accessToken) return null;

        const resultUser = await authServices.getProfile(accessToken);
        const user = resultUser.data.data.user;
        if (!user) return null;

        user.accessToken = accessToken;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({
      token,
      session,
    }: {
      token: JWTExtended;
      session: SessionExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
};
