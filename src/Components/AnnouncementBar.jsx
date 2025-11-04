import React, { useEffect, useState } from "react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const dismissed = localStorage.getItem("bb-announce-dismissed");
    if (dismissed) setVisible(false);
  }, []);
  if (!visible) return null;
  return (
    <div style={{background:"var(--color-pink-soft)", color:"var(--color-rose-deep)", padding:"6px 0", textAlign:"center", fontWeight:600, fontSize:13}}>
      🎀 Holiday Sale: Up to 20% off lace fronts — use code PINKLOVE
      <button onClick={()=>{localStorage.setItem("bb-announce-dismissed","1"); setVisible(false);}} aria-label="Dismiss" style={{marginLeft:12, border:"none", background:"transparent", cursor:"pointer", color:"var(--color-rose-deep)"}}>✕</button>
    </div>
  );
}


