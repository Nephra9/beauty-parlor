import React from "react";
import styles from "./Specialities.module.css";

const Specialities = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Specialities</h1>
      <ul className={styles.list}>
        <li>Bridal Makeovers 👰</li>
        <li>Hair Spa & Scalp Treatments 💇‍♀️</li>
        <li>Skin Care & Facials 💆‍♀️</li>
        <li>Luxury Mani-Pedi 💅</li>
      </ul>
    </div>
  );
};

export default Specialities;
