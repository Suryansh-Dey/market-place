import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUserByEmail, createUser } from "./db-helpers";
import { randomUUID } from "crypto";

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      if (!user.email) return false;
      
      // Check if user exists in database
      const existingUser = await getUserByEmail(user.email);
      
      // If user doesn't exist, create new user with default role "user"
      if (!existingUser) {
        await createUser({
          userId: randomUUID(),
          name: user.name || "",
          email: user.email,
          image: user.image || undefined,
          role: "user",
          vendorVerified: false,
          createdAt: new Date().toISOString(),
        });
      }
      
      return true;
    },
    async session({ session, token }: any) {
      if (session.user && token.email) {
        // Fetch user from database to get role and verification status
        const dbUser = await getUserByEmail(token.email);
        
        if (dbUser) {
          session.user.id = dbUser.userId;
          session.user.role = dbUser.role;
          session.user.vendorVerified = dbUser.vendorVerified;
        }
      }
      
      return session;
    },
    async jwt({ token, user }: any) {
      if (user && user.email) {
        token.email = user.email;
      }
      // Enrich token with role/vendorVerified for middleware checks
      if (token.email) {
        const dbUser = await getUserByEmail(token.email);
        if (dbUser) {
          // @ts-ignore augment token shape
          token.role = dbUser.role;
          // @ts-ignore
          token.vendorVerified = dbUser.vendorVerified;
          // @ts-ignore
          token.userId = dbUser.userId;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
