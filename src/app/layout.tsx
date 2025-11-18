import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import ResizableNavbar from "@/components/ResizableNavbar";
import { ChatProvider } from "@/context/ChatContext";
import ClientLayout from "@/components/ClientLayout";
import ClickSpark from "@/components/ClickSpark";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
  preload: true,
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
  preload: true,
});
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Abdellah - Frontend Developer Portfolio",
  description: "Personal Front-end Developer Portfolio showcasing modern web experiences with Next.js, React, and cutting-edge technologies.",
  keywords: ["Frontend Developer", "Web Developer", "React", "Next.js", "Portfolio", "UI/UX", "JavaScript"],
  authors: [{ name: "Abdellah" }],
  creator: "Abdellah",
  metadataBase: new URL('https://portfolio-knetero.vercel.app'),
  openGraph: {
    type: 'website',
    title: "Abdellah - Frontend Developer Portfolio",
    description: "Personal Front-end Developer Portfolio showcasing modern web experiences",
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
    title: "Abdellah - Frontend Developer Portfolio",
    description: "Personal Front-end Developer Portfolio showcasing modern web experiences",
    images: ["/picLink.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="custom-scrollbar overflow-x-hidden">
      <head>
        {/* Preconnect to speed up font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for any external resources */}
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased bg-dot-white/[0.2] relative overflow-x-hidden overflow-y-hidden`}
      >
        <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <ClickSpark
          sparkColor="#ffffff"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={8}
          duration={500}
          easing="ease-out"
          extraScale={1.2}
        >
          <ResizableNavbar />
          <div className="pt-16 relative">
            <ChatProvider>
              <ClientLayout>
                {children}
              </ClientLayout>
            </ChatProvider>
          </div>
        </ClickSpark>
      </body>
    </html>
  );
}