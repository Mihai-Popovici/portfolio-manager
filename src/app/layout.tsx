import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Manager",
  description: "A portfolio manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" /> 
        </head>
        <body className={cn(inter.className, "")}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
