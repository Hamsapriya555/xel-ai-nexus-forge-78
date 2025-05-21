
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-space-grotesk font-bold mb-6 text-gradient">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page not found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. 
        </p>
        <Link to="/">
          <Button variant="glow">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
