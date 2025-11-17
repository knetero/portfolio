"use client";

import { useState } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Textarea } from '@/components/ui/textarea';
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [value, setValue] = useState('');
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 200,
  });

  const handleSend = () => {
    if (value.trim() && !isLoading) {
      onSendMessage(value);
      setValue('');
      adjustHeight(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-black/5 dark:bg-white/5 rounded-xl">
      <div className="relative flex flex-col">
        <div className="overflow-y-auto" style={{ maxHeight: '200px' }}>
          <Textarea
            value={value}
            placeholder="Ask me anything about Abdellah..."
            className={cn(
              'w-full rounded-xl rounded-b-none px-4 py-3 bg-black/5 dark:bg-white/5 border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus-visible:ring-0 focus-visible:ring-offset-0',
              'min-h-[56px]'
            )}
            ref={textareaRef}
            onKeyDown={handleKeyDown}
            onChange={(e) => {
              setValue(e.target.value);
              adjustHeight();
            }}
            disabled={isLoading}
          />
        </div>

        <div className="h-12 bg-black/5 dark:bg-white/5 rounded-b-xl flex items-center">
          <div className="absolute left-3 right-3 bottom-2.5 flex items-center justify-between w-[calc(100%-24px)]">
            <div className="flex items-center gap-2">
              <div className="text-xs text-black/50 dark:text-white/50">
                {isLoading ? 'Thinking...' : 'Press Enter to send'}
              </div>
            </div>
            <button
              type="button"
              onClick={handleSend}
              className={cn(
                'rounded-lg p-2 bg-black/5 dark:bg-white/5',
                'hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500 transition-colors'
              )}
              aria-label="Send message"
              disabled={!value.trim() || isLoading}
            >
              <ArrowRightIcon
                className={cn(
                  'w-4 h-4 dark:text-white transition-opacity duration-200',
                  value.trim() && !isLoading ? 'opacity-100' : 'opacity-30'
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 