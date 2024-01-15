"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/providers/session-provider";
import NextAdapterApp from "next-query-params/app";
import { QueryParamProvider } from "use-query-params";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Taskerino App",
//   description: "Taskerino App made with the best stack in the world",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <QueryParamProvider adapter={NextAdapterApp}>
            <main className="flex min-h-screen max-w-screen-xl justify-center mx-auto">
              <div className="w-full">{children}</div>
            </main>
          </QueryParamProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
