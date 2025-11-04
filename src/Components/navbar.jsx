import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo.jpg";
import styles from "./header.module.css";

const Header = () => {
  const location = useLocation();

  // Check if current route is home
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`${styles.header} ${
        isHomePage ? styles.transparentHeader : styles.solidHeader
      }`}
    >
      <nav className={`navbar navbar-expand-lg navbar-dark ${styles.navbar}`}>
        <div className="container">
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
              {["Home", "About", "Services", "Specialities", "Gallery", "Booking"].map(
                (item) => (
                  <li key={item} className="nav-item">
                    <NavLink
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className={({ isActive }) =>
                        `nav-link ${styles.navLink} ${
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
