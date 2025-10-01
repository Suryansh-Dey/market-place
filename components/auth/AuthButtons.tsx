"use client";

import { Button } from "../common/button";
import { signIn, signOut } from "next-auth/react";

export default function AuthButtons({ name }: { name?: string }) {
  return (
    <>
      {name ? (
        <>
          <span>{name}</span>
          <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</Button>
        </>
      ) : (
        <Button onClick={() => signIn(undefined, { callbackUrl: "/trips" })}>Sign in</Button>
      )}
    </>
  );
}


