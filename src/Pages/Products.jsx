import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  ShoppingCart, 
  Star, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';
import styles from './products.module.css';

// Updated product images with real URLs
const mockProducts = [
  // Wigs
  {
    id: 1,
    title: "Silky Straight Human Hair Wig",
    price: 249.99,
    category: "wigs",
    images: [
      "https://unsplash.com/photos/3-bN6yxk1Y8",
      "https://unsplash.com/photos/hair-wig-product-flat-lay-1",
      "https://unsplash.com/photos/vetchCBD-hair-product-example",
      "https://unsplash.com/photos/2czK-hair-extensions"
    ],
    rating: 4.8,
    reviews: [
      { user: "Sarah M.", rating: 5, comment: "Absolutely love this wig! So natural and comfortable." },
      { user: "Jessica T.", rating: 4, comment: "Great quality, slight shedding but overall amazing." }
    ]
  },
  {
    id: 2,
    title: "Curly Goddess Lace Front Wig",
    price: 289.99,
    category: "wigs",
    images: [
      "https://unsplash.com/photos/hair-extensions-multiple-colors",
      "https://unsplash.com/photos/2czK-hair-extensions",
      "https://unsplash.com/photos/3-bN6yxk1Y8",
      "https://pexels.com/photo/hair-bundles-collection-flat-lay-38912/"
    ],
    rating: 4.7,
    reviews: [
      { user: "Emily R.", rating: 5, comment: "This wig is stunning!" },
      { user: "Megan L.", rating: 4, comment: "Very pretty, but a bit heavy." }
    ]
  },

  // Hair Bundles
  {
    id: 3,
    title: "Brazilian Body Wave Bundles",
    price: 189.99,
    category: "hair-bundles",
    images: [
      "https://pexels.com/photo/hair-bundles-collection-flat-lay-38912/",
      "https://unsplash.com/photos/hair-extensions-multiple-colors",
      "https://unsplash.com/photos/2czK-hair-extensions",
      "https://unsplash.com/photos/hair-wig-product-flat-lay-1"
    ],
    rating: 4.6,
    reviews: [
      { user: "Maria K.", rating: 5, comment: "Best hair I've ever purchased!" }
    ]
  },

  // Braiding Hair
  {
    id: 4,
    title: "Kanekalon Braiding Hair",
    price: 24.99,
    category: "braiding-hair",
    images: [
      "https://pexels.com/photo/extension-clips-hair-set-flat-lay-76453/",
      "https://unsplash.com/photos/hair-extensions-multiple-colors",
      "https://pexels.com/photo/hair-bundles-collection-flat-lay-38912/",
      "https://unsplash.com/photos/2czK-hair-extensions"
    ],
    rating: 4.4,
    reviews: []
  },

  // Perfume & Beauty
  {
    id: 5,
    title: "Elegance Eau de Parfum",
    price: 89.99,
    category: "perfume-beauty",
    images: [
      "https://pexels.com/photo/perfume-bottle-pink-background-81746/",
      "https://pexels.com/photo/beauty-products-flat-lay-wood-table-12345/",
      "https://pexels.com/photo/skincare-serum-flat-lay-rose-leaves-54321/",
      "https://pexels.com/photo/beauty-scrub-and-lotion-set-pink-theme-65234/"
    ],
    rating: 4.9,
    reviews: [
      { user: "Emily R.", rating: 5, comment: "The scent lasts all day! So elegant." }
    ]
  },

  // Extensions
  {
    id: 6,
    title: "Clip-in Hair Extensions",
    price: 129.99,
    category: "extensions",
    images: [
      "https://pexels.com/photo/extension-clips-hair-set-flat-lay-76453/",
      "https://unsplash.com/photos/2czK-hair-extensions",
      "https://unsplash.com/photos/hair-extensions-multiple-colors",
      "https://pexels.com/photo/hair-bundles-collection-flat-lay-38912/"
    ],
    rating: 4.7,
    reviews: []
  },

  // Hair Care
  {
    id: 7,
    title: "Argan Oil Hair Treatment",
    price: 34.99,
    category: "hair-care",
    images: [
      "https://pexels.com/photo/hair-care-oil-bottle-on-table-45678/",
      "https://unsplash.com/photos/hair-product-display-1",
      "https://pexels.com/photo/beauty-products-flat-lay-wood-table-12345/",
      "https://pexels.com/photo/skincare-serum-flat-lay-rose-leaves-54321/"
    ],
    rating: 4.5,
    reviews: []
  },

  // Beauty Accessories
  {
    id: 8,
    title: "Premium Makeup Brush Set",
    price: 49.99,
    category: "beauty-accessories",
    images: [
      "https://pexels.com/photo/beauty-accessories-flat-lay-92134/",
      "https://unsplash.com/photos/beauty-accessory-jewelry-flat-lay",
      "https://pexels.com/photo/pink-lipstick-blush-set-white-background-67890/",
      "https://pexels.com/photo/beauty-scrub-and-lotion-set-pink-theme-65234/"
    ],
    rating: 4.3,
    reviews: []
  },

  // Beauty Tools
  {
    id: 9,
    title: "Professional Hair Dryer",
    price: 79.99,
    category: "beauty-tools",
    images: [
      "https://unsplash.com/photos/beauty-tools-display-on-white-background",
      "https://pexels.com/photo/hair-dryer-product-white-background-10987/",
      "https://pexels.com/photo/beauty-accessories-flat-lay-92134/",
      "https://pexels.com/photo/beauty-products-flat-lay-wood-table-12345/"
    ],
    rating: 4.6,
    reviews: []
  },

  // Lash Kits
  {
    id: 10,
    title: "Luxury Lash Kit",
    price: 29.99,
    category: "lash-kits",
    images: [
      "https://pexels.com/photo/lash-kit-flat-lay-pink-theme-23456/",
      "https://pexels.com/photo/pink-lipstick-blush-set-white-background-67890/",
      "https://pexels.com/photo/beauty-products-flat-lay-wood-table-12345/",
      "https://pexels.com/photo/beauty-accessories-flat-lay-92134/"
    ],
    rating: 4.8,
    reviews: []
  },

  // Sales & Deals
  {
    id: 11,
    title: "Summer Sale Bundle",
    price: 199.99,
    originalPrice: 299.99,
    category: "sales-deals",
    images: [
      "https://unsplash.com/photos/sales-deal-beauty-product-promo",
      "https://pexels.com/photo/beauty-products-flat-lay-wood-table-12345/",
      "https://pexels.com/photo/pink-lipstick-blush-set-white-background-67890/",
      "https://pexels.com/photo/beauty-scrub-and-lotion-set-pink-theme-65234/"
    ],
    rating: 4.9,
    reviews: []
  }
];

