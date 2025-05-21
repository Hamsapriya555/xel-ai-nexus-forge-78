
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  error?: string;
  type?: string;
  fullWidth?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  error,
  className,
  type = 'text',
  fullWidth = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const inputType = type === 'password' && showPassword ? 'text' : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={cn("mb-4", fullWidth ? "w-full" : "")}>
      {label && (
        <label 
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-foreground/80"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input 
          id={id}
          type={inputType}
          className={cn(
            "bg-muted/50 border rounded-md w-full px-4 py-2 text-foreground outline-none transition-all",
            "focus:ring-1 focus:border-primary focus:ring-primary/30",
            error ? "border-destructive" : "border-border",
            fullWidth ? "w-full" : "",
            className
          )}
          {...props}
        />

        {type === 'password' && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
