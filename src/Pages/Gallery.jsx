import React from "react";
import styles from "./Gallery.module.css";

const Gallery = () => {
  const images = [
    "https://via.placeholder.com/300x200?text=Hair+Care",
    "https://via.placeholder.com/300x200?text=Makeup",
    "https://via.placeholder.com/300x200?text=Spa",
    "https://via.placeholder.com/300x200?text=Nails",
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Gallery</h1>
      <div className={styles.grid}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Gallery ${i}`} className={styles.image} />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
