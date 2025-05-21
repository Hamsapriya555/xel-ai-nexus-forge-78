
import React, { useState, useEffect, useRef } from 'react';
import { PlusCircle, Send, MoreVertical, ChevronLeft, Settings, Clock, Trash, Save, Download } from 'lucide-react';
import Button from '@/components/Button';

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
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'First conversation',
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: 'Hello! I\'m your AI assistant. How can I help you today?',
          timestamp: new Date(),
        }
      ],
      lastUpdated: new Date(),
    }
  ]);
  
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat.messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New conversation',
      messages: [
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Hello! How can I assist you today?',
          timestamp: new Date(),
        }
      ],
      lastUpdated: new Date(),
    };
    
    setChats(prevChats => [newChat, ...prevChats]);
    setActiveChat(newChat);
    inputRef.current?.focus();
  };

  const selectChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setActiveChat(chat);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    // Update current chat with user message
    const updatedChats = chats.map(chat => 
      chat.id === activeChat.id
        ? {
            ...chat,
            messages: [...chat.messages, userMessage],
            lastUpdated: new Date(),
            title: chat.messages.length <= 1 ? inputValue.slice(0, 30) : chat.title,
          }
        : chat
    );

    setChats(updatedChats);
    setActiveChat(prevChat => ({
      ...prevChat,
      messages: [...prevChat.messages, userMessage],
      lastUpdated: new Date(),
      title: prevChat.messages.length <= 1 ? inputValue.slice(0, 30) : prevChat.title,
    }));
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: getAiResponse(inputValue),
        timestamp: new Date(),
      };

      setActiveChat(prevChat => ({
        ...prevChat,
        messages: [...prevChat.messages, aiResponse],
        lastUpdated: new Date(),
      }));

      const newUpdatedChats = updatedChats.map(chat => 
        chat.id === activeChat.id
          ? {
              ...chat,
              messages: [...chat.messages, aiResponse],
              lastUpdated: new Date(),
            }
          : chat
      );

      setChats(newUpdatedChats);
      setIsTyping(false);
    }, 1500);
  };

  // Simple dummy AI response function
  const getAiResponse = (input: string) => {
    const responses = [
      `I understand you're asking about "${input}". That's an interesting question. Based on my analysis, there are several perspectives to consider...`,
      `Thanks for asking about "${input}". This is a topic I can certainly help with. Let me provide some insights...`,
      `Regarding "${input}", I can offer the following information based on the latest available data and research...`,
      `"${input}" is a fascinating subject. From my knowledge, here are some key points to consider...`,
      `I've processed your query about "${input}" and can provide you with a comprehensive answer based on available information...`,
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
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
          
          {chats.map(chat => (
            <button
              key={chat.id}
              className={`
                w-full text-left p-3 rounded-lg mb-1 transition-colors
                hover:bg-primary/10 group relative
                ${activeChat.id === chat.id ? 'bg-primary/10' : ''}
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
          ))}
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
              disabled={!inputValue.trim() || isTyping}
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
      </div>
    </div>
  );
};

export default Chat;
