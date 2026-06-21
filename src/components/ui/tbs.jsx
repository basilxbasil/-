import React from "react";

export const Tabs = ({ children, className = "" }) => (
  <div className={`w-full ${className}`}>{children}</div>
);

export const TabsList = ({ children, className = "" }) => (
  <div className={`flex space-x-2 border-b ${className}`}>{children}</div>
);

export const TabsTrigger = ({ children, className = "" }) => (
  <button className={`px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:text-blue-600 ${className}`}>
    {children}
  </button>
);
