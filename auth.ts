// main next auth config

import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, createUser } from "@/lib/db-helpers";
import { randomUUID } from "crypto";
import { verifyPassword } from "@/lib/password";

const config: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const existingUser = await getUserByEmail(credentials.email as string);

        if (!existingUser) {
          throw new Error("No user found with this email");
        }

        if (!existingUser.password) {
          throw new Error(
            "This account uses OAuth. Please sign in with Google."
          );
        }

        const isValid = await verifyPassword(
          credentials.password as string,
          existingUser.password
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: existingUser.userId,
          email: existingUser.email,
          name: existingUser.name,
          image: existingUser.image,
        };
      },
    }),
  ],
  callbacks: {

    //sign up logic is implemented separately in app/api/auth/signup/route.ts
    
    async signIn({ user, account }: any) {
      if (!user?.email) return false;

      // Only create user for OAuth providers (Google)
      if (account?.provider === "google") {
        const existing = await getUserByEmail(user.email);

        if (!existing) {
          console.log("Creating new user:", user.email);

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
      }

      return true;
    },
    async session({ session, token }: any) {
      if (session.user && token.email) {
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
      if (user?.email) token.email = user.email;
      if (token.email) {
        const dbUser = await getUserByEmail(token.email);
        if (dbUser) {
          // enrich token for middleware
          token.role = dbUser.role;
          token.vendorVerified = dbUser.vendorVerified;
          token.userId = dbUser.userId;
        }
      }
      return token;
    },
  },
  pages: { signIn: "/auth/signin" },
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
export { config as authOptions }; // optional: keep for places still calling getServerSession bookings and auth api
