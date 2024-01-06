import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";
import { dark, neobrutalism } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AGES ",
  description: "Account Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        // signIn: { baseTheme: neobrutalism },
      }}
    >
      <html lang="en" className="dark">
        <body className={inter.className}>
          <Toaster position="bottom-right" richColors />
          <NextTopLoader color="#12A150" />
          <Providers>{children} </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
