import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import ResizableNavbar from "@/components/ResizableNavbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import SmoothScroll from "@/components/SmoothScroll";
import { ChatProvider } from "@/context/ChatContext";
import ChatButton from "@/components/ui/ChatButton";

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
        url: "/picLink.png",
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
    images: ["/picLink.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="custom-scrollbar overflow-x-hidden">
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased bg-dot-white/[0.2] relative overflow-x-hidden overflow-y-hidden`}
      >
        <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <SmoothScroll>
          <ShootingStars className="shooting-stars" />
          <ResizableNavbar />
          <div className="pt-16 relative">
            {children}
          </div>
        </SmoothScroll>
        
        <ChatProvider>
          <ChatButton />
        </ChatProvider>
      </body>
    </html>
  );
}