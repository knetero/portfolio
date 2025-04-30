"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface ChatNotificationProps {
  message: string;
  onOpen: () => void;
}

export default function ChatNotification({ message, onOpen }: ChatNotificationProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Play notification sound
    if (audioRef.current) {
      audioRef.current.play().catch(e => {
        console.error("Could not play notification sound:", e);
      });
    }
  }, []);

  // Limit message preview length
  const previewMessage = message.length > 35 ? message.substring(0, 35) + '...' : message;

  return (
    <>
      <audio ref={audioRef} src="/notification-smooth-modern-stereo-332449.mp3" />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: "spring", damping: 25 }}
        className="fixed bottom-24 right-5 w-[320px] sm:w-[360px] py-3 px-4 bg-black/90 rounded-2xl shadow-lg cursor-pointer z-[9999] backdrop-blur-sm border border-gray-700/50"
        onClick={onOpen}
      >
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white text-base">Abdellah'AI</h4>
            <p className="text-sm text-gray-200 mt-0.5">{previewMessage}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
} 