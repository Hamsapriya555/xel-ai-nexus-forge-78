
import React from 'react';
import { Message } from '@/types/chat';
import { formatDate } from '@/utils/dateFormat';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  // Add a function to filter out duplicate messages based on id
  const uniqueMessages = messages.reduce((acc: Message[], current) => {
    const isDuplicate = acc.find((item) => item.id === current.id);
    if (!isDuplicate) {
      return [...acc, current];
    }
    return acc;
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-4 pb-32">
      {uniqueMessages.map((message) => (
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
    </div>
  );
};

export default MessageList;
