"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <button
      className="py-1 px-2 bg-gray-100 rounded-md text-black"
      onClick={() => signOut()}
    >
      Log out
    </button>
  );
};
