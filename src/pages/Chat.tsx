
import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, Send, MoreVertical, ChevronLeft, Settings, Clock, Trash, Save, Download } from 'lucide-react';
import Button from '@/components/Button';
import { chatApi } from '@/lib/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
}

const Chat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  // Focus input on mount and when active chat changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeChat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const createNewChat = async () => {
    try {
      const newChat = await chatApi.createChat();
      setChats(prevChats => [newChat, ...prevChats]);
      setActiveChat(newChat);
      inputRef.current?.focus();
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  const selectChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setActiveChat(chat);
    }
  };

  const handleSendMessage = async () => {
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="flex h-screen overflow-hidden pt-16">
      {/* Sidebar */}
      <div 
        className={`
          fixed md:relative h-screen top-0 left-0 z-10
          w-[280px] bg-muted/30 border-r border-border
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          pt-16 md:pt-16
        `}
      >
        <div className="p-4">
          <Button 
            variant="default" 
            className="w-full justify-start" 
            onClick={createNewChat}
          >
            <PlusCircle size={16} className="mr-2" />
            New Chat
          </Button>
        </div>
        
        <div className="px-2 pb-20 overflow-y-auto h-full">
          <h3 className="text-xs font-medium text-muted-foreground mb-2 px-3">Recent chats</h3>
          
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
              <span className="ml-2 text-sm text-muted-foreground">Loading chats...</span>
            </div>
          ) : chats.length > 0 ? (
            chats.map(chat => (
              <button
                key={chat.id}
                className={`
                  w-full text-left p-3 rounded-lg mb-1 transition-colors
                  hover:bg-primary/10 group relative
                  ${activeChat?.id === chat.id ? 'bg-primary/10' : ''}
                `}
                onClick={() => selectChat(chat.id)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-sm truncate pr-6">
                    {chat.title}
                  </h4>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-muted rounded">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-1">
                  {chat.messages[chat.messages.length - 1]?.content.slice(0, 40)}...
                </p>
                <span className="text-xs text-muted-foreground mt-1 block">
                  {formatDate(chat.lastUpdated)}
                </span>
              </button>
            ))
          ) : (
            <div className="text-center p-4 text-sm text-muted-foreground">
              No chats yet. Start a new chat!
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile sidebar toggle */}
      <button 
        className="fixed bottom-5 left-5 z-20 md:hidden w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <ChevronLeft size={20} className={`transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
      </button>
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-background relative">
        {activeChat ? (
          <>
            {/* Chat header */}
            <div className="border-b border-border p-4 flex justify-between items-center">
              <h2 className="font-medium truncate">
                {activeChat.title}
              </h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-muted/50 rounded-md">
                  <Save size={18} />
                </button>
                <button className="p-2 hover:bg-muted/50 rounded-md">
                  <Download size={18} />
                </button>
                <button className="p-2 hover:bg-muted/50 rounded-md">
                  <Settings size={18} />
                </button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 pb-32">
              {activeChat.messages.map((message) => (
                <div 
                  key={message.id}
                  className={`mb-8 ${message.role === 'user' ? 'ml-auto' : ''}`}
                >
                  <div className="flex items-start">
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded bg-primary/20 flex-shrink-0 flex items-center justify-center mr-4">
                        <span className="text-sm font-mono text-primary">X</span>
                      </div>
                    )}
                    <div className={`max-w-3xl ${message.role === 'user' ? 'ml-auto' : ''}`}>
                      <div 
                        className={`
                          p-4 rounded-lg animate-fade-in
                          ${message.role === 'user' 
                            ? 'bg-primary/10 text-foreground' 
                            : 'bg-muted/30 text-foreground'}
                        `}
                      >
                        <div className="prose prose-invert">
                          {message.content}
                        </div>
                      </div>
                      <div className="mt-1 flex items-center text-xs text-muted-foreground">
                        <span>{formatDate(message.timestamp)}</span>
                        {message.role === 'user' && (
                          <div className="w-8 h-8 rounded bg-secondary/20 flex-shrink-0 flex items-center justify-center ml-4">
                            <span className="text-sm font-mono text-secondary">U</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="mb-8">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded bg-primary/20 flex-shrink-0 flex items-center justify-center mr-4">
                      <span className="text-sm font-mono text-primary">X</span>
                    </div>
                    <div className="max-w-3xl">
                      <div className="p-4 rounded-lg bg-muted/30 text-foreground animate-pulse">
                        <span className="typing-dots">Thinking</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
              <div className="max-w-3xl mx-auto relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Message fake_by_Xel..."
                  className="w-full p-4 pr-12 bg-muted/50 border border-border rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary h-[60px] max-h-[200px]"
                  rows={1}
                  style={{
                    minHeight: '60px',
                    maxHeight: '200px'
                  }}
                />
                <Button 
                  variant="glow"
                  className="absolute right-2 bottom-2" 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping || !activeChat}
                >
                  <Send size={18} />
                </Button>
              </div>
              <div className="max-w-3xl mx-auto mt-2 text-center">
                <p className="text-xs text-muted-foreground">
                  fake_by_Xel may produce inaccurate information about people, places, or facts.
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-4">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                <p className="text-muted-foreground">Loading your conversations...</p>
              </div>
            ) : (
              <div className="text-center max-w-md">
                <h2 className="text-2xl font-bold mb-4">Welcome to fake_by_Xel</h2>
                <p className="text-muted-foreground mb-6">Start a new conversation to begin chatting with our AI assistant.</p>
                <Button variant="glow" onClick={createNewChat}>
                  <PlusCircle size={16} className="mr-2" />
                  New Conversation
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
