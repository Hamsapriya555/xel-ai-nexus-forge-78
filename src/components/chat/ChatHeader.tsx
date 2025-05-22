
import React from 'react';
import { Save, Download, Settings } from 'lucide-react';

interface ChatHeaderProps {
  title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  return (
    <div className="border-b border-border p-4 flex justify-between items-center">
      <h2 className="font-medium truncate">
        {title}
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
  );
};

export default ChatHeader;
