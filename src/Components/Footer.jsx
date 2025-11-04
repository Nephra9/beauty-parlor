import React from "react";
import { NavLink } from "react-router-dom";
import { Input } from "../ui/Input";
import Button from "../ui/Button";

export default function Footer() {
  return (
    <footer style={{ marginTop: "48px", borderTop: "1px solid color-mix(in oklab, var(--text-muted) 20%, transparent)", background: "var(--bg-elevated)" }}>
      <div className="container" style={{ padding: "32px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 24 }}>
          <div>
            <h3 style={{ marginTop: 0 }}>Stay in the loop</h3>
            <p style={{ color: "var(--text-muted)", marginTop: 8 }}>Get pink perks, insider drops and style tips. No spam.</p>
            <form onSubmit={(e)=>e.preventDefault()} style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <Input type="email" placeholder="Your email" aria-label="Email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          <div>
            <h4>Shop</h4>
            <nav aria-label="Footer Shop">
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                <li><NavLink to="/products?type=human">Human Hair</NavLink></li>
                <li><NavLink to="/products?type=synthetic">Synthetic</NavLink></li>
                <li><NavLink to="/products?type=lace">Lace Front</NavLink></li>
                <li><NavLink to="/products?type=accessories">Accessories</NavLink></li>
              </ul>
            </nav>
          </div>
          <div>
            <h4>Company</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/gallery">Editorial</NavLink></li>
              <li><NavLink to="/booking">Book a consult</NavLink></li>
            </ul>
          </div>
          <div>
            <h4>Policy</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 16, borderTop: "1px solid color-mix(in oklab, var(--text-muted) 20%, transparent)" }}>
          <small style={{ color: "var(--text-muted)" }}>© {new Date().getFullYear()} Beauty Bliss</small>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="YouTube">YouTube</a>
            <a href="#" aria-label="TikTok">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


