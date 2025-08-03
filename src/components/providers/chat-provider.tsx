
'use client';

import { chatAboutContext } from '@/ai/flows/chatFlow';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

interface ChatContextType {
  isOpen: boolean;
  openChat: (context?: string) => void;
  closeChat: () => void;
  messages: Message[];
  sendMessage: (message: string) => void;
  isLoading: boolean;
  context: string | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<string | null>(null);

  const openChat = (newContext: string = "Allgemeine Informationen über die gesamte Website von Benedikt Schächner.") => {
    setContext(newContext);
    setIsOpen(true);
    setMessages([
        {
          id: 'initial',
          role: 'assistant',
          content: "Hallo! Ich bin der KI-Assistent. Frag mich etwas über den aktuellen Seiteninhalt.",
        },
      ]);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const sendMessage = async (message: string) => {
    if (!context) return;

    const newUserMessage: Message = { id: Date.now().toString(), role: 'user', content: message };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await chatAboutContext({ question: message, context });
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Entschuldigung, es ist ein Fehler aufgetreten.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{ isOpen, openChat, closeChat, messages, sendMessage, isLoading, context }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
