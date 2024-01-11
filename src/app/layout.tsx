import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/providers/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ToDo App",
  description: "ToDo App made with the best stack in the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <main className="flex min-h-screen max-w-screen-xl justify-center mx-auto">
            <div className="w-full">{children}</div>
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
