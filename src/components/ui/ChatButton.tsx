"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from '@/components/ui/ChatWindow';
import ChatNotification from '@/components/ui/ChatNotification';
import { useChat } from '@/context/ChatContext';

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const { hasNewResponse, lastResponsePreview, clearNewResponse, lastScrollPosition, saveScrollPosition } = useChat();

  const toggleChat = () => {
    // If closing the chat, save scroll position
    if (isOpen) {
      const chatContainer = document.querySelector('.overflow-y-auto');
      if (chatContainer) {
        saveScrollPosition(chatContainer.scrollTop);
      }
    } else {
      // If opening the chat, we'll restore the position once it's rendered
      setTimeout(() => {
        const chatContainer = document.querySelector('.overflow-y-auto');
        if (chatContainer) {
          // If we have a saved position and it's not the first time opening
          if (lastScrollPosition > 0) {
            chatContainer.scrollTop = lastScrollPosition;
          } else {
            // If first time opening or no saved position, scroll to bottom
            const messagesEnd = document.querySelector('#messages-end');
            messagesEnd?.scrollIntoView({ behavior: 'auto' });
            
            // Alternative method to scroll to bottom if needed
            if (!messagesEnd) {
              chatContainer.scrollTop = chatContainer.scrollHeight;
            }
          }
        }
      }, 100); // Small delay to ensure the chat window is rendered
    }
    
    setIsOpen((prev) => !prev);
    if (hasNewResponse) {
      clearNewResponse(); // Clear notification when chat is opened
    }
  };
  
  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking on chat button container or if already closed
      if (!isOpen || (chatRef.current && chatRef.current.contains(event.target as Node))) {
        return;
      }
      
      // Check if clicked on chat window or its children
      const chatWindow = document.querySelector('[data-chat-window]');
      if (chatWindow && chatWindow.contains(event.target as Node)) {
        return;
      }
      
      // If we get here, user clicked outside both the chat button and chat window
      setIsOpen(false);
    };
    
    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div id="chat-button-container" className="chat-button-fixed" ref={chatRef}>
      <motion.button
        className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            
            {hasNewResponse && (
              <motion.span
                className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </>
        )}
      </motion.button>

      {/* Keep ChatWindow mounted but toggle visibility with CSS */}
      <div className={isOpen ? "block" : "hidden"}>
        <ChatWindow onClose={toggleChat} />
      </div>
        
      {/* Show notification when chat is closed but has new response */}
      <AnimatePresence>
        {!isOpen && hasNewResponse && (
          <ChatNotification 
            message={lastResponsePreview} 
            onOpen={toggleChat} 
          />
        )}
      </AnimatePresence>
    </div>
  );
} 