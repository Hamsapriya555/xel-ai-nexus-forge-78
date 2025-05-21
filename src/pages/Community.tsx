
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, MessageSquare, Calendar, Star, ArrowRight, ExternalLink } from 'lucide-react';
import Button from '@/components/Button';

interface CommunityMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  projects: number;
  contributions: number;
  joinedDate: string;
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

const Community = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'projects'>('projects');
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'recent' | 'popular'>('all');
  
  // Sample data
  const members: CommunityMember[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'ML Engineer',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      projects: 8,
      contributions: 124,
      joinedDate: '2023-04-15'
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      role: 'AI Researcher',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      projects: 5,
      contributions: 87,
      joinedDate: '2023-06-10'
    },
    {
      id: '3',
      name: 'Leila Rodriguez',
      role: 'UX Designer',
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
      projects: 12,
      contributions: 241,
      joinedDate: '2023-01-22'
    },
    {
      id: '4',
      name: 'David Kim',
      role: 'Full Stack Dev',
      avatar: 'https://randomuser.me/api/portraits/men/61.jpg',
      projects: 7,
      contributions: 156,
      joinedDate: '2023-03-08'
    },
    {
      id: '5',
      name: 'Zara Williams',
      role: 'Data Scientist',
      avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
      projects: 3,
      contributions: 78,
      joinedDate: '2023-07-19'
    },
    {
      id: '6',
      name: 'Alex Patel',
      role: 'Product Manager',
      avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
      projects: 6,
      contributions: 112,
      joinedDate: '2023-05-14'
    }
  ];
  
  const projects: Project[] = [
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
      description: 'A platform that creates personalized children's stories using Xel's language capabilities.',
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
    {
      id: '4',
      title: 'Xel Code Assistant',
      description: 'A VS Code extension that provides real-time coding assistance powered by Xel.',
      creator: {
        name: 'David Kim',
        avatar: 'https://randomuser.me/api/portraits/men/61.jpg'
      },
      category: 'Development',
      likes: 156,
      comments: 42,
      date: '2023-08-10',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kZXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      featured: true
    },
    {
      id: '5',
      title: 'Mental Health Dialog System',
      description: 'An AI companion designed to provide supportive conversations for mental wellbeing.',
      creator: {
        name: 'Zara Williams',
        avatar: 'https://randomuser.me/api/portraits/women/21.jpg'
      },
      category: 'Healthcare',
      likes: 92,
      comments: 27,
      date: '2023-07-28',
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVudGFsJTIwaGVhbHRofGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: '6',
      title: 'Recipe Generator & Meal Planner',
      description: 'An app that creates custom recipes and meal plans based on dietary preferences and available ingredients.',
      creator: {
        name: 'Alex Patel',
        avatar: 'https://randomuser.me/api/portraits/men/35.jpg'
      },
      category: 'Food',
      likes: 78,
      comments: 19,
      date: '2023-08-03',
      image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVjaXBlfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
    }
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Filter projects based on active filter
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    if (activeFilter === 'recent') {
      // Assume projects are already sorted by date, get the 3 most recent
      return projects.indexOf(project) < 3;
    }
    if (activeFilter === 'popular') {
      // Sort by likes and get top 3
      return project.likes > 80;
    }
    return true;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero section */}
      <section className="py-16 px-6 relative">
        <div className="absolute inset-0 grid-background opacity-40 z-0"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-space-grotesk font-bold mb-6 leading-tight">
              <span className="text-gradient">Xel Community</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Connect with a global network of creators, share your projects, and explore
              innovative ways others are using fake_by_Xel.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <Button variant="glow" size="lg" className="group">
                  Join our Discord
                  <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Button>
              </a>
              <Link to="/chat">
                <Button variant="outline" size="lg">
                  Start building with Xel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main content */}
      <section className="py-12 px-6 bg-card/30">
        <div className="max-w-7xl mx-auto">
          {/* Search and filter bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <button 
                className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'projects' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/70'}`}
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </button>
              <button 
                className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'members' ? 'bg-primary/10 text-primary' : 'hover:bg-muted/70'}`}
                onClick={() => setActiveTab('members')}
              >
                Members
              </button>
            </div>
            
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-muted/50 border border-border rounded-md px-4 py-2 pl-10 w-full"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex overflow-x-auto pb-2 mb-8 whitespace-nowrap">
            <button 
              className={`mr-2 px-4 py-1.5 rounded-full text-sm transition-colors ${activeFilter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </button>
            <button 
              className={`mr-2 px-4 py-1.5 rounded-full text-sm transition-colors ${activeFilter === 'featured' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
              onClick={() => setActiveFilter('featured')}
            >
              Featured
            </button>
            <button 
              className={`mr-2 px-4 py-1.5 rounded-full text-sm transition-colors ${activeFilter === 'recent' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
              onClick={() => setActiveFilter('recent')}
            >
              Most Recent
            </button>
            <button 
              className={`mr-2 px-4 py-1.5 rounded-full text-sm transition-colors ${activeFilter === 'popular' ? 'bg-primary text-primary-foreground' : 'bg-muted/50 hover:bg-muted'}`}
              onClick={() => setActiveFilter('popular')}
            >
              Most Popular
            </button>
          </div>
          
          {/* Projects Grid */}
          {activeTab === 'projects' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-card border border-border rounded-xl overflow-hidden transition-all hover:shadow-glow-sm animate-fade-in"
                >
                  {project.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-medium text-xl">{project.title}</h3>
                      {project.featured && (
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <img 
                          src={project.creator.avatar} 
                          alt={project.creator.name}
                          className="h-8 w-8 rounded-full mr-2" 
                        />
                        <span className="text-sm">{project.creator.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(project.date)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Star size={16} className="mr-1" /> {project.likes}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare size={16} className="mr-1" /> {project.comments}
                        </span>
                      </div>
                      <span className="bg-muted/50 px-2 py-1 rounded text-xs">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Members Grid */}
          {activeTab === 'members' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div 
                  key={member.id} 
                  className="bg-card border border-border rounded-xl overflow-hidden p-6 transition-all hover:shadow-glow-sm animate-fade-in"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="h-14 w-14 rounded-full mr-4" 
                    />
                    <div>
                      <h3 className="font-medium text-lg">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted/30 p-3 rounded-lg text-center">
                      <p className="text-xl font-medium">{member.projects}</p>
                      <p className="text-xs text-muted-foreground">Projects</p>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg text-center">
                      <p className="text-xl font-medium">{member.contributions}</p>
                      <p className="text-xs text-muted-foreground">Contributions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      Joined {formatDate(member.joinedDate)}
                    </span>
                    <Button variant="ghost" size="sm" className="text-primary">
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-md bg-primary text-primary-foreground">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md bg-muted/50 hover:bg-muted transition-colors">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md bg-muted/50 hover:bg-muted transition-colors">
                3
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-md bg-muted/50 hover:bg-muted transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-30"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold mb-6">
            Ready to <span className="text-gradient">Share Your Creation</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join our vibrant community and showcase what you've built with fake_by_Xel.
            Get feedback, find collaborators, and inspire others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="glow" size="lg">
                Sign up for free
              </Button>
            </Link>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="group">
                Join Discord
                <ExternalLink className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
