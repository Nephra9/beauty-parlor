import React from "react";
import styles from "./Booking.module.css";

const Booking = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book Your Appointment</h1>
      <form className={styles.form}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="tel" placeholder="Phone Number" required />
        <select required>
          <option value="">Select Service</option>
          <option>Hair Styling</option>
          <option>Makeup</option>
          <option>Spa</option>
          <option>Nail Art</option>
        </select>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;