const categories = [
  { id: 'all', name: 'All Products', icon: '🛍️', quote: "Discover Your Perfect Beauty Match" },
  { id: 'wigs', name: 'Wigs', icon: '💇', quote: "Transform Your Look Instantly" },
  { id: 'hair-bundles', name: 'Hair Bundles', icon: '👑', quote: "Luxury That Flows Naturally" },
  { id: 'braiding-hair', name: 'Braiding Hair', icon: '🎀', quote: "Create Masterpieces With Every Braid" },
  { id: 'perfume-beauty', name: 'Perfume & Beauty', icon: '🌸', quote: "Scents That Speak Volumes" },
  { id: 'extensions', name: 'Extensions', icon: '💫', quote: "Instant Length, Timeless Beauty" },
  { id: 'hair-care', name: 'Hair Care', icon: '🧴', quote: "Nourish Your Crown With Care" },
  { id: 'beauty-accessories', name: 'Accessories', icon: '💄', quote: "Details That Define Beauty" },
  { id: 'beauty-tools', name: 'Beauty Tools', icon: '✨', quote: "Professional Results At Home" },
  { id: 'lash-kits', name: 'Lash Kits', icon: '👁️', quote: "Eyes That Captivate Instantly" },
  { id: 'sales-deals', name: 'Sales & Deals', icon: '🔥', quote: "Luxury Within Reach" }
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [quantities, setQuantities] = useState({});

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return mockProducts;
    return mockProducts.filter(product => product.category === selectedCategory);
  }, [selectedCategory]);

  const getCategoryQuote = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.quote : "Discover Your Perfect Beauty Match";
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities(prevQuantities => ({ ...prevQuantities, [productId]: newQuantity }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    toast.success(`Added ${quantity} ${product.title} to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleViewReviews = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsImageModalOpen(false);
    setCurrentImageIndex(0);
  };

  const openImageModal = (product, index = 0) => {
    setSelectedProduct(product);
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  };

  const nextImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  const increaseQuantity = (productId, e) => {
    e.stopPropagation();
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  const decreaseQuantity = (productId, e) => {
    e.stopPropagation();
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1)
    }));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.floor(rating) ? styles.filledStar : styles.emptyStar}
        fill={index < Math.floor(rating) ? 'currentColor' : 'none'}
      />
    ));
  };

  const CategorySection = ({ categoryId, categoryName, products, quote }) => {
    if (products.length === 0) return null;

    return (
      <section className={styles.categorySection} id={categoryId}>
        <motion.div
          className={styles.categoryHeader}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.categoryTitle}>{categoryName}</h2>
          <p className={styles.categoryQuote}>"{quote}"</p>
        </motion.div>

        <div className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    );
  };

  const ProductCard = ({ product }) => {
    const [hoverIndex, setHoverIndex] = useState(0);

    return (
      <motion.div
        className={styles.productCard}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <div 
          className={styles.imageContainer}
          onMouseEnter={() => setHoverIndex(1)}
          onMouseLeave={() => setHoverIndex(0)}
          onClick={() => openImageModal(product, 0)}
        >
          <div className={styles.imageSlider}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} view ${index + 1}`}
                className={`${styles.productImage} ${
                  index === hoverIndex ? styles.activeImage : ''
                }`}
              />
            ))}
          </div>
          
          {/* Sale Badge */}
          {product.originalPrice && (
            <div className={styles.saleBadge}>SALE</div>
          )}

          {/* Image Navigation Hint */}
          <div className={styles.imageNavHint}>
            <span>Click to view gallery</span>
          </div>
        </div>

        <div className={styles.productInfo}>
          <h3 className={styles.productTitle}>{product.title}</h3>
          
          <div className={styles.priceSection}>
            {product.originalPrice ? (
              <>
                <span className={styles.currentPrice}>
                  ${product.price}
                </span>
                <span className={styles.originalPrice}>
                  ${product.originalPrice}
                </span>
              </>
            ) : (
              <span className={styles.currentPrice}>
                ${product.price}
              </span>
            )}
          </div>

          <div className={styles.ratingSection}>
            <div className={styles.stars}>
              {renderStars(product.rating)}
            </div>
            <span className={styles.ratingValue}>({product.rating})</span>
          </div>

          <div className={styles.quantitySection}>
            <span className={styles.quantityLabel}>Quantity:</span>
            <div className={styles.quantityControls}>
              <button 
                className={styles.quantityButton}
                onClick={(e) => decreaseQuantity(product.id, e)}
              >
                <Minus size={14} />
              </button>
              <span className={styles.quantityValue}>
                {quantities[product.id] || 1}
              </span>
              <button 
                className={styles.quantityButton}
                onClick={(e) => increaseQuantity(product.id, e)}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <motion.button
              className={styles.addToCartButton}
              onClick={() => handleAddToCart(product)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </motion.button>
            
            <motion.button
              className={styles.reviewsButton}
              onClick={() => handleViewReviews(product)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Reviews
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.heroTitle}>Elevate Your Beauty Journey</h1>
          <p className={styles.heroSubtitle}>
            Discover premium beauty products crafted for the modern, sophisticated you. 
            Where luxury meets self-expression.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className={styles.categoryFilterSection}>
        <div className={styles.categoryScroll}>
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`${styles.categoryButton} ${
                selectedCategory === category.id ? styles.activeCategory : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className={styles.categoryIcon}>{category.icon}</span>
              <span className={styles.categoryName}>{category.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* All Products View */}
      {selectedCategory === 'all' && (
        <div className={styles.allCategories}>
          {categories.filter(cat => cat.id !== 'all').map(category => (
            <CategorySection
              key={category.id}
              categoryId={category.id}
              categoryName={category.name}
              products={mockProducts.filter(p => p.category === category.id)}
              quote={category.quote}
            />
          ))}
        </div>
      )}

      {/* Single Category View */}
      {selectedCategory !== 'all' && (
        <CategorySection
          categoryId={selectedCategory}
          categoryName={categories.find(cat => cat.id === selectedCategory)?.name || ''}
          products={filteredProducts}
          quote={getCategoryQuote(selectedCategory)}
        />
      )}

      {/* Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && selectedProduct && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className={styles.imageModalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={closeModal}>
                <X size={24} />
              </button>

              <div className={styles.imageModalBody}>
                <div className={styles.mainImageContainer}>
                  <img
                    src={selectedProduct.images[currentImageIndex]}
                    alt={selectedProduct.title}
                    className={styles.modalMainImage}
                  />
                  
                  <button className={styles.navButtonLeft} onClick={prevImage}>
                    <ChevronLeft size={32} />
                  </button>
                  <button className={styles.navButtonRight} onClick={nextImage}>
                    <ChevronRight size={32} />
                  </button>

                  <div className={styles.imageCounter}>
                    {currentImageIndex + 1} / {selectedProduct.images.length}
                  </div>
                </div>

                <div className={styles.modalThumbnails}>
                  {selectedProduct.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`${styles.modalThumbnail} ${
                        index === currentImageIndex ? styles.activeModalThumbnail : ''
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedProduct && !isImageModalOpen && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.closeButton} onClick={closeModal}>
                <X size={24} />
              </button>

              <div className={styles.modalBody}>
                <div className={styles.modalImages}>
                  <div className={styles.mainImage}>
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.title}
                    />
                  </div>
                </div>

                <div className={styles.modalDetails}>
                  <h2>{selectedProduct.title}</h2>
                  <div className={styles.modalRating}>
                    <div className={styles.stars}>
                      {renderStars(selectedProduct.rating)}
                    </div>
                    <span>Average Rating: {selectedProduct.rating}/5</span>
                  </div>

                  <div className={styles.reviewsSection}>
                    <h3>Customer Reviews</h3>
                    {selectedProduct.reviews.length > 0 ? (
                      selectedProduct.reviews.map((review, index) => (
                        <div key={index} className={styles.reviewItem}>
                          <div className={styles.reviewHeader}>
                            <strong>{review.user}</strong>
                            <div className={styles.stars}>
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <p>{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p>No reviews yet. Be the first to review!</p>
                    )}
                  </div>

                  <div className={styles.modalQuantity}>
                    <span>Quantity:</span>
                    <div className={styles.quantityControls}>
                      <button 
                        className={styles.quantityButton}
                        onClick={(e) => decreaseQuantity(selectedProduct.id, e)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className={styles.quantityValue}>
                        {quantities[selectedProduct.id] || 1}
                      </span>
                      <button 
                        className={styles.quantityButton}
                        onClick={(e) => increaseQuantity(selectedProduct.id, e)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <motion.button
                    className={styles.addToCartButton}
                    onClick={() => handleAddToCart(selectedProduct)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart - ${selectedProduct.price}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
};

export default Products;