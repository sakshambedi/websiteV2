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
  title: {
    default: SiteConfig.title,
    template: `%s | ${SiteConfig.title}`,
  },
  description: SiteConfig.description,
  metadataBase: new URL(SiteConfig.url),
  openGraph: {
    type: "website",
    url: SiteConfig.url,
    title: SiteConfig.title,
    description: SiteConfig.description,
    siteName: SiteConfig.siteName,
    images: [
      {
        url: SiteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: SiteConfig.title,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SiteConfig.title,
    description: SiteConfig.description,
    images: [SiteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
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
