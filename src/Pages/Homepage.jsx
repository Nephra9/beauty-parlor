import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
import { Gift, ShieldCheck, Truck, RefreshCw, Star } from "lucide-react"
import { useInView } from "../hooks/useInView";
import Video1 from "../assets/Beauty_Store_Video_Generation1.mp4";
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
  // Hero carousel slides (reuse hero + a couple of brand images)
  const heroSlides = [
    { src: Heroimage, headline: "Confidence. Beauty. You.", sub: "Premium human hair & synthetic wigs" },
    { src: logoimage1, headline: "New Lace Front Arrivals", sub: "Natural hairlines you’ll love" },
    { src: logoimage3, headline: "Salon‑Quality Styles", sub: "Shipped fast, styled to perfection" },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const { ref: countersRef, inView: countersInView } = useInView({ threshold: 0.25 });
  const counters = [
    { value: 10000, label: "Happy customers" },
    { value: 250, label: "Styles in stock" },
    { value: 4.8, label: "Average rating" },
    { value: 14, label: "Day returns" }
  ];
  useEffect(() => {
    const id = setInterval(() => setActiveSlide((i) => (i + 1) % heroSlides.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
<Helmet>
  <title>Beauty Bliss Wigs – Premium Human Hair & Synthetic Wigs</title>
  <meta name="description" content="Shop premium wigs: human hair, synthetic, lace front. Free consultations, easy returns, and fast shipping." />
</Helmet>
<div className={styles.mainpic}>
  <div className={styles.heroCarousel} aria-roledescription="carousel">
    {heroSlides.map((s, i) => (
      <div key={i} className={`${styles.heroSlide} ${i === activeSlide ? styles.heroSlideActive : ""}`}> 
        <div className={styles.imagediv}>
          <img src={s.src} alt="Hero" className={styles.heroimage} />
        </div>
        <div className={styles.overlay}>
          <div className={styles.textContent}>
            <h1>{s.headline} 💖</h1>
            <p>{s.sub} — designed to make you feel empowered and elegant.</p>
            <button className="bb-btn bb-btn--primary bb-btn--lg">Explore Wigs</button>
          </div>
        </div>
      </div>
    ))}
    <div className={styles.heroControls}>
      {heroSlides.map((_, i) => (
        <button key={i} aria-label={`Go to slide ${i+1}`} className={`${styles.dot} ${i === activeSlide ? styles.dotActive : ""}`} onClick={() => setActiveSlide(i)} />
      ))}
    </div>
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
  {[...hairStyles, ...hairStyles, ...hairStyles].map((style, index) => (
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

{/* Trust badges */}
<section className={styles.badges} aria-label="Trust badges">
  <div className={styles.badge}><ShieldCheck size={20} /><div><div className={styles.badgeTitle}>Premium Quality</div><div className={styles.badgeText}>Hand‑selected, salon‑approved</div></div></div>
  <div className={styles.badge}><Truck size={20} /><div><div className={styles.badgeTitle}>Fast Shipping</div><div className={styles.badgeText}>Trackable, reliable delivery</div></div></div>
  <div className={styles.badge}><RefreshCw size={20} /><div><div className={styles.badgeTitle}>Easy Returns</div><div className={styles.badgeText}>Hassle‑free within 14 days</div></div></div>
  <div className={styles.badge}><Star size={20} /><div><div className={styles.badgeTitle}>Loved by 10k+</div><div className={styles.badgeText}>4.8★ average rating</div></div></div>
</section>

{/* Featured collections */}
<section className={styles.featured} aria-label="Featured collections">
  <a className={styles.featureCard} href="/products?type=lace">
    <img src={logoimage3} alt="Lace Front" loading="lazy" />
    <div className={styles.featureOverlay}><div><h3>Lace Front</h3><p>Ultra‑natural hairlines</p></div></div>
  </a>
  <a className={styles.featureCard} href="/products?type=human">
    <img src={logoimage1} alt="Human Hair" loading="lazy" />
    <div className={styles.featureOverlay}><div><h3>Human Hair</h3><p>Salon‑grade textures</p></div></div>
  </a>
  <a className={styles.featureCard} href="/products?type=synthetic">
    <img src={logoimage2} alt="Synthetic" loading="lazy" />
    <div className={styles.featureOverlay}><div><h3>Synthetic</h3><p>Effortless styling</p></div></div>
  </a>
</section>

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
          <button className="bb-btn bb-btn--primary bb-btn--md">Buy Now</button>
        </div>
      </div>
    ))}
  </div>
</div>
{/* Testimonials */}
<section className={styles.testimonials}>
  <div className={styles.sectionHeader}><h1>What customers say</h1><p>Real stories. Real confidence.</p></div>
  <div className={styles.testimonialGrid}>
    {[{q:"Absolutely love this wig! Looks so natural.",n:"Sarah M.",r:"Model"},{q:"Quality exceeded expectations. Will order again.",n:"Priya S.",r:"Stylist"},{q:"Fast shipping and perfect fit.",n:"Aisha K.",r:"Creator"}].map((t,i)=> (
      <div key={i} className={styles.testimonialCard}>
        <p>“{t.q}”</p>
        <div className={styles.testimonialName}>{t.n}</div>
        <div className={styles.testimonialRole}>{t.r}</div>
      </div>
    ))}
  </div>
</section>
{/* Brand marquee */}
<div className={styles.marquee} aria-hidden="true">
  <div className={styles.marqueeInner}>
    {Array.from({length:20}).map((_,i)=> (
      <span key={i}>BEAUTY BLISS • PREMIUM WIGS • LACE FRONT • HUMAN HAIR • SYNTHETIC</span>
    ))}
  </div>
  <div className={styles.marqueeInner} aria-hidden="true">
    {Array.from({length:20}).map((_,i)=> (
      <span key={i}>BEAUTY BLISS • PREMIUM WIGS • LACE FRONT • HUMAN HAIR • SYNTHETIC</span>
    ))}
  </div>
  </div>

{/* Editorial / Blog Preview */}
<section className={styles.editorial}>
  <div className={styles.sectionHeader}><h1>From our editorial</h1><p>Tips, trends and tutorials</p></div>
  <div className={styles.editorialGrid}>
    <a className={styles.editorCard} href="#">
      <img src={WavyBob} alt="Choosing the right cap" loading="lazy" />
      <div className={styles.editorMeta}><h4>Choosing the right cap</h4><p>Comfort meets confidence</p></div>
    </a>
    <a className={styles.editorCard} href="#">
      <img src={ShagCut} alt="Color matching 101" loading="lazy" />
      <div className={styles.editorMeta}><h4>Color matching 101</h4><p>Find your perfect tone</p></div>
    </a>
    <a className={styles.editorCard} href="#">
      <img src={PixieCut} alt="Care & maintenance" loading="lazy" />
      <div className={styles.editorMeta}><h4>Care & maintenance</h4><p>Keep your wig gorgeous</p></div>
    </a>
  </div>
</section>
{/* Video CTA */}
<section className={styles.editorial}>
  <div className={styles.sectionHeader}><h1>See the movement</h1><p>Natural flow and shine</p></div>
  <div style={{maxWidth:1120, margin:"0 auto", borderRadius:16, overflow:"hidden", boxShadow:"var(--shadow-md)"}}>
    <video src={Video1} autoPlay muted loop playsInline style={{width:"100%", display:"block"}} />
  </div>
</section>

{/* Animated counters */}
<section ref={countersRef} className={styles.counters} aria-label="Stats">
  {counters.map((c,i)=> (
    <div key={i} className={styles.counterCard}>
      <div className={styles.counterValue}>{countersInView ? (c.value === 4.8 ? "4.8★" : `+${c.value.toLocaleString()}`) : (c.value === 4.8 ? "0★" : "+0")}</div>
      <div className={styles.counterLabel}>{c.label}</div>
    </div>
  ))}
  </section>

{/* Newsletter mid-page CTA */}
<section className={styles.testimonials}>
  <div className={styles.sectionHeader}><h1>Join the pink list</h1><p>Get drops, tips and rewards</p></div>
  <form onSubmit={(e)=>e.preventDefault()} style={{maxWidth:640, margin:"0 auto", display:"flex", gap:8}}>
    <input className="bb-input" placeholder="Your email" aria-label="Email" />
    <button className="bb-btn bb-btn--primary bb-btn--lg" type="submit">Subscribe</button>
  </form>
</section>
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
