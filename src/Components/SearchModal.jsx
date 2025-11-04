import React, { useEffect, useMemo, useState } from "react";
import Modal from "../ui/Modal";
import { Input } from "../ui/Input";

export default function SearchModal({ open, onClose, products = [] }) {
  const [q, setQ] = useState("");
  useEffect(() => { if (!open) setQ(""); }, [open]);
  const results = useMemo(() => {
    if (!q) return [];
    const needle = q.toLowerCase();
    return products.filter(p => (p.title||"").toLowerCase().includes(needle)).slice(0, 8);
  }, [q, products]);
  return (
    <Modal open={open} onClose={onClose} title="Search">
      <Input autoFocus placeholder="Search wigs, styles, accessories" value={q} onChange={(e)=>setQ(e.target.value)} />
      <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
        {q && results.length === 0 && <div style={{ color: "var(--text-muted)" }}>No results</div>}
        {results.map((r) => (
          <a key={r.id} href={`/products/${r.id}`} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <img src={r.image} alt="" width={48} height={48} style={{ borderRadius: 8, objectFit: "cover" }} loading="lazy" />
            <div>
              <div>{r.title}</div>
              <small style={{ color: "var(--text-muted)" }}>{r.priceFormatted}</small>
            </div>
          </a>
        ))}
      </div>
    </Modal>
  );
}


