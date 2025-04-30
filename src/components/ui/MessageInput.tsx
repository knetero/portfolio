"use client";

import { useState, useRef, KeyboardEvent, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'framer-motion';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export type MessageInputRef = {
  focus: () => void;
};

const MessageInput = forwardRef<MessageInputRef, MessageInputProps>(
  ({ onSendMessage, isLoading, onFocus, onBlur }, ref) => {
    const [message, setMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Expose the focus method to parent components
    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    }));

    const handleSend = () => {
      if (message.trim() && !isLoading) {
        onSendMessage(message);
        setMessage('');
        
        // Reset textarea height
        if (inputRef.current) {
          inputRef.current.style.height = 'auto';
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    // Handle focus events
    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsFocused(true);
      
      // Notify parent component
      if (onFocus) {
        onFocus();
      }
      
      // On mobile, scroll to ensure the input is visible
      if (window.innerWidth < 640) {
        setTimeout(() => {
          if (inputRef.current) {
            // Try to ensure the input is visible above the keyboard
            window.scrollTo(0, document.body.scrollHeight);
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
        }, 150);
      }
    };

    // Handle blur events
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsFocused(false);
      
      // Notify parent component
      if (onBlur) {
        onBlur();
      }
    };

    // Handle click events on the input container
    const handleContainerClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      inputRef.current?.focus();
    };

    // Handle touch events specifically for mobile
    const handleContainerTouch = (e: React.TouchEvent) => {
      e.stopPropagation();
      // Use a small timeout to make sure the event is not interfered with
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    };

    return (
      <div className="flex items-end gap-2">
        <div 
          className={`flex-1 bg-muted rounded-lg p-2.5 shadow-sm transition-all duration-200 ${
            isFocused ? 'ring-2 ring-primary/30' : ''
          }`}
          onClick={handleContainerClick}
          onTouchStart={handleContainerTouch}
        >
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => {
              e.stopPropagation();
              setMessage(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            placeholder="Ask me anything..."
            className="w-full resize-none bg-transparent focus:outline-none text-foreground min-h-[40px] max-h-[120px] placeholder:text-muted-foreground/70"
            rows={1}
            style={{
              height: 'auto',
              minHeight: '40px',
              maxHeight: '120px'
            }}
            onInput={(e) => {
              e.stopPropagation();
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
            }}
            disabled={isLoading}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            handleSend();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          disabled={!message.trim() || isLoading}
          className="h-11 w-11 rounded-full bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-200 relative"
          aria-label="Send message"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
        </motion.button>
      </div>
    );
  }
);

MessageInput.displayName = 'MessageInput';

export default MessageInput; 