'use client';

import dynamic from 'next/dynamic';

// Dynamically import non-critical components with ssr: false
const ShootingStars = dynamic(
  () => import("@/components/ui/shooting-stars").then(mod => ({ default: mod.ShootingStars })), 
  {
    ssr: false,
    loading: () => null,
  }
);

const ChatButton = dynamic(
  () => import("@/components/ui/ChatButton"), 
  {
    ssr: false,
    loading: () => null,
  }
);

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <ShootingStars className="shooting-stars" />
      {children}
      <ChatButton />
    </>
  );
}

