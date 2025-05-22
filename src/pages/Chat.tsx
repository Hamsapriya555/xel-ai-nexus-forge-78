
import React, { useState } from 'react';
import { useChat } from '@/hooks/useChat';

import ChatSidebar from '@/components/chat/ChatSidebar';
import MessageList from '@/components/chat/MessageList';
import ChatInput from '@/components/chat/ChatInput';
import ChatHeader from '@/components/chat/ChatHeader';
import EmptyState from '@/components/chat/EmptyState';
import ChatToggle from '@/components/chat/ChatToggle';

const Chat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const {
    chats,
    activeChat,
    inputValue,
    isTyping,
    isLoading,
    handleInputChange,
    createNewChat,
    selectChat,
    sendMessage
  } = useChat();

  return (
    <div className="flex h-screen overflow-hidden pt-16">
      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        isLoading={isLoading}
        sidebarOpen={sidebarOpen}
        onSelectChat={selectChat}
        onCreateNewChat={createNewChat}
      />
      
      {/* Mobile sidebar toggle */}
      <ChatToggle
        sidebarOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-background relative">
        {activeChat ? (
          <>
            {/* Chat header */}
            <ChatHeader title={activeChat.title} />
            
            {/* Messages */}
            <MessageList
              messages={activeChat.messages}
              isTyping={isTyping}
            />
            
            {/* Input area */}
            <ChatInput
              value={inputValue}
              onChange={handleInputChange}
              onSend={sendMessage}
              isDisabled={!inputValue.trim() || isTyping || !activeChat}
              activeChat={!!activeChat}
            />
          </>
        ) : (
          <EmptyState 
            isLoading={isLoading} 
            onNewChat={createNewChat} 
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
