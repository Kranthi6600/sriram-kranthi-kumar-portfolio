import React from "react";

export default function SkeletonCard() {
  return (
    <div className="p-5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
      <div className="space-y-3">
        <div className="h-6 bg-white/20 rounded-lg"></div>
        <div className="h-4 bg-white/10 rounded w-3/4"></div>
        <div className="h-4 bg-white/10 rounded w-1/2"></div>
      </div>
    </div>
  );
}
