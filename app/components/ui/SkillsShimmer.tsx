import React from "react";

export default function SkillsShimmer() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="p-5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
          <div className="w-full h-24 bg-gray-300 rounded-lg animate-pulse mb-3"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-2 bg-gray-100 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}
