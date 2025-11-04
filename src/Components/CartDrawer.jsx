import React from "react";
import Button from "../ui/Button";

export default function CartDrawer({ open, onClose, items = [] }) {
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="bb-modal-overlay" onClick={onClose}>
      <aside onClick={(e)=>e.stopPropagation()} style={{width:"min(420px, 92vw)", background:"var(--bg-elevated)", borderRadius:"16px", padding:"16px", boxShadow:"var(--shadow-md)"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
          <h3 style={{margin:0}}>Your Cart</h3>
          <button className="bb-icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div style={{display:"grid", gap:12, maxHeight:"60vh", overflowY:"auto"}}>
          {items.length === 0 && <div style={{color:"var(--text-muted)"}}>Your cart is empty</div>}
          {items.map((it)=> (
            <div key={it.id} style={{display:"flex", gap:12}}>
              <img src={it.image} alt="" width={72} height={72} style={{borderRadius:8, objectFit:"cover"}} />
              <div style={{flex:1}}>
                <div style={{fontWeight:600}}>{it.title}</div>
                <div style={{color:"var(--text-muted)", fontSize:13}}>Qty {it.qty}</div>
              </div>
              <div style={{fontWeight:600}}>{it.priceFormatted}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:16, borderTop:"1px solid color-mix(in oklab, var(--text-muted) 20%, transparent)", paddingTop:12}}>
          <div style={{color:"var(--text-muted)"}}>Subtotal</div>
          <div style={{fontWeight:700}}>₹{subtotal.toLocaleString()}</div>
        </div>
        <div style={{display:"grid", gap:8, marginTop:12}}>
          <Button className="bb-btn--primary bb-btn--lg">Checkout</Button>
          <Button variant="ghost" className="bb-btn--lg" onClick={onClose}>Continue Shopping</Button>
        </div>
      </aside>
    </div>
  );
}


