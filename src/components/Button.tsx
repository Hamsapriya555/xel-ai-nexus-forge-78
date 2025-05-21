
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseClasses = "font-medium rounded-md transition-all relative overflow-hidden";
  
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-primary/30 text-primary hover:bg-primary/10",
    ghost: "text-foreground hover:bg-muted",
    link: "text-primary underline-offset-4 hover:underline",
    glow: "btn-glow bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-sm hover:shadow-glow-md"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  const loadingClasses = isLoading 
    ? "relative text-transparent transition-none hover:text-transparent !cursor-wait" 
    : "";

  const disabledClasses = (disabled || isLoading) 
    ? "opacity-70 cursor-not-allowed" 
    : "";
  
  const fullWidthClasses = fullWidth ? "w-full" : "";
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidthClasses,
        loadingClasses,
        disabledClasses,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            className="animate-spin w-5 h-5 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
