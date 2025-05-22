
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to log out');
    }
  };

  const NavLinks = [
    { title: "Home", path: "/" },
    { title: "Chat", path: "/chat" },
    { title: "Community", path: "/community" },
  ];

  const navClasses = cn(
    "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-12",
    {
      "bg-xel-dark/80 backdrop-blur shadow-glow-sm": isScrolled,
      "bg-transparent": !isScrolled,
    }
  );

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-mono font-bold text-gradient">fake_by_Xel</div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-8">
            {NavLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={cn(
                  "relative font-medium text-sm transition-colors",
                  "hover:text-primary before:absolute before:bottom-[-4px] before:left-0",
                  "before:h-[2px] before:bg-primary before:transition-all before:duration-300",
                  location.pathname === link.path 
                    ? "text-primary before:w-full" 
                    : "text-foreground/80 before:w-0 hover:before:w-full"
                )}
              >
                {link.title}
              </Link>
            ))}
          </div>
          <div className="flex space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-foreground/80">
                  Welcome, {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-1 rounded-md text-sm font-medium border border-primary/30 text-primary hover:bg-primary/10 transition-all"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-1 rounded-md text-sm font-medium border border-primary/30 text-primary hover:bg-primary/10 transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn-glow px-4 py-1 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`
        md:hidden fixed top-[72px] right-0 w-full h-screen transition-all duration-300 bg-background/95 backdrop-blur-md
        ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}>
        <div className="flex flex-col p-6 space-y-6">
          {NavLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "text-lg font-medium py-2 border-b border-border",
                location.pathname === link.path 
                  ? "text-primary" 
                  : "text-foreground/80"
              )}
            >
              {link.title}
            </Link>
          ))}
          
          {user ? (
            <>
              <div className="flex items-center py-2 border-b border-border">
                <User size={20} className="mr-2 text-primary" />
                <span className="text-lg font-medium">{user.name}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-md font-medium border border-primary/30 text-center text-primary flex items-center justify-center"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                to="/login" 
                className="w-full py-3 rounded-md font-medium border border-primary/30 text-center text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="w-full py-3 rounded-md font-medium bg-primary text-center text-primary-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
