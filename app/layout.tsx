import type { Metadata } from "next";
import { Righteous, Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--roboto-font",
});

const robotoLight = Roboto({
  subsets: ["latin"],
  weight: "300",
  variable: "--roboto-light-font",
});

const righteous = Righteous({
  subsets: ["latin"],
  weight: "400",
  variable: "--righteous-font",
});

export const metadata: Metadata = {
  title: "Next.js PXCI starter",
  description: "Your next app powered by Prisma, Xata, Clerk, and Inngest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${roboto.variable} ${robotoLight.variable} ${righteous.variable}`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
