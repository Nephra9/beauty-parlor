import React from "react";
import styles from "./Home.module.css"; // ✅ CSS Module import
import Heroimage from "../assets/heroimage.png"
const Home = () => {
  return (
    <>
<div className={styles.mainpic}>
  <div className={styles.overlay}>
    <div className={styles.textContent}>
      <h1>Confidence. Beauty. You. 💖</h1>
      <p>
        Rediscover yourself with our premium collection of wigs — designed to
        make you feel empowered, elegant, and stress-free.
      </p>
      <button>Explore Wigs</button>
    </div>
  </div>

  <div className={styles.imagediv}>
    <img src={Heroimage} alt="Hero" className={styles.heroimage} />
  </div>
</div>


    </>
  );
};

export default Home;
