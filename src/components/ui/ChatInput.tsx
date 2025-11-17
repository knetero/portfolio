"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { ArrowRightIcon } from "@radix-ui/react-icons";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [value, setValue] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 72,
    maxHeight: 300,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSendMessage(value);
        setValue("");
        adjustHeight(true);
      }
    }
  };

  const handleSend = () => {
    if (value.trim() && !isLoading) {
      onSendMessage(value);
      setValue("");
      adjustHeight(true);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-1.5 pt-4">
        <div className="flex items-center gap-2 mb-2.5 mx-2">
          <div className="flex-1 flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-primary flex items-center justify-center text-white text-[8px] font-bold">
              AI
            </div>
            <h3 className="text-black dark:text-white/90 text-xs tracking-tighter">
              Abdellah's AI Assistant
            </h3>
          </div>
          <p className="text-black dark:text-white/90 text-xs tracking-tighter">
            {isLoading ? "Thinking..." : "Ready"}
          </p>
        </div>
        <div className="relative">
          <div className="relative flex flex-col">
            <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
              <Textarea
                id="chat-input"
                value={value}
                placeholder="What can I help you with?"
                className={cn(
                  "w-full rounded-xl rounded-b-none px-4 py-3 bg-black/5 dark:bg-white/5 border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus-visible:ring-0 focus-visible:ring-offset-0",
                  "min-h-[72px]"
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

            <div className="h-14 bg-black/5 dark:bg-white/5 rounded-b-xl flex items-center">
              <div className="absolute left-3 right-3 bottom-3 flex items-center justify-between w-[calc(100%-24px)]">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-black/50 dark:text-white/50">
                    Press Enter to send • Shift+Enter for new line
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSend}
                  className={cn(
                    "rounded-lg p-2 bg-black/5 dark:bg-white/5",
                    "hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500"
                  )}
                  aria-label="Send message"
                  disabled={!value.trim() || isLoading}
                >
                  <ArrowRightIcon
                    className={cn(
                      "w-4 h-4 dark:text-white transition-opacity duration-200",
                      value.trim() && !isLoading ? "opacity-100" : "opacity-30"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
