import NextAuth from "next-auth";
import { authOptions } from "./lib/auth";

export const { auth, signIn, signOut } = NextAuth(authOptions);


