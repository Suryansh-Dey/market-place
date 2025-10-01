"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/common/button";

export default function SignInPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
        <h1>Sign in</h1>
        <p>Use Google to continue.</p>
        <div style={{ marginTop: 16 }}>
          <Button onClick={() => signIn("google", { callbackUrl: "/market" })}>
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}



