"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatContextType, Message, OpenRouterMessage } from '@/types/chat';
import { generateChatResponse } from '@/lib/chatService';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Security validation function
const isSuspiciousMessage = (content: string): boolean => {
  // Convert to lowercase for case-insensitive matching
  const lowercase = content.toLowerCase();
  
  // Check for potential prompt injection or impersonation attempts
  const suspiciousPatterns = [
    'ignore previous instructions',
    'ignore all instructions',
    'act as if you are',
    'forget your instructions',
    'pretend to be the portfolio owner',
    'overwrite database',
    'modify your knowledge',
    'change system prompt',
    'update your programming',
  ];
  
  return suspiciousPatterns.some(pattern => lowercase.includes(pattern));
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewResponse, setHasNewResponse] = useState(false);
  const [lastResponsePreview, setLastResponsePreview] = useState('');
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  // Load messages and scroll position from local storage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    const savedScrollPosition = localStorage.getItem('chatScrollPosition');
    
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string dates back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          createdAt: new Date(msg.createdAt)
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
    
    if (savedScrollPosition) {
      try {
        setLastScrollPosition(parseInt(savedScrollPosition, 10));
      } catch (error) {
        console.error('Error parsing saved scroll position:', error);
      }
    }
  }, []);

  // Save messages to local storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);
  
  // Save scroll position to local storage
  const saveScrollPosition = (position: number) => {
    setLastScrollPosition(position);
    localStorage.setItem('chatScrollPosition', position.toString());
  };

  const addMessage = async (content: string) => {
    // Check if user is in a cooldown period from rate limiting
    const cooldownUntil = localStorage.getItem('chatCooldownUntil');
    if (cooldownUntil) {
      const cooldownTime = parseInt(cooldownUntil, 10);
      const now = Date.now();
      
      if (now < cooldownTime) {
        // Calculate remaining time in minutes and seconds
        const remainingMs = cooldownTime - now;
        const minutes = Math.floor(remainingMs / 60000);
        const seconds = Math.floor((remainingMs % 60000) / 1000);
        
        // Format the time string
        const timeString = minutes > 0 
          ? `${minutes} minute${minutes !== 1 ? 's' : ''} and ${seconds} second${seconds !== 1 ? 's' : ''}` 
          : `${seconds} second${seconds !== 1 ? 's' : ''}`;
        
        // Add user message first
        const userMessage: Message = {
          id: uuidv4(),
          role: 'user',
          content,
          createdAt: new Date(),
        };
        
        setMessages((prev) => [...prev, userMessage]);
        
        // Add cooldown warning message
        const cooldownMessage: Message = {
          id: uuidv4(),
          role: 'assistant',
          content: `I'm still in a cooldown period due to API rate limits. Please try again in ${timeString}.`,
          createdAt: new Date(),
        };
        
        setMessages((prev) => [...prev, cooldownMessage]);
        setHasNewResponse(true);
        setLastResponsePreview(`I'm still in a cooldown period...`);
        return;
      } else {
        // Cooldown period has expired, clear it
        localStorage.removeItem('chatCooldownUntil');
      }
    }
    
    // Security check - validate message content
    if (isSuspiciousMessage(content)) {
      // Add user message first
      const userMessage: Message = {
        id: uuidv4(),
        role: 'user',
        content,
        createdAt: new Date(),
      };
      
      setMessages((prev) => [...prev, userMessage]);
      
      // Add security warning message
      const securityMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: 'For security reasons, I cannot process that request. I am an AI assistant representing the portfolio owner and can only provide information based on the data in my context. I cannot modify or override my instructions.',
        createdAt: new Date(),
      };
      
      setMessages((prev) => [...prev, securityMessage]);
      setHasNewResponse(true);
      setLastResponsePreview('For security reasons, I cannot process that request...');
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Convert messages to OpenRouter format
      const openRouterMessages: OpenRouterMessage[] = messages
        .concat(userMessage)
        .map(({ role, content }) => ({ role, content }));

      // Get response from API
      const responseContent = await generateChatResponse(openRouterMessages);

      // Skip adding assistant message if the response is empty
      if (!responseContent || responseContent.trim() === '') {
        // This should rarely happen now with retry logic, but just in case
        const errorMessage: Message = {
          id: uuidv4(),
          role: 'assistant',
          content: 'Sorry, I was unable to generate a response. The AI service might be temporarily unavailable. Please try again in a moment.',
          createdAt: new Date(),
        };
        
        setMessages((prev) => [...prev, errorMessage]);
        setHasNewResponse(true);
        setLastResponsePreview('Sorry, I was unable to generate a response...');
        return;
      }

      // Add assistant message
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: responseContent,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      
      // Set new response flag and preview
      setHasNewResponse(true);
      setLastResponsePreview(responseContent.substring(0, 50) + (responseContent.length > 50 ? '...' : ''));
    } catch (error) {
      console.error('Error in chat:', error);
      
      // Provide a more specific error message
      let errorContent = 'Sorry, I encountered an error. Please try again later.';
      
      if (error instanceof Error) {
        if (error.message.includes('empty response')) {
          errorContent = 'Sorry, I received empty responses from the AI service. This might be due to high traffic or temporary service issues. Please try again in a moment.';
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorContent = 'Sorry, there seems to be a network issue. Please check your internet connection and try again.';
        } else if (error.message.includes('RATE_LIMIT_EXCEEDED') || error.message.includes('rate limit')) {
          errorContent = 'I\'ve reached my message limit for now. The API service has a usage limit to prevent abuse. Please try again in a few minutes when the limit resets.';
          
          // We could add additional tracking here to implement a client-side cooldown
          // For example, storing a timestamp in localStorage to enforce a waiting period
          const cooldownPeriod = 5 * 60 * 1000; // 5 minutes in milliseconds
          const cooldownUntil = Date.now() + cooldownPeriod;
          localStorage.setItem('chatCooldownUntil', cooldownUntil.toString());
        }
      }
      
      // Add error message
      const errorMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: errorContent,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      
      // Still set notification for error message
      setHasNewResponse(true);
      setLastResponsePreview('Sorry, I encountered an error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    // Don't immediately clear messages, use a small timeout
    // to prevent layout flash during animation
    const chatElement = document.querySelector('#chat-button-container');
    if (chatElement) {
      chatElement.classList.add('resetting');
    }
    
    // Clear cooldown timer if it exists
    localStorage.removeItem('chatCooldownUntil');
    
    // Short timeout to prevent the positioning flash
    setTimeout(() => {
      setMessages([]);
      localStorage.removeItem('chatMessages');
      
      if (chatElement) {
        chatElement.classList.remove('resetting');
      }
    }, 50);
  };
  
  const clearNewResponse = () => {
    setHasNewResponse(false);
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      isLoading, 
      addMessage, 
      resetChat, 
      hasNewResponse, 
      lastResponsePreview, 
      clearNewResponse,
      lastScrollPosition,
      saveScrollPosition
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 