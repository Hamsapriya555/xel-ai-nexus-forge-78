
import React from 'react';
import { PlusCircle } from 'lucide-react';
import Button from '@/components/Button';

interface EmptyStateProps {
  isLoading: boolean;
  onNewChat: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ isLoading, onNewChat }) => {
  return (
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
          <Button variant="glow" onClick={onNewChat}>
            <PlusCircle size={16} className="mr-2" />
            New Conversation
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
