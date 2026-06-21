import React from "react";

export const Select = ({ children, onChange }) => (
  <select 
    className="w-full p-2 border rounded border-gray-300"
    onChange={(e) => onChange(e.target.value)}
  >
    {children}
  </select>
);
