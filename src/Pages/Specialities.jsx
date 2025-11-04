import React, { useEffect, useRef, useState } from "react";
import styles from "./Specialities.module.css";

// Import your images (adjust paths according to your project structure)
import image40 from "../assets/handsticth.png";
import image41 from "../assets/image_41.png";
import image42 from "../assets/ventilation.png";
import image44 from "../assets/image_42.png";
import image49 from "../assets/quality.png";
import image50 from "../assets/color.png";
import image51 from "../assets/sclap.png";
import image55 from "../assets/image_40.png";

// Import additional images for different sections
import collage1 from "../assets/ing.avif"; // Different images for collage
import collage2 from "../assets/w1.avif";
import collage3 from "../assets/w2.webp";
import collage4 from "../assets/w4.webp";

const Specialities = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const sectionRef = useRef(null);

  const craftsmanshipItems = [
    {
      id: 1,
      title: "Hand-Stitched Lace",
      description: "Precision lace work for undetectable hairlines",
      image: image42
    },
    {
      id: 2,
      title: "Silk Base Construction",
      description: "Ultra-comfortable silk bases for natural scalp appearance",
      image: image41
    },
    {
      id: 3,
      title: "Ventilation Artistry",
      description: "Hand-tied knots for realistic hair movement",
      image: image40
    },
    {
      id: 4,
      title: "Premium Hair Selection",
      description: "Only the finest 100% human hair sources",
      image: image44
    },
    {
      id: 5,
      title: "Custom Coloring",
      description: "Expert color matching and balayage techniques",
      image: image50
    },
    {
      id: 6,
      title: "Scalp Simulation",
      description: "Advanced technology for realistic scalp appearance",
      image: image51
    },
    {
      id: 7,
      title: "Density Perfection",
      description: "Custom density options for every preference",
      image: image55
    },
    {
      id: 8,
      title: "Quality Assurance",
      description: "200-point quality check on every piece",
      image: image49
    }
  ];

  const customizationItems = [
    {
      id: 1,
      title: "Personalized Fit",
      description: "Custom measurements for perfect comfort",
      backText: "Your comfort is our priority - every wig tailored to perfection",
      icon: ""
    },
    {
      id: 2,
      title: "Custom Colors",
      description: "Any shade, any tone, perfectly matched",
      backText: "Express your unique style with unlimited color possibilities",
      icon: ""
    },
    {
      id: 3,
      title: "Signature Style",
      description: "Create your unique look with our stylists",
      backText: "Your vision, our expertise - creating styles that define you",
      icon: ""
    },
    {
      id: 4,
      title: "Length Customization",
      description: "From pixie cuts to mermaid lengths",
      backText: "Short, long, or anywhere in between - your perfect length awaits",
      icon: ""
    },
    {
      id: 5,
      title: "Texture Selection",
      description: "Straight, wavy, curly - your perfect match",
      backText: "Find the texture that feels as natural as it looks",
      icon: ""
    },
    {
      id: 6,
      title: "Cap Construction",
      description: "Choose the perfect base for your needs",
      backText: "Innovative cap designs for ultimate comfort and security",
      icon: ""
    },
    {
      id: 7,
      title: "Hairline Design",
      description: "Natural, enhanced, or creative hairlines",
      backText: "Undetectable hairlines that look completely natural",
      icon: ""
    },
    {
      id: 8,
      title: "Accessory Integration",
      description: "Built-in clips, combs, and adjustable straps",
      backText: "Smart features that ensure your wig stays perfectly in place",
      icon: ""
    }
  ];

  const sliderImages = [
    { id: 1, image: image40, alt: "Model with curly wig" },
    { id: 2, image: image41, alt: "Model with straight wig" },
    { id: 3, image: image44, alt: "Model with wavy wig" },
    { id: 4, image: image42, alt: "Model with lace front wig" },
    { id: 5, image: image50, alt: "Model with colored wig" },
    { id: 6, image: image51, alt: "Model with natural wig" },
    { id: 7, image: image55, alt: "Model with premium wig" },
    { id: 8, image: image49, alt: "Model with quality wig" }
  ];

  const collageImages = [
    { image: collage1, alt: "Breathable wig technology" },
    { image: collage2, alt: "Lightweight construction" },
    { image: collage3, alt: "Comfortable fit system" },
    { image: collage4, alt: "Hypoallergenic materials" }
  ];

  const handleCardFlip = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.container} ref={sectionRef}>
      {/* Background Elements */}
      <div className={styles.backgroundParticles}>
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <div className={styles.header}>
        <div className={`${styles.titleContainer} ${isVisible ? styles.visible : ''}`}>
          <h1 className={styles.mainTitle}>OUR SPECIALITIES</h1>
          <div className={styles.underlineContainer}>
            <div className={`${styles.underline} ${isVisible ? styles.animateUnderline : ''}`}></div>
          </div>
        </div>
        
        <div className={`${styles.quoteContainer} ${isVisible ? styles.visible : ''}`}>
          <p className={styles.quote}>
            "Because true beauty begins with confidence — and every strand tells your story."
          </p>
        </div>
      </div>

      {/* Craftsmanship Section */}
      <section className={styles.craftsmanship}>
        <h2 className={styles.sectionTitle}>Craftsmanship</h2>
        <div className={styles.craftsmanshipGrid}>
          {craftsmanshipItems.map((item, index) => (
            <div 
              key={item.id} 
              className={styles.craftsmanshipCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.imageWrapper}>
                <img 
                  src={item.image} 
                  alt={item.title}
                  className={styles.cardImage}
                />
                <div className={styles.overlay}>
                  <div className={styles.overlayContent}>
                    <h3 className={styles.overlayTitle}>{item.title}</h3>
                    <p className={styles.overlayDescription}>{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customization Section with Flip Cards */}
      <section className={styles.customization}>
        <h2 className={styles.sectionTitle}>Customization</h2>
        <div className={styles.customizationGrid}>
          {customizationItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`${styles.customizationCard} ${flippedCards[item.id] ? styles.flipped : ''}`}
              style={{ animationDelay: `${index * 0.1 + 0.8}s` }}
              onMouseEnter={() => handleCardFlip(item.id)}
              onMouseLeave={() => handleCardFlip(item.id)}
            >  
              <div className={styles.cardInner}>
                {/* Front of the card */}
                <div className={styles.cardFront}>
                  <div className={styles.customizationIcon}>{item.icon}</div>
                  <h3 className={styles.customizationTitle}>{item.title}</h3>
                  <p className={styles.customizationDescription}>{item.description}</p>
                  <div className={styles.flipHint}>Hover to discover more</div>
                </div>
                
                {/* Back of the card */}
                <div className={styles.cardBack}>
                  <div className={styles.backIcon}>{item.icon}</div>
                  <p className={styles.backText}>{item.backText}</p>
                  <div className={styles.quoteMark}>""</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Variety & Comfort Technologies */}
      <section className={styles.varietyComfort}>
        <div className={styles.varietyContent}>
          <div className={styles.textContent}>
            <h2 className={styles.varietyTitle}>Variety & Comfort Technologies</h2>
            <div className={styles.featuresList}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}></span>
                <div className={styles.featureText}>
                  <h4>Breathable Scalp Technology</h4>
                  <p>Advanced materials that allow air circulation for all-day comfort</p>
                </div>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}></span>
                <div className={styles.featureText}>
                  <h4>Lightweight Construction</h4>
                  <p>Feather-light designs that feel like your natural hair</p>
                </div>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}></span>
                <div className={styles.featureText}>
                  <h4>Hypoallergenic Materials</h4>
                  <p>Safe for sensitive skin with premium, non-irritating fabrics</p>
                </div>
              </div>
              <div className={styles.feature}>
                <span className={styles.featureIcon}></span>
                <div className={styles.featureText}>
                  <h4>Perfect Fit System</h4>
                  <p>Adjustable caps and custom sizing for ultimate security</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.imageCollage}>
            {collageImages.map((item, index) => (
              <div 
                key={index} 
                className={styles.collageImage}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img 
                  src={item.image} 
                  alt={item.alt}
                  className={styles.collageImg}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invisible Image Slider - Improved */}
      <section className={styles.sliderSection}>
        <div className={styles.sliderContainer}>
          <div className={styles.sliderTrack}>
            {[...sliderImages, ...sliderImages].map((item, index) => (
              <div key={`${item.id}-${index}`} className={styles.sliderItem}>
                <div className={styles.sliderImageContainer}>
                  <img 
                    src={item.image} 
                    alt={item.alt}
                    className={styles.sliderImage}
                  />
                  <div className={styles.sliderOverlay}>
                    <span>View Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Description */}
      <section className={styles.closingSection}>
        <div className={styles.closingContent}>
          <div className={styles.sparkleBackground}>
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className={styles.sparkle}
                style={{
                  left: `${20 + i * 30}%`,
                  animationDelay: `${i * 0.5}s`
                }}
              >✨</div>
            ))}
          </div>
          <p className={styles.closingText}>
            Our specialities are crafted with love, care, and artistry — to make every woman feel 
            effortlessly confident, from boardrooms to bridal moments.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Specialities;