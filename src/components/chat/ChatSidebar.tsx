
import React from 'react';
import { PlusCircle, MoreVertical } from 'lucide-react';
import Button from '@/components/Button';
import { Chat } from '@/types/chat';
import { formatDate } from '@/utils/dateFormat';

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: Chat | null;
  isLoading: boolean;
  sidebarOpen: boolean;
  onSelectChat: (chatId: string) => void;
  onCreateNewChat: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  activeChat,
  isLoading,
  sidebarOpen,
  onSelectChat,
  onCreateNewChat
}) => {
  return (
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
          onClick={onCreateNewChat}
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
              onClick={() => onSelectChat(chat.id)}
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
  );
};

export default ChatSidebar;
