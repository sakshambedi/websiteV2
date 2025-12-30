import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import React from "react";
import { cn } from "@/lib/utils"
import SiteConfig from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider"
import { GSAPProvider } from "@/components/providers/GSAPProvider"
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import HeadResume from "@/config/head";
import localFont from 'next/font/local'
import ClientCursor from '@/components/ClientCursor'

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
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <HeadResume />
      <body className={cn(
        "min-h-screen w-screen font-sans antialiased flex flex-row justify-center overflow-x-hidden bg-background text-foreground",
        roboto.variable,
        RebondG.variable,
        HackNF.variable
      )}>
        <Analytics />
        <SpeedInsights />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <GSAPProvider>
            {children}
            <ClientCursor />
          </GSAPProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
