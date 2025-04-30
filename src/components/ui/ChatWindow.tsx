"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChat } from '@/context/ChatContext';

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const { messages, isLoading, addMessage, resetChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const firstRenderRef = useRef(true);
  const [isChatFocused, setIsChatFocused] = useState(false);
  const [bodyScrollY, setBodyScrollY] = useState(0);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const previousMessagesLengthRef = useRef(messages.length);

  // Only scroll to bottom when new messages are added
  useEffect(() => {
    // If this is a new message (not just reopening the chat)
    if (messages.length > previousMessagesLengthRef.current) {
      setShouldScrollToBottom(true);
      
      // Force scroll to bottom after a short delay to ensure render is complete
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    previousMessagesLengthRef.current = messages.length;
  }, [messages.length]);

  // Handle the actual scrolling, only when needed
  useEffect(() => {
    if (shouldScrollToBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setShouldScrollToBottom(false);
    }
  }, [shouldScrollToBottom]);

  // Special case: when opening chat with existing messages, scroll to bottom
  useEffect(() => {
    if (firstRenderRef.current && messages.length > 0) {
      // On first render with messages, scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      }, 200);
      
      firstRenderRef.current = false;
    }
  }, []);

  // Function to lock body scroll
  const lockBodyScroll = () => {
    const scrollY = window.scrollY;
    setBodyScrollY(scrollY);
    
    // Apply styles to prevent content jump
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden'; // Completely disable scrolling
  };

  // Function to unlock body scroll
  const unlockBodyScroll = () => {
    // Remove styles
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    
    // Restore scroll position without animation
    window.scrollTo({
      top: bodyScrollY,
      behavior: 'instant'
    });
  };

  // Handle chat focus state
  const handleChatFocus = () => {
    if (!isChatFocused) {
      setIsChatFocused(true);
      lockBodyScroll();
    }
  };

  // Handle chat blur state
  const handleChatBlur = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only blur if clicking outside the chat content
    if (chatContainerRef.current && !chatContainerRef.current.contains(e.target as Node)) {
      setIsChatFocused(false);
      unlockBodyScroll();
      // Close the chat when clicking outside
      onClose();
    }
  };

  // Lock body scroll when chat is focused
  useEffect(() => {
    if (isChatFocused) {
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
    
    // Cleanup when component unmounts
    return () => {
      unlockBodyScroll();
    };
  }, [isChatFocused]);
  
  // Only scroll when initially opening with no history
  useEffect(() => {
    // Only scroll to bottom on first open if there are no messages
    if (isChatFocused && messages.length === 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isChatFocused, messages.length]);

  // Completely prevent wheel events from propagating
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  // Prevent touch events from propagating
  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      addMessage(message);
    }
  };

  return (
    <>
      <motion.div
        key="chat-window"
        data-chat-window
        className="absolute bottom-16 right-0 bg-background border border-border rounded-lg shadow-xl overflow-hidden z-40 flex flex-col w-[380px] max-w-[95vw] h-[520px] max-h-[80vh] sm:max-h-[600px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        onClick={handleChatFocus}
      >
        <div className="flex items-center justify-between py-3 px-4 border-b border-border bg-muted">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="font-medium text-foreground flex items-center">
              <span className="font-semibold">Abdellah'AI</span>
              <span className="ml-1.5 inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </h3>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Stop event propagation
                resetChat();
              }}
              className="p-1.5 hover:bg-background rounded-md transition-colors duration-200"
              aria-label="Reset chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Stop event propagation
                onClose();
              }}
              className="p-1.5 hover:bg-background rounded-md transition-colors duration-200"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-5 space-y-5 custom-scrollbar overscroll-contain"
          onWheel={handleWheel}
          onTouchStart={handleTouch}
          onTouchMove={handleTouch}
          onTouchEnd={handleTouch}
          onClick={(e) => e.stopPropagation()}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p className="font-medium mb-2">Hi! I'm Abdellah'AI</p>
              <p className="text-sm max-w-[80%]">Ask me about Abdellah's skills, projects, experience, or anything else you'd like to know!</p>
            </div>
          ) : (
            <MessageList 
              messages={messages} 
              isLoading={isLoading} 
            />
          )}
          <div id="messages-end" ref={messagesEndRef} />
        </div>

        <div className="p-3.5 border-t border-border bg-background">
          <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </motion.div>
      
      {isChatFocused && (
        <div 
          key="chat-overlay"
          className="fixed inset-0 z-[9998]" 
          onClick={handleChatBlur}
        />
      )}
    </>
  );
} 