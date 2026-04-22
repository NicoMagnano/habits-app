import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PWAInstaller } from "@/components/PWAInstaller";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HabitTracker - Registro de Hábitos Diarios",
  description: "Controla y visualiza tus hábitos diarios con reportes detallados",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HabitTracker",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect fill='%2310b981' width='192' height='192'/><path fill='white' d='M60 96l24 24 48-48' stroke='white' stroke-width='8' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
        type: "image/svg+xml",
      },
    ],
    apple: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect fill='%2310b981' width='192' height='192'/><path fill='white' d='M60 96l24 24 48-48' stroke='white' stroke-width='8' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="HabitTracker" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect fill='%2310b981' width='192' height='192'/><path fill='white' d='M60 96l24 24 48-48' stroke='white' stroke-width='8' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>" />
      </head>
      <body className="min-h-full flex flex-col">
        <PWAInstaller />
        {children}
      </body>
    </html>
  );
}
