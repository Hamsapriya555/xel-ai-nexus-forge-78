
// Dummy API service for fake_by_Xel
// This simulates backend interactions by logging actions to console
// and returning mock responses

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

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

interface Project {
  id: string;
  title: string;
  description: string;
  creator: {
    name: string;
    avatar: string;
  };
  category: string;
  likes: number;
  comments: number;
  date: string;
  image?: string;
  featured?: boolean;
}

// Mock data storage (in-memory database)
let currentUser: User | null = null;
let chats: Chat[] = [];
let projects: Project[] = [];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication API
export const auth = {
  login: async (email: string, password: string): Promise<User> => {
    console.log(`[API] Login attempt for user: ${email}`);
    await delay(800);
    
    // Simulate successful login
    currentUser = {
      id: '1',
      name: email.split('@')[0],
      email,
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'
    };
    
    console.log(`[API] Login successful for: ${email}`, currentUser);
    return currentUser;
  },
  
  logout: async (): Promise<void> => {
    console.log('[API] User logged out', currentUser);
    currentUser = null;
    await delay(500);
  },
  
  signup: async (email: string, password: string, name: string): Promise<User> => {
    console.log(`[API] Signup attempt for: ${email}`);
    await delay(1000);
    
    // Simulate successful signup
    currentUser = {
      id: Date.now().toString(),
      name,
      email,
      avatar: 'https://randomuser.me/api/portraits/lego/2.jpg'
    };
    
    console.log(`[API] Signup successful for: ${email}`, currentUser);
    return currentUser;
  },
  
  getCurrentUser: async (): Promise<User | null> => {
    console.log('[API] Get current user', currentUser);
    await delay(300);
    return currentUser;
  }
};

// Chat API
export const chatApi = {
  getChats: async (): Promise<Chat[]> => {
    console.log('[API] Fetching chats');
    await delay(700);
    
    if (chats.length === 0) {
      // Initialize with a default chat if empty
      chats = [
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
      ];
    }
    
    console.log('[API] Chats fetched', chats);
    return chats;
  },
  
  createChat: async (): Promise<Chat> => {
    console.log('[API] Creating new chat');
    await delay(600);
    
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
    
    chats = [newChat, ...chats];
    console.log('[API] New chat created', newChat);
    return newChat;
  },
  
  sendMessage: async (chatId: string, content: string): Promise<Message> => {
    console.log(`[API] Sending message to chat ${chatId}:`, content);
    await delay(300);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    // Update chat with user message
    const chatIndex = chats.findIndex(chat => chat.id === chatId);
    if (chatIndex !== -1) {
      chats[chatIndex].messages = [...chats[chatIndex].messages, userMessage];
      chats[chatIndex].lastUpdated = new Date();
      
      // If this is the first message, update the title
      if (chats[chatIndex].messages.length === 2) {
        chats[chatIndex].title = content.slice(0, 30);
      }
    }
    
    console.log('[API] User message sent', userMessage);
    return userMessage;
  },
  
  getAIResponse: async (chatId: string, userMessage: string): Promise<Message> => {
    console.log(`[API] Getting AI response for: "${userMessage}"`);
    await delay(1500); // Simulate AI thinking time
    
    const aiResponses = [
      `I understand you're asking about "${userMessage}". That's an interesting question. Based on my analysis, there are several perspectives to consider...`,
      `Thanks for asking about "${userMessage}". This is a topic I can certainly help with. Let me provide some insights...`,
      `Regarding "${userMessage}", I can offer the following information based on the latest available data and research...`,
      `"${userMessage}" is a fascinating subject. From my knowledge, here are some key points to consider...`,
      `I've processed your query about "${userMessage}" and can provide you with a comprehensive answer based on available information...`,
    ];
    
    const aiResponse: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
      timestamp: new Date(),
    };
    
    // Update chat with AI response
    const chatIndex = chats.findIndex(chat => chat.id === chatId);
    if (chatIndex !== -1) {
      chats[chatIndex].messages = [...chats[chatIndex].messages, aiResponse];
      chats[chatIndex].lastUpdated = new Date();
    }
    
    console.log('[API] AI response generated', aiResponse);
    return aiResponse;
  },
  
  deleteChat: async (chatId: string): Promise<void> => {
    console.log(`[API] Deleting chat: ${chatId}`);
    await delay(500);
    
    chats = chats.filter(chat => chat.id !== chatId);
    console.log('[API] Chat deleted. Remaining chats:', chats.length);
  }
};

// Community API
export const communityApi = {
  getProjects: async (filter?: string): Promise<Project[]> => {
    console.log(`[API] Fetching projects with filter: ${filter || 'none'}`);
    await delay(800);
    
    if (projects.length === 0) {
      // Initialize with default projects if empty
      projects = [
        {
          id: '1',
          title: 'AI-Driven Music Composer',
          description: 'A project that uses Xel to generate unique musical compositions based on mood and style preferences.',
          creator: {
            name: 'Sarah Chen',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
          },
          category: 'Music',
          likes: 87,
          comments: 24,
          date: '2023-06-18',
          image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWN8ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60',
          featured: true
        },
        {
          id: '2',
          title: 'Virtual Interior Design Assistant',
          description: 'An application that helps users redesign their living spaces with AI-generated recommendations.',
          creator: {
            name: 'Marcus Johnson',
            avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
          },
          category: 'Design',
          likes: 62,
          comments: 18,
          date: '2023-07-05',
          image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60'
        },
        {
          id: '3',
          title: 'Story Time: AI Bedtime Stories',
          description: 'A platform that creates personalized children\'s stories using Xel\'s language capabilities.',
          creator: {
            name: 'Leila Rodriguez',
            avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
          },
          category: 'Writing',
          likes: 124,
          comments: 31,
          date: '2023-05-22',
          image: 'https://images.unsplash.com/photo-1512068538690-4d973e4fa96f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0b3J5JTIwdGVsbGluZ3xlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
          featured: true
        },
      ];
    }

    let filteredProjects = [...projects];
    if (filter) {
      switch (filter) {
        case 'featured':
          filteredProjects = projects.filter(p => p.featured);
          break;
        case 'recent':
          filteredProjects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          filteredProjects = filteredProjects.slice(0, 3);
          break;
        case 'popular':
          filteredProjects.sort((a, b) => b.likes - a.likes);
          filteredProjects = filteredProjects.slice(0, 3);
          break;
      }
    }
    
    console.log('[API] Projects fetched', filteredProjects.length);
    return filteredProjects;
  },
  
  likeProject: async (projectId: string): Promise<void> => {
    console.log(`[API] Liking project: ${projectId}`);
    await delay(400);
    
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
      projects[projectIndex].likes += 1;
      console.log(`[API] Project liked. New like count: ${projects[projectIndex].likes}`);
    }
  },
  
  createProject: async (project: Omit<Project, 'id' | 'likes' | 'comments' | 'date'>): Promise<Project> => {
    console.log('[API] Creating new project', project);
    await delay(1000);
    
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      likes: 0,
      comments: 0,
      date: new Date().toISOString().split('T')[0]
    };
    
    projects = [newProject, ...projects];
    console.log('[API] Project created', newProject);
    return newProject;
  }
};
