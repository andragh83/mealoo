import type { Metadata } from "next";
import { Righteous, Raleway } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: "400",
  variable: "--raleway-font",
});

const ralewayLight = Raleway({
  subsets: ["latin"],
  weight: "300",
  variable: "--raleway-light-font",
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
          className={`${raleway.variable} ${ralewayLight.variable} ${righteous.variable}`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
