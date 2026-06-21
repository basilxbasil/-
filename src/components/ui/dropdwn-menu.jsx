import React from "react";

export const DropdownMenu = ({ children, className = "" }) => (
  <div className={`relative inline-block ${className}`}>{children}</div>
);

export const DropdownMenuTrigger = ({ children }) => (
  <button className="px-4 py-2 bg-gray-100 rounded">{children}</button>
);

export const DropdownMenuContent = ({ children }) => (
  <div className="absolute mt-2 w-48 bg-white border rounded shadow-lg">{children}</div>
);
