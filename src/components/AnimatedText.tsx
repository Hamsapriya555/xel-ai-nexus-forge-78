
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  gradient?: boolean;
  delay?: number;
  duration?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  element = 'h1',
  gradient = false,
  delay = 0,
  duration = 0.5,
}) => {
  const words = text.split(' ');
  
  const baseClasses = "inline-block";
  const gradientClasses = gradient ? "text-gradient" : "";
  
  // Choose which HTML element to render
  const Element = element;

  // Calculate delay for each word
  const getDelay = (index: number) => {
    return (delay + index * 0.1).toFixed(1);
  };

  return (
    <Element 
      className={cn(
        className,
      )}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-1">
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className={cn(
                baseClasses,
                gradientClasses,
                "opacity-0 animate-fade-in"
              )}
              style={{
                animationDelay: `${getDelay(wordIndex + charIndex * 0.03)}s`,
                animationFillMode: 'forwards',
                animationDuration: `${duration}s`,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Element>
  );
};

export default AnimatedText;
