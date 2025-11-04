import React, { useEffect, useMemo, useState } from "react";
import styles from "./Gallery.module.css";
import Modal from "../ui/Modal";
import { Star, Share2, Download } from "lucide-react";

/*
  Note: this file uses the large imagesData you already have.
  Update paths if your images are located elsewhere.
*/
const imagesData = [
  { id: 1, src: "Sample Images/image_9.png", hoverSrc: "Sample Images/image_12.png", category: "hair", name: "Glossy Curls Perfection", description: "Defined curls meet high gloss in this standout look. Captures the essence of luxury haircare and styling mastery. Perfect inspiration for showcasing curl definition products. Radiates confidence and modern femininity." },
  { id: 2, src: "Sample Images/image_10.png", category: "hair", name: "Flowing Back-View Extensions", description: "A graceful back-profile shot highlighting silky, seamless extensions. Illustrates natural fall and consistency in color tone. Ideal for online listings and stylist portfolios. Symbolizes strength and elegance through movement." },
  { id: 3, src: "Sample Images/image_11.png", category: "hair", name: "Long Layered Brilliance", description: "Softly layered waves create a look full of motion and volume. This image captures the balance between polish and freedom. Perfect for clients who prefer natural flow with added lift. A timeless hairstyle suitable for any occasion." },
  { id: 4, src: "Sample Images/image_2.png", category: "hair", name: "Jet-Black Silky Weft", description: "These glossy, deep-black extensions redefine elegance. The natural sheen mimics freshly conditioned hair, giving a healthy, radiant appearance. Each weft is carefully aligned for smooth application and movement. A timeless favorite for both professional stylists and at-home users." },
  { id: 5, src: "Sample Images/image_12.png", category: "hair", name: "Radiant Brunette Elegance", description: "Mid-length extensions with a glossy, mirror-smooth finish. Blends seamlessly with darker hair tones. The perfect choice for a minimal yet refined look. Easy to style, low-maintenance, and eternally chic." },
  { id: 6, src: "Sample Images/image_13.png", category: "hair", name: "Graceful Back Texture", description: "Showcases thick, healthy hair from a rear angle. Highlights even volume and length distribution. Great for product comparison visuals. Evokes strength, growth, and natural care." },
  { id: 7, src: "Sample Images/image_3.png", category: "hair", name: "Ombre Balayage Extension Set", description: "Blend from dark roots to soft caramel ends with this natural gradient set. Perfect for those who love color depth without chemical treatment. Adds instant warmth and sophistication to any look. Crafted with durable cuticles for long-lasting smoothness." },
  { id: 8, src: "Sample Images/image_4.png", category: "hair", name: "Textured Weft Duo", description: "A versatile double-pack of extensions with subtle wave and shine. These wefts enhance dimension and body while staying easy to maintain. Designed for styling flexibility—curl, straighten, or braid. Suitable for medium-to-thick hair transformations." },
  { id: 9, src: "Sample Images/image_5.png", category: "hair", name: "Braided Crown Piece", description: "A pre-braided accessory designed for instant elegance. Wrap it around buns, ponytails, or updos for a sophisticated finish. The secure band keeps it perfectly in place during events. Adds a touch of traditional charm to modern hairstyles." },
  { id: 10, src: "Sample Images/image_6.png", category: "hair", name: "Precision Hair Styling Wand", description: "A sleek, salon-grade wand perfect for defining smooth locks or soft curls. Its ergonomic design ensures precision control and effortless glide. Paired with heat-protect technology to preserve hair health. A must-have for professionals and at-home stylists alike." },
  { id: 11, src: "Sample Images/image_7.png", hoverSrc: "Sample Images/image_12.png", category: "hair", name: "Party-Ready Volume Trio", description: "A trio of models showcasing the bounce and vitality of styled extensions. Perfect for campaign imagery or lifestyle branding. Highlights shine, diversity, and seamless blending. Represents the beauty of natural movement in styled hair." },
  { id: 12, src: "Sample Images/image_8.png", category: "hair", name: "Duo Styling Inspiration", description: "Two radiant looks displaying effortless extension blending. Ideal for catalog or banner use. Demonstrates versatility—wear it straight or wavy. Embodies confidence, energy, and natural glamor." },
  { id: 13, src: "Sample Images/image_13.png", category: "hair", name: "Graceful Back Texture", description: "Showcases thick, healthy hair from a rear angle. Highlights even volume and length distribution. Great for product comparison visuals. Evokes strength, growth, and natural care." },
  { id: 14, src: "Sample Images/image_14.png", category: "hair", name: "Side-Profile Glow", description: "This shot emphasizes shine and bounce from a dynamic angle. Ideal for social media banners or e-commerce thumbnails. Highlights texture richness under natural light. A modern beauty with effortless charm." },
  { id: 15, src: "Sample Images/image_15.png", category: "hair", name: "Everyday Straight Elegance", description: "Perfectly straight, shoulder-length extensions for everyday wear. Simple, versatile, and endlessly flattering. Designed for minimal heat styling while maintaining sleekness. A go-to choice for daily confidence." },
  { id: 16, src: "Sample Images/image_16.png", category: "hair", name: "Satin Smooth Finish", description: "A radiant model displaying rich texture and volume. The straight style brings attention to healthy shine. Designed to complement all complexions and outfits. The ultimate statement of polished simplicity." },
  { id: 17, src: "Sample Images/image_17.png", category: "hair", name: "Classic Mid-Length Layers", description: "Layers that frame the face beautifully, creating effortless movement. Ideal for a refreshed yet natural appearance. Soft ends and lightweight structure allow flexible styling. Perfect for clients who prefer understated luxury." },
  { id: 18, src: "Sample Images/image_18.png", category: "hair", name: "Long & Lustrous Extensions", description: "Captures a full-length shot of smooth, flowing extensions. Highlights seamless attachment and luxurious thickness. The definition of sophistication through simplicity. Best paired with formal or bridal looks." },
  { id: 19, src: "Sample Images/image_19.png", category: "hair", name: "Bridal Updo Perfection", description: "An elegant updo showcasing volume and shine. Ideal for wedding inspiration or catalog covers. Displays the texture quality and natural sheen of extensions. A graceful balance of style and romance." },
  { id: 20, src: "Sample Images/image_20.png", category: "hair", name: "Textured Top Bun Look", description: "Features a voluminous bun enhanced by soft waves. Designed for stylists showcasing structured upstyles. Adds instant lift while maintaining a natural finish. Perfect for editorial shoots or event campaigns." },
  { id: 21, src: "Sample Images/image_21.png", hoverSrc: "Sample Images/image_12.png", category: "hair", name: "Side-Twist Charm", description: "A chic, twisted updo that exudes poise and grace. Perfect for formal occasions or professional looks. Demonstrates hair flexibility with minimal accessories. The clean finish makes it ideal for minimalistic branding." },
  { id: 22, src: "Sample Images/image_22.png", category: "hair", name: "Full-Body Silky Waves", description: "Long cascading waves define this luxurious shot. Each strand reflects perfect moisture balance. A beautiful showcase for extension sheen and color blending. Ideal for display banners or premium product pages." },
  { id: 23, src: "Sample Images/image_23.png", category: "hair", name: "Product Display: Straight Extensione", description: "A minimal product shot focusing on strand alignment and thickness. Perfect for catalog clarity. Highlights true-to-tone color and texture. Reflects craftsmanship and durability in every fiber." },
  { id: 24, src: "Sample Images/image_24.png", category: "hair", name: "Natural Drop Extension", description: "Captures extensions from root to tip, showing flow consistency. The perfect reference for color and fiber quality. Designed to emphasize shine retention and fall pattern. A standard for luxury straight hair products." },
  { id: 25, src: "Sample Images/image_25.png", category: "hair", name: "Soft Shine Beauty Look", description: "A half-portrait displaying smooth, healthy texture. Ideal for promoting conditioning or leave-in products. Emphasizes light reflection and surface smoothness. Represents everyday elegance and effortless glow." },
  { id: 26, src: "Sample Images/image_26.png", category: "hair", name: "Relaxed Casual Waves", description: "Showcases soft, touchable curls ideal for natural looks. The airy finish adds comfort and freedom. Great for lifestyle campaigns or organic branding. Radiates youthfulness and easy confidence." },
  { id: 27, src: "Sample Images/image_27.png", category: "hair", name: "Radiant Smiles Collection", description: "Friendly and inviting visuals with focus on hair shine. Perfect for brand identity banners and social posts. Highlights approachability while maintaining elegance. A celebration of healthy, styled hair." },
  { id: 28, src: "Sample Images/image_28.png", category: "hair", name: "Natural Confidence Pose", description: "Mid-length wavy extensions complementing effortless fashion. Captures strength and charm through simplicity. Great for homepage visuals or influencer campaigns. Symbolizes modern self-expression." },
  { id: 29, src: "Sample Images/image_29.png", category: "hair", name: "Trendy Top Bun Elegance", description: "A high bun style enhanced by thick, glossy strands. Ideal for bridal or editorial styling references. Combines volume, texture, and refinement. A clean, elevated look with professional appeal." },
  { id: 30, src: "Sample Images/image_30.png", category: "hair", name: "Gentle Smile Shot", description: "Captures warmth and grace with subtle hair movement. Great for social branding or lifestyle photography. Reflects softness, health, and authenticity. Suits a welcoming brand tone." },
  { id: 31, src: "Sample Images/image_31.png", hoverSrc: "Sample Images/image_12.png", category: "hair", name: "Twisted Bun Radiance", description: "A contemporary updo design highlighting density and hold. Perfect for stylist portfolios or accessory demos. Demonstrates volume balance and sleek finishing. Blends tradition with modern sophistication." },
  { id: 32, src: "Sample Images/image_32.png", category: "hair", name: "Crown Bun Definition", description: "Emphasizes neatness and styling precision. Ideal for campaigns highlighting hold sprays or pins. Highlights even texture and color harmony. Represents clean, confident aesthetics." },
  { id: 33, src: "Sample Images/image_33.png", category: "hair", name: "Bridal Dressing Scene", description: "A behind-the-scenes view capturing preparation elegance. Represents salon experience and luxury atmosphere. Ideal for promotional storytelling visuals. Evokes trust and attention to detail." },
  { id: 34, src: "Sample Images/image_34.png", category: "hair", name: "Runway Ready Look", description: "A long, full extension flow perfect for fashion campaigns. Highlights seamless blending and natural grace. Reflects runway confidence and creative freedom. A model look for premium marketing visuals." },
  { id: 35, src: "Sample Images/image_35.png", category: "hair", name: "Studio Hair Session", description: "A stylist in action creating flowing volume. Perfect for training material or promotional banners. Illustrates the transformation process with extensions. Symbolizes professionalism and artistry." },
  { id: 36, src: "Sample Images/image_36.png", category: "hair", name: "Bridal Moment Capture", description: "Showcases a bride preparing her final look. Represents purity, grace, and beauty ritual. Ideal for luxury wedding or salon branding. Radiates calm elegance and timeless appeal." },
  { id: 37, src: "Sample Images/image_37.png", category: "hair", name: "Long Glamour Curls", description: "Features thick, cascading waves full of texture. Perfect for demonstrating extension shine retention. Elegant choice for luxury or influencer campaigns. Defines red-carpet-ready perfection." },
  { id: 38, src: "Sample Images/image_38.png", category: "hair", name: "Double Style Display", description: "Two models with complementary hairstyles side by side. Highlights diversity in styling options. Great for social proof or product variety visuals. Embodies brand inclusivity and modern aesthetics." },
  { id: 39, src: "Sample Images/image_39.png", category: "hair", name: "Minimal Straight Classic", description: "A simple portrait emphasizing sleek, straight perfection. Ideal for core product representation. Reflects precision cutting and strand alignment. Perfect hero shot for clean design layouts." },
  { id: 40, src: "Sample Images/image_40.png", category: "hair", name: "Duo Confidence Portrait", description: "Dynamic pair shot symbolizing friendship and style unity. Perfect for marketing team collections or model series. Highlights shine, strength, and confidence. A fun yet elegant lifestyle capture.." },
  { id: 41, src: "Sample Images/image_41.png", hoverSrc: "Sample Images/image_12.png", category: "hair", name: "Healthy Growth Showcase", description: "A visual emphasizing long, strong strands in motion. Symbolizes nourishment and proper care. Great for promoting serum or oil products. Evokes confidence through natural beauty." },
  { id: 42, src: "Sample Images/image_42.png", category: "hair", name: "Textured Dual Display", description: "Two styles side by side—perfect for before-after comparisons. Highlights texture improvement and manageability. Ideal for tutorial or transformation visuals. Represents brand authenticity and trust." },
  { id: 43, src: "Sample Images/image_43.png", category: "hair", name: "Twin Glow Portrait", description: "Two models presenting glossy, voluminous waves. Demonstrates hair harmony and color consistency. Ideal for banners promoting multi-tone extensions. Exudes luxury and partnership." },
  { id: 44, src: "Sample Images/image_44.png", category: "hair", name: "Radiant White Studio Look", description: "Clean, bright portrait showing smooth, even flow. Works beautifully for hero section banners. Highlights subtle layering and healthy texture. A minimal, premium aesthetic." },
  { id: 45, src: "Sample Images/image_45.png", category: "hair", name: "Group Styling Celebration", description: "Joyful trio celebrating volume and style diversity. Embodies empowerment and self-expression. Ideal for lifestyle branding and ad visuals. Radiates positivity and beauty connection.." },
  { id: 46, src: "Sample Images/image_46.png", category: "hair", name: "Confident Evening Look", description: "A duo capture showcasing defined curls and shine. Perfect for premium catalog usage. Represents confidence, celebration, and beauty detail. Pairs sophistication with modern vibrance." },
  { id: 47, src: "Sample Images/image_47.png", category: "hair", name: "Deep Wave Bundle", description: "Rounded card concept with soft shadows." },
  { id: 48, src: "Sample Images/image_48.png", category: "hair", name: "Silky Straight Bundle", description: "Compact extension roll with exceptional smoothness. Highlights quality stitching and strand alignment. Designed for seamless application and long wear. Defines classic straight luxury." },
  { id: 49, src: "Sample Images/image_49.png", category: "hair", name: "Layered Ombre Weft", description: "Soft gradient tones blend beautifully from root to tip. Ideal for clients seeking warmth without dye. Demonstrates craftsmanship in color transitions. Adds visual richness to any collection." },
  { id: 50, src: "Sample Images/image_50.png", category: "hair", name: "Premium Mannequin Display", description: "A professional mannequin featuring styled extension application. Perfect for training or salon demos. Highlights realism and easy handling. Reflects professional presentation quality." },
  { id: 51, src: "Sample Images/image_51.png", hoverSrc: "Sample Images/image_12.png", category: "hair", name: "Twin Harmony Look", description: "Two models showcasing matching glossy hairstyles. Represents friendship and balanced styling outcomes. Great for promotional collages or testimonial visuals. Embodies unity in beauty." },
  { id: 52, src: "Sample Images/image_52.png", category: "hair", name: "Texture Comparison Panel", description: "Side-by-side model view to highlight before-after volume. Perfect for tutorial or advertisement use. Illustrates texture uniformity and shine difference. Demonstrates brand transparency." },
  { id: 53, src: "Sample Images/image_53.png", category: "hair", name: "Back Bun Silhouette", description: "Rear-view display emphasizing bun symmetry and form. Ideal for showcasing hold products or updo results. Clean, balanced, and professional. Fits educational or editorial contexts." },
  { id: 54, src: "Sample Images/image_54.png", category: "hair", name: "Fashion Pair Shot", description: "Stylish duo exuding confidence and modern femininity. Works great for homepage visuals or product banners. Highlights natural waves and color unity. Reflects fashion-forward energy." },
  { id: 55, src: "Sample Images/image_55.png", category: "hair", name: "Side Profile Perfection", description: "Dual side-view imagery focusing on smooth blending. Ideal for promoting extension integration quality. Highlights realistic fall and texture consistency. Perfect for salon presentation materials." },
  { id: 56, src: "Sample Images/image_56.png", category: "hair", name: "Studio Curl Study", description: "Professional close-up showcasing curl pattern integrity. Ideal for texture-specific campaigns. Captures shine, resilience, and definition. Suits product detail sections beautifully." },
  { id: 61, src: "Sample Images/image_61.png", category: "hair", name: " Silky Rear Texture Focus", description: "Back-view close-up capturing flow and alignment. Great for extension texture marketing. Shows consistency from root to tip. A subtle yet powerful detail image." },
  { id: 62, src: "Sample Images/image_62.png", category: "hair", name: "Outdoor Natural Light Shot", description: "Golden sunlight enhances hair’s true tone. Ideal for social campaigns and banner backgrounds. Highlights color accuracy and real-world shine. A beautiful symbol of effortless glamor." },
  { id: 63, src: "Sample Images/image_63.png", category: "hair", name: "Crown Volume Display", description: "Top-angle view showing fullness and rich texture. Highlights styling quality and density balance. Perfect for salon catalogs and ad campaigns. Defines premium craftsmanship and beauty confidence." },
  { id: 60, src: "Sample Images/image_60.png", category: "hair", name: "Indoor Style Showcase", description: "Soft, ambient lighting enhances natural tone depth. Perfect for product context photography. Demonstrates flexibility under varied lighting. Elegant and aspirational." }
];

