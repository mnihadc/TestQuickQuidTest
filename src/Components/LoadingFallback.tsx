import React from "react";

const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]">
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl animate-pulse flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-2xl">Q</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-lg opacity-40" />
      </div>
      <p className="text-gray-400 mt-4">Loading QuickQuid...</p>
    </div>
  </div>
);

export default LoadingFallback;
