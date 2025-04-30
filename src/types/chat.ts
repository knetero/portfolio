export type Role = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: Date;
}

export interface OpenRouterMessage {
  role: Role;
  content: string;
}

export interface OpenRouterRequestBody {
  model: string;
  messages: OpenRouterMessage[];
}

export interface OpenRouterResponse {
  id: string;
  choices: {
    index: number;
    message: {
      role: Role;
      content: string;
    };
    finish_reason: string;
  }[];
}

export interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  addMessage: (content: string) => Promise<void>;
  resetChat: () => void;
  hasNewResponse: boolean;
  lastResponsePreview: string;
  clearNewResponse: () => void;
  lastScrollPosition: number;
  saveScrollPosition: (position: number) => void;
} 