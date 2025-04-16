import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import React from "react";
import { cn } from "@/lib/utils"
import SiteConfig from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import HeadResume from "@/config/head";
import localFont from 'next/font/local'


const HackNF = localFont({
  src: [
    {
      path: '../public/fonts/HackNF/FiraCodeNerdFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-hackNF'
})


const RebondG = localFont({
  src: [
    {
      path: '../public/fonts/Rebond-Grotesque/RebondGrotesque-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-Rebond'
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto'
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
      <HeadResume />
      <body className={cn("w-screen font-sans antialiased flex flex-row justify-center phone:w-screen phone:overflow-x-hidden md:w-screen md:overflow-x-hidden overflow-x-hidden ", roboto.variable, RebondG.variable, HackNF.variable)}>
        <Analytics />
        <SpeedInsights />
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
