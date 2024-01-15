"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  return (
    <button
      type="button"
      className="py-1 px-2 bg-white rounded-md text-gray-900 text-sm font-medium hover:bg-gray-300 transition-colors"
      onClick={() => signOut()}
    >
      Log out
    </button>
  );
};
