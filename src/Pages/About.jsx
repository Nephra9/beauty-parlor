import React, { useEffect } from "react";
import styles from "./About.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  return (
    <div className={styles.aboutWrapper}>

      {/* ✅ HERO SECTION */}
      <section className={styles.heroSection}>
        <video
          className={styles.heroVideo}
          src="/src/assets/Beauty_Store_Video_Generation1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className={styles.heroOverlay}></div>

        <div className={styles.heroContent}>
          <h1>Discover Your Beauty — Premium Wigs & Beauty Essentials</h1>
          <p>
            From luxurious human-hair wigs to trendy beauty must-haves, we help
            you look and feel your best — every single day.
          </p>
          <button className={styles.primaryBtn}>Shop Now</button>
        </div>
      </section>

      {/* ✅ STORY VIDEO LEFT */}
      <section className={styles.cardSection} data-aos="fade-right">
        <div className={styles.cardVideo}>
          <video
            className={styles.videoFrame}
            src="/src/assets/Beauty_Store_Video_Generation2.mp4"
            autoPlay loop muted playsInline
          />
        </div>

        <div className={styles.cardText}>
          <h2>Our Story</h2>
          <p>
            At <strong>Beauty Palace</strong>, beauty is confidence — and everyone deserves to shine.
          </p>
          <p>
            We began with a passion to provide high-quality wigs and beauty essentials
            at prices everyone can love. Today, we proudly serve our community with
            hundreds of wig styles and trusted beauty essentials.
          </p>
        </div>
      </section>

      {/* ✅ WHAT WE OFFER VIDEO RIGHT */}
      <section className={`${styles.cardSection} ${styles.reverse}`} data-aos="fade-left">
        <div className={styles.cardVideo}>
          <video
            className={styles.videoFrame}
            src="/src/assets/Beauty_Store_Video_Generation3.mp4"
            autoPlay loop muted playsInline
          />
        </div>

        <div className={styles.cardText}>
          <h2>What We Offer</h2>
          <ul>
            <li>Human-hair wigs & bundles</li>
            <li>Synthetic wigs & ponytails</li>
            <li>Braiding hair</li>
            <li>Hair care products & perfumes</li>
            <li>Beauty accessories</li>
            <li>Lash & brow kits</li>
            <li>Styling tools & glue products</li>
          </ul>
        </div>
      </section>

      {/* ✅ WHY CHOOSE US VIDEO LEFT */}
      <section className={styles.cardSection} data-aos="fade-right">
        <div className={styles.cardVideo}>
          <video
            className={styles.videoFrame}
            src="/src/assets/why.mp4"
            autoPlay loop muted playsInline
          />
        </div>

        <div className={styles.cardText}>
          <h2>Why Choose Us</h2>
          <ul>
            <li>Huge variety & updated stock</li>
            <li>Affordable pricing + hot deals</li>
            <li>Trusted quality products</li>
            <li>Real store + real customer service</li>
            <li>Trend-focused beauty shop</li>
            <li>Serving local beauty community</li>
          </ul>
        </div>
      </section>

      {/* ✅ SOCIAL PROOF VIDEO RIGHT */}
      <section className={`${styles.cardSection} ${styles.reverse}`} data-aos="fade-left">
        <div className={styles.cardVideo}>
          <video
            className={styles.videoFrame}
            src="/src/assets/Instagram_Beauty_Store_Animation_Generation.mp4"
            autoPlay loop muted playsInline
          />
        </div>

        <div className={styles.cardText}>
          <h2>Social Proof</h2>
          <p>
            Loved by thousands of beauty lovers — explore our Instagram
            for the latest drops & real transformations.
          </p>
          <button className={styles.primaryBtn}>Follow Instagram</button>
        </div>
      </section>

      {/* ✅ FINAL CTA VIDEO BACKGROUND */}
      <section className={styles.finalCTA}>
        <video
          className={styles.ctaVideo}
          src="/src/assets/cta.mp4"
          autoPlay loop muted playsInline
        />
        <div className={styles.ctaOverlay}></div>
        <h2>Ready to Transform Your Look?</h2>
        <button className={styles.primaryBtn}>Book Style Consultation</button>
      </section>

    </div>
  );
};

export default About;
