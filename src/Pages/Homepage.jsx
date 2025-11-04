import React from "react";
import styles from "./Home.module.css"; // ✅ CSS Module import

const Home = () => {
  return (
    <div className={`${styles.homeContainer} text-center py-5`}>
      <h1 className={`display-5 fw-light ${styles.title}`}>
        Welcome to Beauty Bliss 💅
      </h1>
      <p className={`lead ${styles.subtitle}`}>
        Experience luxury beauty and relaxation with our premium salon services.
      </p>
      <button className={`btn btn-light mt-3 px-4 py-2 ${styles.button}`}>
        Book Your Appointment
      </button>
    </div>
  );
};

export default Home;
