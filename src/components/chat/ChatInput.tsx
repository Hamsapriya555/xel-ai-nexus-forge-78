
import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import Button from '@/components/Button';

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  isDisabled: boolean;
  activeChat: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  isDisabled,
  activeChat
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus input on mount and when active chat changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeChat]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
      <div className="max-w-3xl mx-auto relative">
        <textarea
          ref={inputRef}
          value={value}
          onChange={onChange}
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
          onClick={onSend}
          disabled={isDisabled}
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
  );
};

export default ChatInput;
