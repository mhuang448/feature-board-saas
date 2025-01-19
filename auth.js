import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongo";
import Resend from "next-auth/providers/resend";
import Google from "next-auth/providers/google";

const config = {
  providers: [
    Resend({
      from: "support@resend.yizzygroup.com",
      apiKey: process.env.RESEND_KEY,
      name: "Email",
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      name: "Google",
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
