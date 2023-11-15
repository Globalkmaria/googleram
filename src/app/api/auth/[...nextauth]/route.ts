import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { addUser } from "@/service/user";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signIn",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user: { id, email, image, name } }) {
      if (!email) return false;

      const result = await addUser({
        id: id,
        email: email,
        image: image,
        name: name || "",
        username: email.split("@")[0],
      });

      if (!result) return false;

      return true;
    },
    async session({ session, token }) {
      const user = session?.user;

      if (user) {
        session.user = {
          ...user,
          id: token.sub || "",
          username: user.email?.split("@")[0] || "",
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
