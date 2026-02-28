import React from "react";

export default function ContactShimmer() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl flex items-center justify-center bg-gradient-to-br from-white/10 to-white/5">
      <div className="text-center text-white/80">
        <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse mb-4"></div>
        <div className="text-lg font-medium">Loading 3D scene...</div>
      </div>
    </div>
  );
}
