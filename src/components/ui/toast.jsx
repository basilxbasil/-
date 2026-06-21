import React from "react";

export const Toast = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col gap-2 rounded-md border bg-white p-4 shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
