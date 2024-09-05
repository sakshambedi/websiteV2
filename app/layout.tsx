
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { cn } from "@/lib/utils"
import SiteConfig from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/react';


const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={cn("w-screen max-w-fullfont-sans antialiased flex flex-row justify-center phone:-min-w-screen phone:overflow-x-hidden md:overflow-x-hidden", robotoMono.variable)}>
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </ html >
  );
}