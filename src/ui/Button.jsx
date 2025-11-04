import React from "react";

export default function Button({ as: Comp = "button", variant = "primary", size = "md", className = "", children, ...props }) {
  const base = "bb-btn";
  const classes = [
    base,
    `${base}--${variant}`,
    `${base}--${size}`,
    className
  ].filter(Boolean).join(" ");
  return (
    <Comp className={classes} {...props}>
      {children}
    </Comp>
  );
}


