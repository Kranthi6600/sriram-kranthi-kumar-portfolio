import React from "react";

interface ShimmerProps {
  width?: string;
  height?: string;
  className?: string;
}

export default function Shimmer({ width = "w-full", height = "h-4", className = "" }: ShimmerProps) {
  return (
    <div 
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 rounded ${width} ${height} ${className}`}
      style={{
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite linear',
      }}
    />
  );
}
