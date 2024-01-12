"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";

export const GoogleLoginButton = () => {
  return (
    <Button
      className="flex gap-2 items-center text-lg py-2"
      onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })}
    >
      <span className="text-sm">Login with Google</span>
      <FaGoogle />
    </Button>
  );
};
