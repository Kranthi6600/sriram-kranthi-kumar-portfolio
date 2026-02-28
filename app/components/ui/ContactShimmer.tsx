import React from "react";

export default function ContactShimmer() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden rounded-2xl flex items-center justify-center bg-gradient-to-br from-white/5 via-white/2 to-transparent/50">
      <div className="text-center text-white/90">
        <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse mb-4 mx-auto"></div>
        <div className="text-lg font-medium">Loading 3D scene...</div>
      </div>
    </div>
  );
}
