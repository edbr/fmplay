import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Framer Motion Playground — Eduardo Belluti",
  description:
    "Created by Eduardo Belluti, a Lead Product Designer blending motion design, interactivity, and playful learning tools. Experiment with Framer Motion animations in real time.",
  authors: [{ name: "Eduardo Belluti", url: "https://edbelluti.com" }],
  openGraph: {
    title: "Framer Motion Playground — Eduardo Belluti",
    description:
      "An interactive sandbox for exploring motion design, by Eduardo Belluti.",
    url: "https://fmplay.vercel.app",
    siteName: "Framer Motion Playground",
    images: [
      {
        url: "https://edbelluti.com/_next/image?url=https%3A%2F%2Fedbee-vercel.s3.us-east-2.amazonaws.com%2FprofileImg.png&w=3840&q=75",
        width: 1200,
        height: 630,
        alt: "Framer Motion Playground preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@edbelluti",
    title: "Framer Motion Playground — Eduardo Belluti",
    description: "An interactive motion design sandbox by Eduardo Belluti.",
  },
  icons: {
    icon: "/fav.svg",
  },
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
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
