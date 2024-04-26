import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { LINK } from "@/constants/link.constants";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_JSON_SERVER_URL;

const handler: NextAuthOptions = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "이메일",
          type: "email",
          placeholder: "test@gmail.com",
        },
        password: { label: "비밀번호", type: "passwogrd" },
      },

      async authorize(credentials, req) {
        try {
          const { data } = await axios.post("/login", credentials);
          return data;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error(
              "로그인에 실패했습니다. 로그인정보를 확인해 주세요.",
            );
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      {
        session.user = token as any;
        return session;
      }
    },
  },
  // 로그인페이지 설정
  pages: {
    signIn: LINK.LOG_IN,
  },
});

export { handler as GET, handler as POST };
