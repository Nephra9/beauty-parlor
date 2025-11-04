import React from "react";

export default function Skeleton({ width = "100%", height = 16, className = "" }) {
  const style = { width, height };
  return <div className={`bb-skeleton ${className}`} style={style} aria-hidden="true" />;
}


