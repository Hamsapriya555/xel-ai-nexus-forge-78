
import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface ChatToggleProps {
  sidebarOpen: boolean;
  onToggle: () => void;
}

const ChatToggle: React.FC<ChatToggleProps> = ({ sidebarOpen, onToggle }) => {
  return (
    <button 
      className="fixed bottom-5 left-5 z-20 md:hidden w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg"
      onClick={onToggle}
    >
      <ChevronLeft size={20} className={`transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
    </button>
  );
};

export default ChatToggle;
