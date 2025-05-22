
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
      // Create a temporary user message for immediate display
      const tempUserMessage: Message = {
        id: `temp-${Date.now()}`,
        role: 'user',
        content: inputValue.trim(),
        timestamp: new Date(),
      };
      
      // Update UI with user message
      const updatedActiveChat = {
        ...activeChat,
        messages: [...activeChat.messages, tempUserMessage],
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

      // Send user message to API
      const userMessage = await chatApi.sendMessage(activeChat.id, tempUserMessage.content);
      
      // Get AI response
      const aiResponse = await chatApi.getAIResponse(activeChat.id, tempUserMessage.content);
      
      // Replace temporary message with real messages
      const finalChat = {
        ...activeChat,
        messages: [...activeChat.messages.filter(m => !m.id.startsWith('temp-')), userMessage, aiResponse],
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
