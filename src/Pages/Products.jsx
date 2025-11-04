import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Products.module.css";

const Products = () => {
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentImages, setCurrentImages] = useState({});

  // Style-based products with multiple images
  const styleProducts = [
    {
      id: 1,
      title: "Silky Straight Brazilian Wig",
      desc: "Premium 100% Brazilian human hair with natural luster and soft texture. Perfect for everyday wear and special occasions.",
      price: 189.99,
      originalPrice: 249.99,
      rating: 4.8,
      reviewCount: 124,
      images: [
        "https://images.unsplash.com/photo-1522338147998-18ce32282a6f?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1598703247932-23278ac987b6?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1605497788044-5a32b0a604aa?w=600&h=600&fit=crop"
      ],
      features: ["100% Human Hair", "Heat Resistant", "Natural Parting", "Silky Texture"],
      badge: "BEST SELLER",
      type: "straight",
      reviews: [
        { reviewer: "Sarah M.", text: "Absolutely love this wig! The quality is amazing and it looks so natural." },
        { reviewer: "Jessica T.", text: "Worth every penny. The hair is so soft and easy to style." },
        { reviewer: "Emily R.", text: "Best wig I've ever purchased. Looks completely natural!" },
        { reviewer: "Lisa K.", text: "The hair quality is exceptional. Will definitely buy again." }
      ]
    },
    {
      id: 2,
      title: "Curly Goddess Lace Front",
      desc: "Beautiful defined curls with transparent lace front for natural hairline. Features 360 stretch cap for perfect fit.",
      price: 219.99,
      originalPrice: 279.99,
      rating: 4.9,
      reviewCount: 89,
      images: [
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559628129-67cf63c5d5e3?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1605497788044-5a32b0a604aa?w=600&h=600&fit=crop"
      ],
      features: ["Lace Front", "Pre-plucked", "360% Stretch", "Defined Curls"],
      badge: "NEW",
      type: "curly",
      reviews: [
        { reviewer: "Maria L.", text: "The curls are perfect and the lace melts beautifully!" },
        { reviewer: "Taylor R.", text: "Most comfortable wig I've ever worn. Highly recommend!" },
        { reviewer: "Amanda S.", text: "The lace front is undetectable. Amazing quality!" }
      ]
    },
    {
      id: 3,
      title: "Wavy Body Wave Wig",
      desc: "Luxurious body wave pattern with medium density for everyday wear. Tangle-free and easy to maintain.",
      price: 159.99,
      originalPrice: 199.99,
      rating: 4.6,
      reviewCount: 67,
      images: [
        "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522338147998-18ce32282a6f?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559628129-67cf63c5d5e3?w=600&h=600&fit=crop"
      ],
      features: ["Medium Density", "Tangle Free", "Shedding Resistant", "Body Wave"],
      badge: "SALE",
      type: "wavy",
      reviews: [
        { reviewer: "Amanda K.", text: "Perfect for daily use. The waves hold up beautifully." },
        { reviewer: "Nicole P.", text: "Great value for the quality. Very natural looking." },
        { reviewer: "Rachel G.", text: "Love the texture and how easy it is to maintain." }
      ]
    },
    {
      id: 4,
      title: "Kinky Straight Bob",
      desc: "Chic bob style with kinky straight texture and baby hair included. Lightweight and comfortable for all-day wear.",
      price: 139.99,
      originalPrice: 179.99,
      rating: 4.7,
      reviewCount: 92,
      images: [
        "https://images.unsplash.com/photo-1596944949408-8f22b5ce0cf3?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522338147998-18ce32282a6f?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1605497788044-5a32b0a604aa?w=600&h=600&fit=crop"
      ],
      features: ["Bob Cut", "Baby Hair", "Lightweight", "Kinky Straight"],
      badge: "TRENDING",
      type: "kinky",
      reviews: [
        { reviewer: "Chloe B.", text: "Love this bob! It's so stylish and easy to maintain." },
        { reviewer: "Rachel G.", text: "The perfect length and the texture is amazing." },
        { reviewer: "Sophia M.", text: "Perfect for everyday wear. Very comfortable." }
      ]
    }
  ];

  // Color-based products with multiple images
  const colorProducts = [
    {
      id: 5,
      title: "Blonde Balayage Lace Front",
      desc: "Stunning blonde balayage on straight hair with HD lace front. Pre-bleached knots for natural look.",
      price: 269.99,
      originalPrice: 329.99,
      rating: 4.8,
      reviewCount: 73,
      images: [
        "https://images.unsplash.com/photo-1605497788044-5a32b0a604aa?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1534528741771-539b5c037d1a?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522338147998-18ce32282a6f?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=600&fit=crop"
      ],
      features: ["Balayage", "HD Lace", "Pre-bleached", "Blonde"],
      badge: "LUXURY",
      type: "blonde",
      reviews: [
        { reviewer: "Ashley P.", text: "The color is even more beautiful in person!" },
        { reviewer: "Kimberly L.", text: "Perfect blend and the lace is undetectable." },
        { reviewer: "Tiffany R.", text: "The balayage is perfectly done. Looks so natural!" }
      ]
    },
    {
      id: 6,
      title: "Brunette Ombre Wig",
      desc: "Natural brunette to caramel ombre with seamless color transition. Perfect for a sophisticated look.",
      price: 199.99,
      originalPrice: 259.99,
      rating: 4.7,
      reviewCount: 88,
      images: [
        "https://images.unsplash.com/photo-1519699047748-4f0c6c5a2e4a?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1534517029666-978a4d1a5f3c?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522338147998-18ce32282a6f?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=600&fit=crop"
      ],
      features: ["Ombre", "Natural Brown", "Color Blend", "Brunette"],
      badge: "POPULAR",
      type: "brunette",
      reviews: [
        { reviewer: "Michelle L.", text: "The color transition is so natural and beautiful!" },
        { reviewer: "Jennifer K.", text: "Perfect for everyday wear. Love the natural look." }
      ]
    },
    {
      id: 7,
      title: "Jet Black Straight Wig",
      desc: "Rich jet black color with silky straight texture and high shine. Classic look that never goes out of style.",
      price: 179.99,
      originalPrice: 229.99,
      rating: 4.6,
      reviewCount: 95,
      images: [
        "https://images.unsplash.com/photo-1545235612-7a3ded345acf?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522338147998-18ce32282a6f?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&h=600&fit=crop"
      ],
      features: ["Jet Black", "High Shine", "Straight", "Classic"],
      badge: "CLASSIC",
      type: "black",
      reviews: [
        { reviewer: "Nicole R.", text: "The black color is so rich and vibrant!" },
        { reviewer: "Amanda T.", text: "Perfect for formal occasions. Looks stunning!" }
      ]
    },
    {
      id: 8,
      title: "Caramel Highlights Wig",
      desc: "Warm caramel highlights on brown base for dimensional look. Adds depth and movement to your style.",
      price: 229.99,
      originalPrice: 289.99,
      rating: 4.8,
      reviewCount: 67,
      images: [
        "https://images.unsplash.com/photo-1534517029666-978a4d1a5f3c?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519699047748-4f0c6c5a2e4a?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522338147998-18ce32282a6f?w=600&h=600&fit=crop",
        "https://images.unsplash.com/photo-1605497788044-5a32b0a604aa?w=600&h=600&fit=crop"
      ],
      features: ["Caramel", "Highlights", "Dimensional", "Warm Tones"],
      badge: "TRENDING",
      type: "caramel",
      reviews: [
        { reviewer: "Samantha P.", text: "The highlights add so much dimension!" },
        { reviewer: "Brittany M.", text: "Perfect color for summer. Love it!" }
      ]
    }
  ];

  const updateQuantity = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change)
    }));
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    setCartItems(prev => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + quantity
    }));
    
    // Show subtle feedback
    const button = document.querySelector(`[data-product="${product.id}"]`);
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Added to Cart!';
      button.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 2000);
    }
    
    // Reset quantity
    setQuantities(prev => ({
      ...prev,
      [product.id]: 1
    }));
  };

  const openReviewsModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeReviewsModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const changeImage = (productId, imageIndex, direction = null) => {
    const product = [...styleProducts, ...colorProducts].find(p => p.id === productId);
    if (!product) return;

    const currentIndex = currentImages[productId] || 0;
    let newIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % product.images.length;
    } else if (direction === 'prev') {
      newIndex = (currentIndex - 1 + product.images.length) % product.images.length;
    } else {
      newIndex = imageIndex;
    }

    setCurrentImages(prev => ({
      ...prev,
      [productId]: newIndex
    }));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={styles.star}
        style={{ 
          color: index < Math.floor(rating) ? '#ffb400' : '#e0e0e0'
        }}
      >
        ★
      </span>
    ));
  };

  // Filter products based on search term
  const filteredStyleProducts = styleProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.features.some(feature => 
      feature.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    product.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredColorProducts = colorProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.features.some(feature => 
      feature.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    product.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  const ProductCard = ({ product }) => {
    const currentImageIndex = currentImages[product.id] || 0;

    return (
      <motion.div
        className={styles.card}
        variants={cardVariants}
        whileHover={{ y: -8 }}
      >
        {product.badge && (
          <div className={styles.badge}>
            {product.badge}
          </div>
        )}
        
        <div className={styles.imageGallery}>
          <motion.img 
            src={product.images[currentImageIndex]} 
            alt={product.title}
            className={styles.mainImage}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          
          {product.images.length > 1 && (
            <>
              <button 
                className={`${styles.imageNav} ${styles.prev}`}
                onClick={() => changeImage(product.id, null, 'prev')}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button 
                className={`${styles.imageNav} ${styles.next}`}
                onClick={() => changeImage(product.id, null, 'next')}
                aria-label="Next image"
              >
                ›
              </button>
              
              <div className={styles.imageThumbnails}>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} view ${index + 1}`}
                    className={`${styles.thumbnail} ${index === currentImageIndex ? styles.active : ''}`}
                    onClick={() => changeImage(product.id, index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className={styles.cardContent}>
          <h3>{product.title}</h3>
          <p>{product.desc}</p>
          
          <div className={styles.features}>
            {product.features.map((feature, index) => (
              <span key={index} className={styles.feature}>
                {feature}
              </span>
            ))}
          </div>
          
          <div className={styles.rating}>
            <div className={styles.stars}>
              {renderStars(product.rating)}
            </div>
            <span className={styles.ratingCount}>
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>
          
          <motion.button 
            className={styles.viewReviewsBtn}
            onClick={() => openReviewsModal(product)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Reviews ({product.reviews.length})
          </motion.button>
          
          <div className={styles.price}>
            ${product.price}
            {product.originalPrice && (
              <span className={styles.originalPrice}>${product.originalPrice}</span>
            )}
          </div>
          
          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <button 
                className={styles.quantityButton}
                onClick={() => updateQuantity(product.id, -1)}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className={styles.quantity}>
                {quantities[product.id] || 1}
              </span>
              <button 
                className={styles.quantityButton}
                onClick={() => updateQuantity(product.id, 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            
            <motion.button 
              className={styles.addToCart}
              onClick={() => addToCart(product)}
              whileTap={{ scale: 0.95 }}
              data-product={product.id}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Luxury Wig Collection
        </motion.h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          Discover premium quality wigs with multiple styling options and natural looks
        </motion.p>
        
        {/* Search Bar */}
        <motion.div 
          className={styles.searchContainer}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        >
          <div className={styles.searchIcon}>🔍</div>
          <input
            type="text"
            placeholder="Search wigs by style, color, or features..."
            className={styles.searchBar}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>
      </div>

      {/* Style-Based Products Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Popular Styles</h2>
          <p className={styles.sectionSubtitle}>Explore our most loved wig styles and textures</p>
          <a href="#all-styles" className={styles.viewAll}>View All Styles</a>
        </div>
        
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredStyleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </motion.section>

      {/* Color-Based Products Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Hair Colors</h2>
          <p className={styles.sectionSubtitle}>Find your perfect shade from our color collection</p>
          <a href="#all-colors" className={styles.viewAll}>View All Colors</a>
        </div>
        
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredColorProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </motion.section>

      {/* Reviews Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProduct && (
          <motion.div 
            className={styles.modalOverlay}
            onClick={closeReviewsModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.modalHeader}>
                <h2>{selectedProduct.title} - Reviews</h2>
                <button 
                  className={styles.closeButton}
                  onClick={closeReviewsModal}
                  aria-label="Close reviews"
                >
                  ×
                </button>
              </div>
              
              <div className={styles.modalRating}>
                <div className={styles.modalStars}>
                  {renderStars(selectedProduct.rating)}
                </div>
                <span className={styles.modalRatingText}>
                  {selectedProduct.rating} out of 5 · {selectedProduct.reviewCount} reviews
                </span>
              </div>
              
              <div className={styles.reviewsList}>
                {selectedProduct.reviews.map((review, index) => (
                  <div key={index} className={styles.modalReview}>
                    <div className={styles.modalReviewHeader}>
                      <span className={styles.modalReviewer}>{review.reviewer}</span>
                      <div className={styles.modalReviewStars}>
                        {renderStars(selectedProduct.rating)}
                      </div>
                    </div>
                    <p className={styles.modalReviewText}>"{review.text}"</p>
                  </div>
                ))}
              </div>
              
              <div className={styles.modalActions}>
                <motion.button 
                  className={styles.continueShopping}
                  onClick={closeReviewsModal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Shopping
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;