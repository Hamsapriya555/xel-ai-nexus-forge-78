
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Discord } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl font-mono font-bold text-gradient mb-4">
            fake_by_Xel
          </div>
          <p className="text-muted-foreground max-w-md">
            Borrow intelligence. Build ideas. The next generation AI platform for creators,
            developers, and thinkers.
          </p>
          <div className="flex space-x-4 mt-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Discord size={20} />
            </a>
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="font-medium text-lg mb-4">Resources</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">API Reference</Link></li>
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Examples</Link></li>
            <li><Link to="/community" className="text-muted-foreground hover:text-primary transition-colors">Community</Link></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="font-medium text-lg mb-4">Company</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
            <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} fake_by_Xel. All rights reserved.
        </p>
        <p className="text-muted-foreground text-sm mt-2 md:mt-0">
          Crafted with ✦ by Xel
        </p>
      </div>
    </footer>
  );
};

export default Footer;
