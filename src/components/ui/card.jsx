import React from "react";

export const Card = ({ children, className = "" }) => {
  return (
    <div className={`border rounded-lg shadow-sm p-4 bg-white ${className}`}>
      {children}
    </div>
  );
};