const Gallery = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1); // -1 closed

  const categories = useMemo(() => ["all", ...Array.from(new Set(imagesData.map(i => i.category)))], []);
  const filtered = categoryFilter === "all" ? imagesData : imagesData.filter((i) => i.category === categoryFilter);
  const sortedImages = useMemo(() => [...filtered].sort((a, b) => (sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))), [filtered, sortOrder]);

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(-1);
  const prev = () => setLightboxIndex((i) => (i - 1 + sortedImages.length) % sortedImages.length);
  const next = () => setLightboxIndex((i) => (i + 1) % sortedImages.length);

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIndex < 0) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, sortedImages.length]);

  return (
    <div>
      <section className={styles.heroHead}>
        <div className={styles.heroInner}>
          <h1>Beauty Gallery</h1>
          <p>Explore our editorials, salon looks, and premium hair inspirations</p>
        </div>
      </section>

      <div className={styles.container}>
        {/* controls */}
        <div className={styles.controlsPremium}>
          <div className={styles.chips}>
            {categories.map((c) => (
              <button key={c} className={`${styles.chip} ${categoryFilter === c ? styles.chipActive : ""}`} onClick={() => setCategoryFilter(c)}>{c}</button>
            ))}
          </div>
          <button className={styles.sortBtn} onClick={() => setSortOrder((s) => (s === "asc" ? "desc" : "asc"))} aria-label="Toggle sort order">
            {sortOrder === "asc" ? "Sort: A–Z" : "Sort: Z–A"}
          </button>
        </div>

        {/* grid */}
        <div className={styles.gridPremium}>
          {sortedImages.map((img, idx) => (
            <figure key={img.id} className={styles.cardPremium} onClick={() => openLightbox(idx)}>
              <img src={img.src} alt={img.name} loading="lazy" className={styles.cardImg} />
              <figcaption className={styles.cardOverlay}>
                <div className={styles.cardTitle}>{img.name}</div>
                <div className={styles.cardSub}>Tap to view</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* lightbox */}
      <Modal open={lightboxIndex >= 0} onClose={closeLightbox}>
        {lightboxIndex >= 0 && (
          <div className={styles.lightbox}>
            <button className={styles.navBtn} onClick={prev} aria-label="Previous">‹</button>
            <img src={sortedImages[lightboxIndex].src} alt={sortedImages[lightboxIndex].name} className={styles.lightboxImg} />
            <button className={styles.navBtn} onClick={next} aria-label="Next">›</button>
            <div className={styles.lightboxMeta}>
              <div className={styles.lightboxTitle}>{sortedImages[lightboxIndex].name}</div>
              <div className={styles.lightboxDesc}>{sortedImages[lightboxIndex].description}</div>
              <div className={styles.ratingRow}>
                {Array.from({length:5}).map((_,i)=> {
                  const rating = Math.round((sortedImages[lightboxIndex].rating || 4.8));
                  return <Star key={i} size={16} className={i < rating ? styles.starFill : styles.starEmpty} />
                })}
                <span className={styles.ratingText}>{(sortedImages[lightboxIndex].rating || 4.8).toFixed(1)} • {(100 + (sortedImages[lightboxIndex].id||0)*7).toLocaleString()} reviews</span>
              </div>
              <div className={styles.lightboxToolbar}>
                <button className={`${styles.toolBtn}`} onClick={async()=>{
                  const url = sortedImages[lightboxIndex].src;
                  try {
                    if (navigator.share) { await navigator.share({ title: sortedImages[lightboxIndex].name, url }); }
                    else { await navigator.clipboard.writeText(window.location.origin + '/' + url); }
                  } catch(e) {}
                }}><Share2 size={16}/> Share</button>
                <a className={styles.toolBtn} href={sortedImages[lightboxIndex].src} download>
                  <Download size={16}/> Download
                </a>
              </div>
              <div className={styles.lightboxCount}>{lightboxIndex + 1} / {sortedImages.length}</div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Gallery;
