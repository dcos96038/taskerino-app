"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export const GoogleLoginButton = () => {
  return (
    <button
      type="button"
      className="p-3 bg-black text-white rounded-md hover:bg-gray-800 flex items-center gap-2 text-lg"
      onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })}
    >
      <span className="text-sm">Login with Google</span>
      <FaGoogle />
    </button>
  );
};
