import React from "react";
import styles from "./Services.module.css";

const Services = () => {
  const services = [
    { title: "Hair Styling", desc: "Trendy cuts and creative hairstyles." },
    { title: "Makeup", desc: "Professional makeup for all occasions." },
    { title: "Nail Art", desc: "Vibrant designs with lasting shine." },
    { title: "Spa & Massage", desc: "Relax with premium therapies." },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Services</h1>
      <div className={styles.grid}>
        {services.map((service, i) => (
          <div key={i} className={styles.card}>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
