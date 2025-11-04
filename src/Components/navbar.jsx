import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import logo from "../assets/logo.jpg";
import styles from "./header.module.css";
import SearchModal from "./SearchModal";
import { demoProducts } from "../lib/products";
import { useCurrency } from "../context/CurrencyContext";
import CartDrawer from "./CartDrawer";
import AnnouncementBar from "./AnnouncementBar";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [compressed, setCompressed] = useState(false);
  const [openMega, setOpenMega] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openAccount, setOpenAccount] = useState(false);
  const { code, setCode } = useCurrency();

  useEffect(() => {
    const onScroll = () => setCompressed(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${isHomePage ? styles.floatingHeader : styles.fixedHeader} ${isHomePage ? styles.transparentHeader : styles.solidHeader} ${compressed ? styles.compressed : ""}`}
    >
      <AnnouncementBar />
      <nav className={`navbar navbar-expand-lg ${styles.navbar}`} aria-label="Primary">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="Brand Logo"
              width="50"
              height="50"
              className={`rounded-circle border border-light me-2 ${styles.logo}`}
            />
            <span className={`fw-light fs-4 ${styles.brandName}`}>
              Beauty Bliss
            </span>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse justify-content-center ${styles.navMenu}`}
            id="navbarNav"
          >
            <ul className="navbar-nav gap-4">
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => `nav-link ${styles.navLink} ${isActive ? styles.active : ""}`}>Home</NavLink>
              </li>
              <li className={`nav-item ${styles.hasMega}`}
                  onMouseEnter={() => setOpenMega(true)}
                  onMouseLeave={() => setOpenMega(false)}>
                <button className={`nav-link ${styles.navLink}`} aria-expanded={openMega} aria-haspopup="true">Wigs</button>
                <div className={`${styles.megaMenu} ${openMega ? styles.megaOpen : ""}`} role="menu">
                  <div className={styles.megaGrid}>
                    <div>
                      <h6>By Type</h6>
                      <ul>
                        <li><NavLink to="/products?type=human" className={styles.megaLink}>Human Hair</NavLink></li>
                        <li><NavLink to="/products?type=synthetic" className={styles.megaLink}>Synthetic</NavLink></li>
                        <li><NavLink to="/products?type=lace" className={styles.megaLink}>Lace Front</NavLink></li>
                        <li><NavLink to="/products?type=accessories" className={styles.megaLink}>Accessories</NavLink></li>
                      </ul>
                    </div>
                    <div>
                      <h6>Featured</h6>
                      <ul>
                        <li><NavLink to="/products?feature=bestsellers" className={styles.megaLink}>Bestsellers</NavLink></li>
                        <li><NavLink to="/products?feature=new" className={styles.megaLink}>New Arrivals</NavLink></li>
                        <li><NavLink to="/products?feature=editorial" className={styles.megaLink}>Editorial Picks</NavLink></li>
                      </ul>
                    </div>
                    <div className={styles.megaImage} aria-hidden="true"></div>
                  </div>
                </div>
              </li>
              <li className="nav-item"><NavLink to="/about" className={({ isActive }) => `nav-link ${styles.navLink} ${isActive ? styles.active : ""}`}>About</NavLink></li>
              <li className="nav-item"><NavLink to="/specialities" className={({ isActive }) => `nav-link ${styles.navLink} ${isActive ? styles.active : ""}`}>Specialities</NavLink></li>
              <li className="nav-item"><NavLink to="/gallery" className={({ isActive }) => `nav-link ${styles.navLink} ${isActive ? styles.active : ""}`}>Gallery</NavLink></li>
              <li className="nav-item"><NavLink to="/booking" className={({ isActive }) => `nav-link ${styles.navLink} ${isActive ? styles.active : ""}`}>Booking</NavLink></li>
            </ul>
            <div className={styles.actions}>
              <button className="bb-icon-btn" aria-label="Search" onClick={() => setOpenSearch(true)}><Search size={18} /></button>
              <button className="bb-icon-btn" aria-label="Cart" onClick={()=>setOpenCart(true)}><ShoppingCart size={18} /></button>
              <div style={{ position: "relative" }}>
                <button className="bb-icon-btn" aria-label="Account" onClick={()=>setOpenAccount((o)=>!o)}><User size={18} /></button>
                {openAccount && (
                  <div role="menu" style={{ position:"absolute", right:0, top:"calc(100% + 8px)", background:"var(--bg-elevated)", border:"1px solid color-mix(in oklab, var(--text-muted) 20%, transparent)", borderRadius:12, boxShadow:"var(--shadow-md)", minWidth:180 }}>
                    <a className={styles.megaLink} href="#" style={{padding:"8px 12px", display:"block"}}>Sign in</a>
                    <a className={styles.megaLink} href="#" style={{padding:"8px 12px", display:"block"}}>Create account</a>
                    <a className={styles.megaLink} href="#" style={{padding:"8px 12px", display:"block"}}>Orders</a>
                  </div>
                )}
              </div>
              <ThemeToggle />
              <select aria-label="Currency" className="bb-input" style={{ width: 92, height: 36 }} value={code} onChange={(e)=>setCode(e.target.value)}>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
      <SearchModal open={openSearch} onClose={() => setOpenSearch(false)} products={demoProducts} />
      <CartDrawer open={openCart} onClose={()=>setOpenCart(false)} items={[]} />
    </header>
  );
};

export default Header;
