import React, { useState, useEffect } from "react";
import styles from "./Home.module.css"; // ✅ CSS Module import
import Heroimage from "../assets/heroimage.png"
import logoimage1 from "../assets/one.webp"
import logoimage2 from "../assets/two.webp"
import logoimage3 from "../assets/three.webp"
import logoimage4 from "../assets/four.webp"
import logoimage5 from "../assets/five.jpg"
import { ArrowUp } from "lucide-react";
import Balayage from "../assets/Balayage Highlights.jpg";
import BobCut from "../assets/Chic Bob Cut.jpg";
import CurtainBangs from "../assets/Curtain Bangs.jpg";
import MessyBun from "../assets/Messy Bun.jpg";
import WavyBob from "../assets/Wavy Bob.jpg";
import ShagCut from "../assets/Shag Cut.jpg";
import PixieCut from "../assets/Pixie Cut.jpg";
import SleekPonytail from "../assets/Sleek Ponytail.jpg";
import { Gift } from "lucide-react"
// ✅ import offer images
import Offer1 from "../assets/offer1.jpg";
import Offer2 from "../assets/offer2.jpg";
import Offer3 from "../assets/offer3.jpg";
import Offer4 from "../assets/offer4.jpg";
import Offer5 from "../assets/offer5.jpg";
const Home = () => {
 const [showOffers, setShowOffers] = useState(false);

  const openOffers = () => setShowOffers(true);
  const closeOffers = () => setShowOffers(false);

  const offerImages = [Offer1, Offer2, Offer3, Offer4, Offer5];
   const [showArrow, setShowArrow] = useState(false);

  // Show arrow only after scrolling 300px
  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };



  const hairStyles = [
  { src: logoimage1, title: "Braids" },
  { src: logoimage2, title: "Waves" },
  { src: logoimage3, title: "Straight" },
  { src: logoimage4, title: "Curls" },
  { src: logoimage5, title: "Bun Styles" },
];
  const loopedCards = [...hairStyles, ...hairStyles];
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

<div className={styles.second}>
  <div className={styles.subsec}>
    <div className={styles.innerdiv}>
     <h1>💖 Channel Your Inner Beauty 💖</h1>
  <p>Explore our variety of elegant and trendy hair styles just for you!</p>
    </div>

 <div className={styles.secondcards}>
  <div className={styles.carouselContainer}>
    <div className={styles.track}>
  {[...hairStyles, ...hairStyles].map((style, index) => (
    <div key={index} className={styles.card}>
      <img src={style.src} alt={style.title} />
      <h3>{style.title}</h3>
    </div>
  ))}
</div>

  </div>
</div>


  </div>
</div>

<div className={styles.third}>
  <div className={styles.subthird}>
     <h1>🌸 Dive Through Current Trends & Fashion 🌸</h1>
  <p>Step into the latest looks that redefine style and grace.</p>
  </div>

  <div className={styles.trendCarousel}>
    <div className={styles.trendTrack}>
      {[
        { src: Balayage, title: "Balayage Highlights" },
        { src: BobCut, title: "Chic Bob Cut" },
        { src: CurtainBangs, title: "Curtain Bangs" },
        { src: MessyBun, title: "Messy Bun" },
        { src: WavyBob, title: "Wavy Bob" },
        { src: ShagCut, title: "Shag Cut" },
        { src: PixieCut, title: "Pixie Cut" },
        { src: SleekPonytail, title: "Sleek Ponytail" },
        // duplicated for seamless loop
        { src: Balayage, title: "Balayage Highlights" },
        { src: BobCut, title: "Chic Bob Cut" },
        { src: CurtainBangs, title: "Curtain Bangs" },
        { src: MessyBun, title: "Messy Bun" },
        { src: WavyBob, title: "Wavy Bob" },
        { src: ShagCut, title: "Shag Cut" },
        { src: PixieCut, title: "Pixie Cut" },
        { src: SleekPonytail, title: "Sleek Ponytail" },
      ].map((trend, index) => (
        <div key={index} className={styles.trendcard}>
          <img src={trend.src} alt={trend.title} />
          <h3>{trend.title}</h3>
        </div>
      ))}
    </div>
  </div>
</div>

<div className={styles.bestSelling}>
  <div className={styles.bestHeader}>
    <h1>✨ Our Best Selling Styles ✨</h1>
    <p>Discover the most loved and trending looks our customers adore!</p>
  </div>

  <div className={styles.bestGrid}>
    {[
      { src: Balayage, title: "Balayage Highlights", price: "₹2,499" },
      { src:BobCut, title: "Chic Bob Cut", price: "₹1,999" },
      { src: CurtainBangs, title: "Curtain Bangs", price: "₹2,299" },
      { src: MessyBun, title: "Messy Bun Extension", price: "₹1,799" },
      { src:WavyBob , title: "Wavy Bob Wig", price: "₹2,899" },
      { src:PixieCut , title: "Pixie Cut", price: "₹2,199" },
    ].map((item, index) => (
      <div key={index} className={styles.bestCard}>
        <img src={item.src} alt={item.title} />
        <div className={styles.cardDetails}>
          <h3>{item.title}</h3>
          <p className={styles.price}>{item.price}</p>
          <button>Buy Now</button>
        </div>
      </div>
    ))}
  </div>
</div>
  {/* Scroll To Top Button */}
      {showArrow && (
        <button className={styles.scrollTop} onClick={scrollToTop}>
          <ArrowUp size={28} />
        </button>
      )}



        {/* Floating Offers Button */}
      <button className={styles.offersButton} onClick={openOffers}>
        <Gift size={22} />
        <span>Offers</span>
      </button>

      {/* Offers Modal */}
      {showOffers && (
        <div className={styles.modalOverlay} onClick={closeOffers}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeBtn} onClick={closeOffers}>
              &times;
            </button>
            <h2>🎁 November Special Offers 🎁</h2>
            <div className={styles.offerGallery}>
              {offerImages.map((src, index) => (
                <img key={index} src={src} alt={`Offer ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      )}


    </>
  );
};

export default Home;
