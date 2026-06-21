import React from "react";

export const Checkbox = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-2 p-2">
    <input 
      type="checkbox" 
      checked={checked} 
      onChange={onChange} 
      className="w-4 h-4"
    />
    <span>{label}</span>
  </label>
);
