import React, { useEffect } from "react";

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="bb-modal-overlay" role="dialog" aria-modal="true" aria-label={title || "Dialog"} onClick={onClose}>
      <div className="bb-modal" onClick={(e) => e.stopPropagation()}>
        {title ? <div className="bb-modal-header"><h3>{title}</h3><button className="bb-icon-btn" onClick={onClose} aria-label="Close">✕</button></div> : null}
        <div className="bb-modal-body">{children}</div>
      </div>
    </div>
  );
}


