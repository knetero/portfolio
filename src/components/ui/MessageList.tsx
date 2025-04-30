"use client";

import { motion } from 'framer-motion';
import { Message } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
  // Function to format message content for professional display
  const formatMessageContent = (content: string) => {
    // Handle empty content
    if (!content || content.trim() === '') {
      return <p className="my-1 text-muted-foreground italic">Empty message</p>;
    }
    
    // If content appears to contain markdown formatting
    if (content.includes('**') || content.includes('#') || content.includes('- ')) {
      // Process content by lines for better formatting
      const formattedContent = (
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {content.split('\n').map((line, i) => {
            // Format section headers/titles
            if (line.match(/^#{1,3}\s/)) {
              const level = (line.match(/^#{1,3}/) || [''])[0].length;
              const text = line.replace(/^#{1,3}\s/, '');
              
              if (level === 1) {
                return <h1 key={i} className="text-xl font-bold mt-3 mb-2">{text}</h1>;
              } else if (level === 2) {
                return <h2 key={i} className="text-lg font-bold mt-3 mb-2">{text}</h2>;
              } else {
                return <h3 key={i} className="text-base font-bold mt-3 mb-2">{text}</h3>;
              }
            }
            
            // Format key details section
            if (line.match(/^[A-Za-z\s]+:\s*$/)) {
              return <h4 key={i} className="text-sm font-semibold mt-2 mb-1">{line}</h4>;
            }
            
            // Format bold text
            if (line.includes('**')) {
              const parts = line.split(/(\*\*.*?\*\*)/g);
              return (
                <p key={i} className="my-1">
                  {parts.map((part, j) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
                    }
                    return <span key={j}>{part}</span>;
                  })}
                </p>
              );
            }
            
            // Format list items
            if (line.startsWith('- ')) {
              return <li key={i} className="ml-4 my-1">{line.slice(2)}</li>;
            }
            
            // Format role/title with dash
            if (line.match(/^[A-Za-z\s]+ - [A-Za-z\s]+$/)) {
              const [title, detail] = line.split(' - ');
              return (
                <p key={i} className="my-1">
                  <span className="font-semibold">{title}</span> - {detail}
                </p>
              );
            }
            
            // Default paragraph
            return line.trim() ? <p key={i} className="my-1">{line}</p> : <br key={i} />;
          })}
        </div>
      );
      
      return formattedContent;
    }
    
    // Return clean paragraphs for simple text
    return (
      <div className="space-y-2">
        {content.split('\n\n').map((paragraph, i) => (
          paragraph.trim() ? 
            <p key={i} className="my-1">{paragraph}</p> : 
            <br key={i} />
        ))}
      </div>
    );
  };

  // Animation variants for messages
  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.3,
        delay: custom * 0.1
      }
    }),
  };

  return (
    <div className="space-y-5">
      {messages.map((message, index) => (
        <motion.div
          key={message.id}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={messageVariants}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {message.role === 'assistant' && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-2 mt-1">
              AI
            </div>
          )}
          
          <div
            className={`max-w-[85%] px-4 py-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-primary text-primary-foreground rounded-br-none shadow-md'
                : 'bg-muted text-foreground rounded-bl-none shadow-sm'
            }`}
          >
            <div className="whitespace-pre-wrap break-words">
              {formatMessageContent(message.content)}
            </div>
            <div
              className={`text-xs mt-2 ${
                message.role === 'user' ? 'text-primary-foreground/80' : 'text-muted-foreground'
              }`}
            >
              {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
            </div>
          </div>
          
          {message.role === 'user' && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs ml-2 mt-1">
              You
            </div>
          )}
        </motion.div>
      ))}

      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs mr-2 mt-1">
            AI
          </div>
          
          <div className="bg-muted px-4 py-3 rounded-lg rounded-bl-none shadow-sm">
            <div className="flex space-x-2 py-1">
              <motion.div 
                className="w-2 h-2 bg-foreground/40 rounded-full"
                animate={{ scale: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
              />
              <motion.div 
                className="w-2 h-2 bg-foreground/40 rounded-full"
                animate={{ scale: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
              />
              <motion.div 
                className="w-2 h-2 bg-foreground/40 rounded-full"
                animate={{ scale: [0.5, 1, 0.5], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 