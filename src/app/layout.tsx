import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abdellah",
  description: "Personal Front-end Developer Portfolio",
  openGraph: {
    type: 'website',
    title: "Abdellah",
    description: "Personal Front-end Developer Portfolio",
    images: [
      {
        url: "/Images/picLink.png", // Adjust this path to match your image location
        width: 1200,
        height: 630,
        alt: "Abdellah - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdellah",
    description: "Personal Front-end Developer Portfolio",
    images: ["/Images/picLink.png"], // Adjust this path to match your image location
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="custom-scrollbar">
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ShootingStars className="shooting-stars" />
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}