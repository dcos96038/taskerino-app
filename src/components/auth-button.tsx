"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export const AuthButton = () => {
  const { data } = useSession();

  return data ? (
    <button
      className="py-1 px-2 bg-gray-100 rounded-md text-black"
      onClick={() => signOut()}
    >
      Log out
    </button>
  ) : (
    <button
      onClick={() => signIn("google")}
      className="py-1 px-2 bg-gray-100 rounded-md text-black"
    >
      Sign in
    </button>
  );
};
