
import React from 'react';

export const Discord = ({ size = 24, color = 'currentColor', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 9a4 4 0 0 0-4.5-3.8A5 5 0 0 0 8.5 9M18 9l1 7c-3 1-6 1-9 0-3 0-6 0-9-1l1-7M18 9H6M5 14h2m10 0h2" />
    </svg>
  );
};
