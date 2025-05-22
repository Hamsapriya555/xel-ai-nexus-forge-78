
import { useState, useEffect } from 'react';
import { chatApi } from '@/lib/api';
import { Chat, Message } from '@/types/chat';

export function useChat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch chats on mount
  useEffect(() => {
    const loadChats = async () => {
      try {
        setIsLoading(true);
        const fetchedChats = await chatApi.getChats();
        setChats(fetchedChats);
        if (fetchedChats.length > 0) {
          setActiveChat(fetchedChats[0]);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChats();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const createNewChat = async () => {
    try {
      const newChat = await chatApi.createChat();
      setChats(prevChats => [newChat, ...prevChats]);
      setActiveChat(newChat);
      return newChat;
    } catch (error) {
      console.error('Error creating new chat:', error);
      return null;
    }
  };

  const selectChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setActiveChat(chat);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || !activeChat) return;

    try {
      // Send user message
      const userMessage = await chatApi.sendMessage(activeChat.id, inputValue.trim());
      
      // Update UI with user message
      const updatedActiveChat = {
        ...activeChat,
        messages: [...activeChat.messages, userMessage],
        lastUpdated: new Date(),
      };
      
      setActiveChat(updatedActiveChat);
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === activeChat.id ? updatedActiveChat : chat
        )
      );
      setInputValue('');
      setIsTyping(true);

      // Get AI response
      const aiResponse = await chatApi.getAIResponse(activeChat.id, inputValue);
      
      // Update UI with AI response
      const finalChat = {
        ...updatedActiveChat,
        messages: [...updatedActiveChat.messages, aiResponse],
        lastUpdated: new Date(),
      };
      
      setActiveChat(finalChat);
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === activeChat.id ? finalChat : chat
        )
      );
      setIsTyping(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };

  return {
    chats,
    activeChat,
    inputValue,
    isTyping,
    isLoading,
    handleInputChange,
    createNewChat,
    selectChat,
    sendMessage,
    setInputValue
  };
}
