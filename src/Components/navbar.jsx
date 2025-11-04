import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.jpg";
import styles from "./header.module.css"; // ✅ Import CSS Module

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
        <div className="container">
          {/* Brand Section */}
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="Brand Logo"
              width="50"
              height="50"
              className={`rounded-circle border border-light me-2 ${styles.logo}`}
            />
            <span className={`fw-light fs-4 text-white ${styles.brandName}`}>
              Beauty Bliss
            </span>
          </NavLink>

          {/* Hamburger Menu */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Links */}
          <div
            className={`collapse navbar-collapse justify-content-center ${styles.navMenu}`}
            id="navbarNav"
          >
            <ul className="navbar-nav gap-4">
              {["Home", "About", "Services", "Specialities", "Gallery", "Booking"].map(
                (item) => (
                  <li key={item} className="nav-item">
                    <NavLink
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className={({ isActive }) =>
                        `nav-link text-white ${styles.navLink} ${
                          isActive ? styles.active : ""
                        }`
                      }
                    >
                      {item}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
