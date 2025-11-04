import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggle } = useTheme();
  return (
    <button aria-label="Toggle theme" className={`bb-icon-btn ${className}`} onClick={toggle}>
      {theme === "dark" ? "🌙" : "🌤️"}
    </button>
  );
}


