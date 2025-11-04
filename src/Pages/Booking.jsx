import React, { useState, useRef } from "react";
import "./Booking.css";
import beautyPic from "./BeautyPic.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShinyPinkButton = ({ text, onClick, className }) => {
  return (
    <div className={`button-wrapper ${className || ""}`} onClick={onClick}>
      <button className={`luxury-btn ${className || ""}`}>{text}</button>
    </div>
  );
};

export default function Booking() {
  const bookingRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    mobile: "",
    countryCode: "+91",
    address: "",
    pincode: "",
    hairType: "",
    hairStyle: "",
    hairColor: "",
    hairTexture: "",
    hairLength: "",
    date: "",
    time: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast.success(
        `💇‍♀️ Hello ${formData.name || "Guest"}! Your appointment on ${
          formData.date
        } at ${formData.time} has been successfully booked! 💖`,
        {
          position: "top-right",
          autoClose: 4000,
          theme: "colored",
        }
      );
      setIsSubmitting(false);
    }, 1200);
  };

  const scrollToBooking = () =>
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });

  const timeSlots = [
    "09:00 AM",
    "11:00 AM",
    "01:00 PM",
    "03:00 PM",
    "05:00 PM",
    "07:00 PM",
  ];

  const countryCodes = [
    { code: "+91", flag: "🇮🇳", name: "India" },
    { code: "+1", flag: "🇺🇸", name: "USA" },
    { code: "+44", flag: "🇬🇧", name: "UK" },
    { code: "+81", flag: "🇯🇵", name: "Japan" },
    { code: "+61", flag: "🇦🇺", name: "Australia" },
    { code: "+49", flag: "🇩🇪", name: "Germany" },
  ];

  const features = [
    { icon: "👑", label: "Premium Wigs" },
    { icon: "✨", label: "Expert Styling" },
    { icon: "💖", label: "Hair Care Products" },
    { icon: "⭐", label: "Professional Consultation" },
  ];

  return (
    <div className="booking-page fade-in">
      <ToastContainer />

      {/* ===== HERO SECTION ===== */}
      <section className="hero">
        <div className="floating-bg"></div>
        <div className="hero-inner slide-up">
          <div className="hero-icon">
            <img
              src={beautyPic}
              alt="Luxury Beauty Icon"
              className="beauty-icon"
            />
          </div>

          <h1 className="hero-title">
            Your Hair Is Your
            <br />
            <span className="hero-gradient">Crown of Glory</span>
          </h1>

          <p className="hero-subtitle">
            <em>Wear it with confidence, embrace your beauty</em>
          </p>

          <div className="hero-btn-container">
            <ShinyPinkButton
              text="Book Appointment"
              onClick={scrollToBooking}
              className="book-btn"
            />
          </div>

          <p className="hero-small">
            ✨ Transform your look with our premium hair wigs & expert styling ✨
          </p>

          <div className="features">
            {features.map((f) => (
              <div key={f.label} className="feature-pill">
                <span className="pill-icon">{f.icon}</span> {f.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FORM SECTION ===== */}
      <section ref={bookingRef} className="form-section fade-in">
        <div className="form-card shimmer">
          <h2 className="form-title">Luxury Hair Appointment 💖</h2>
          <p className="form-subtitle">
            Please fill in your details to book your transformation.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender *</label>
              <div className="radio-group">
                {["Female", "Male", "Other"].map((g) => (
                  <label
                    key={g}
                    className={`radio-box ${
                      formData.gender === g ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      required
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Mobile Number *</label>
              <div className="mobile-input">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="country-code"
                  required
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {`${c.flag} ${c.name} ${c.code}`}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address *</label>
              <textarea
                name="address"
                placeholder="Enter your complete address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Pincode *</label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter 6-digit pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-divider">Hair Preferences ✨</div>

            <div className="form-row">
              <div className="form-group half">
                <label>Hair Type *</label>
                <select
                  name="hairType"
                  value={formData.hairType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="straight">Straight</option>
                  <option value="wavy">Wavy</option>
                  <option value="curly">Curly</option>
                  <option value="coily">Coily</option>
                </select>
              </div>

              <div className="form-group half">
                <label>Hair Style *</label>
                <select
                  name="hairStyle"
                  value={formData.hairStyle}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select style</option>
                  <option value="bob">Bob Cut</option>
                  <option value="pixie">Pixie Cut</option>
                  <option value="layered">Layered</option>
                  <option value="waves">Beach Waves</option>
                  <option value="updo">Updo</option>
                  <option value="braids">Braids</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label>Hair Color *</label>
                <select
                  name="hairColor"
                  value={formData.hairColor}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select color</option>
                  <option value="black">Natural Black</option>
                  <option value="brown">Dark Brown</option>
                  <option value="blonde">Blonde</option>
                  <option value="burgundy">Burgundy</option>
                  <option value="highlights">Highlights</option>
                </select>
              </div>

              <div className="form-group half">
                <label>Hair Texture *</label>
                <select
                  name="hairTexture"
                  value={formData.hairTexture}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select texture</option>
                  <option value="fine">Fine</option>
                  <option value="medium">Medium</option>
                  <option value="thick">Thick</option>
                </select>
              </div>
            </div>

            <div className="form-group full">
              <label>Hair Length *</label>
              <select
                name="hairLength"
                value={formData.hairLength}
                onChange={handleChange}
                required
              >
                <option value="">Select length</option>
                <option value="short">Short (Above Shoulders)</option>
                <option value="medium">Medium (Shoulder Length)</option>
                <option value="long">Long (Below Shoulders)</option>
                <option value="extra-long">Extra Long</option>
              </select>
            </div>

            <div className="form-divider">Schedule Appointment 💅</div>

            <div className="form-group full">
              <label>Preferred Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full">
              <label>Preferred Time *</label>
              <div className="radio-group time-group">
                {timeSlots.map((slot) => (
                  <label
                    key={slot}
                    className={`radio-box time-box ${
                      formData.time === slot ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="time"
                      value={slot}
                      checked={formData.time === slot}
                      onChange={handleChange}
                      required
                    />
                    {slot}
                  </label>
                ))}
              </div>
            </div>

            <div className="button-center">
              <ShinyPinkButton
                text={isSubmitting ? "Processing..." : "Confirm Appointment"}
              />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
