import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Us</h1>
      <p className={styles.text}>
        At <span className={styles.highlight}>Beauty Bliss</span>, we believe in
        enhancing natural beauty through elegance and care. Our expert stylists
        and beauticians bring years of experience and artistry to ensure every
        client leaves glowing and confident.
      </p>
      <p className={styles.text}>
        From modern haircuts to luxury spa treatments, our mission is to deliver
        a soothing, personalized experience in a stylish atmosphere.
      </p>
    </div>
  );
};

export default About;
