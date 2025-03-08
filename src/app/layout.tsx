import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProviderWrapper from "@/store/ProviderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png", // Change this to your favicon file
  },
  title: "IMDB-NEXT-2025",
  description: "Find Your Movies & Shows Reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: "#04152d",
        }}
      >
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
