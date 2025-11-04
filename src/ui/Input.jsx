import React from "react";

export function Input({ className = "", ...props }) {
  return <input className={`bb-input ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }) {
  return (
    <select className={`bb-input bb-select ${className}`} {...props}>
      {children}
    </select>
  );
}


