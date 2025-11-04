import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Minus,
  Scissors,
  Crown,
  Gift,
  Droplet,
  Brush,
  Eye,
  Wrench,
  ShoppingBag
} from 'lucide-react';
import styles from './Products.module.css';

// Generate mock products: at least 10 per category
const mkImage = (catId, idx) => `https://picsum.photos/seed/${catId}-${idx}/900/700`;

const generateProducts = () => {
  const out = [];
  let id = 100; // start ids at 100 to avoid clashes
  const templates = {
    wigs: ['Silky Straight', 'Curly Goddess', 'Lace Front', 'Glam Wave', 'Natural Bob', 'Deep Wave', 'Yaki Straight', 'Mermaid Curls', 'Goddess Bun', 'Vintage Roll'],
    'hair-bundles': ['Brazilian Body Wave', 'Peruvian Loose Wave', 'Malaysian Straight', 'Indian Remy', 'Raw Virgin', 'Bundles Set A', 'Bundles Set B', 'Silky Bundles', 'Natural Wave', 'Full Head Pack'],
    'braiding-hair': ['Kanekalon Jumbo', 'Pre-Stretched Braid', 'Senegalese Twist', 'Box Braid Pack', 'Marley Hair', 'Passion Twist', 'Havana Mambo', 'Braiding Set', 'Butterfly Locs', 'Crochet Pack'],
    'perfume-beauty': ['Elegance Eau', 'Floral Mist', 'Night Bloom', 'Citrus Burst', 'Vanilla Lace', 'Rosewood', 'Amber Glow', 'Ocean Breeze', 'Velvet Musk', 'Signature Scent'],
    extensions: ['Clip-in 16"', 'Clip-in 18"', 'Clip-in 20"', 'Tape-in 18"', 'Tape-in 20"', 'Weft Extensions', 'Halo Extensions', 'Skin Weft', 'Keratin Tip', 'U-Tip Pack'],
    'hair-care': ['Argan Oil Treatment', 'Sulfate-Free Shampoo', 'Nourish Conditioner', 'Repair Mask', 'Heat Protect Spray', 'Scalp Serum', 'Detangling Spray', 'Leave-in Cream', 'Growth Oil', 'Protein Treatment'],
    'beauty-accessories': ['Brush Set', 'Blending Sponge', 'Makeup Mirror', 'Travel Kit', 'Brush Cleaner', 'Brush Roll', 'Compact Case', 'Beauty Blender Pack', 'Eyelash Curler', 'Organizer'],
    'beauty-tools': ['Professional Dryer', 'Flat Iron 1"', 'Ceramic Curler', 'Styling Brush', 'Heat Brush', 'Volumizer', 'Steamer', 'Trimmer', 'Styling Kit', 'Diffuser'],
    'lash-kits': ['Luxury Lash Kit A', 'Natural Lash Set', 'Volume Lash Kit', 'Deluxe Lash Pro', 'Starter Lash Set', 'Mega Volume', 'Lash Adhesive Kit', 'Reusables Pack', 'Mini Lash Kit', 'Glamour Lashes'],
    'sales-deals': ['Summer Bundle', 'Holiday Pack', 'Starter Bundle', 'Pro Bundle', 'Clearance Lot', 'Flash Deal', 'Buy More Save', 'Combo Pack', 'Limited Deal', 'Seasonal Box']
  };

  Object.keys(templates).forEach(cat => {
    const names = templates[cat];
    for (let i = 0; i < names.length; i++) {
      const title = `${names[i]} ${cat.includes('hair') || cat === 'wigs' ? '' : ''}`.trim();
      out.push({
        id: id++,
        title,
        price: +(Math.random() * (300 - 20) + 20).toFixed(2),
        category: cat,
        images: [mkImage(cat, i*3+1), mkImage(cat, i*3+2), mkImage(cat, i*3+3)],
        rating: +( (Math.random() * (5 - 4) + 4).toFixed(1) ),
        reviews: []
      });
    }
  });

  return out;
};

const mockProducts = generateProducts();

const categories = [
  { id: 'all', name: 'All Products', icon: ShoppingBag, quote: "Discover Your Perfect Beauty Match" },
  { id: 'wigs', name: 'Wigs', icon: Scissors, quote: "Transform Your Look Instantly" },
  { id: 'hair-bundles', name: 'Hair Bundles', icon: Crown, quote: "Luxury That Flows Naturally" },
  { id: 'braiding-hair', name: 'Braiding Hair', icon: Scissors, quote: "Create Masterpieces With Every Braid" },
  { id: 'perfume-beauty', name: 'Perfume & Beauty', icon: Droplet, quote: "Scents That Speak Volumes" },
  { id: 'extensions', name: 'Extensions', icon: Gift, quote: "Instant Length, Timeless Beauty" },
  { id: 'hair-care', name: 'Hair Care', icon: Brush, quote: "Nourish Your Crown With Care" },
  { id: 'beauty-accessories', name: 'Accessories', icon: Gift, quote: "Details That Define Beauty" },
  { id: 'beauty-tools', name: 'Beauty Tools', icon: Wrench, quote: "Professional Results At Home" },
  { id: 'lash-kits', name: 'Lash Kits', icon: Eye, quote: "Eyes That Captivate Instantly" },
  { id: 'sales-deals', name: 'Sales & Deals', icon: Star, quote: "Luxury Within Reach" }
];

const Products = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bp_cart') || '[]');
    } catch (e) {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let base = mockProducts;
    if (selectedCategory !== 'all') base = base.filter(product => product.category === selectedCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      base = base.filter(p => p.title.toLowerCase().includes(q));
    }
    if (sortOption === 'price-asc') base = base.slice().sort((a,b) => a.price - b.price);
    if (sortOption === 'price-desc') base = base.slice().sort((a,b) => b.price - a.price);
    if (sortOption === 'rating-desc') base = base.slice().sort((a,b) => b.rating - a.rating);
    return base;
  }, [selectedCategory, searchQuery, sortOption]);

  // persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bp_cart', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  const getCategoryQuote = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.quote : "Discover Your Perfect Beauty Match";
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities(prevQuantities => ({ ...prevQuantities, [productId]: newQuantity }));
  };

  // stable handlers to avoid re-renders
  const increaseQuantity = React.useCallback((productId, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  }, []);

  const decreaseQuantity = React.useCallback((productId, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1)
    }));
  }, []);

  const formatPrice = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

  const handleAddToCart = React.useCallback((product, qty = 1) => {
    const quantity = qty || 1;
    setCart(prev => {
      const found = prev.find(i => i.id === product.id);
      let next;
      if (found) {
        next = prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      } else {
        next = [...prev, { id: product.id, title: product.title, price: product.price, quantity }];
      }
      toast.success(`Added ${quantity} × ${product.title} to cart`, { position: 'bottom-right', autoClose: 2500 });
      return next;
    });
    // open cart briefly
    setIsCartOpen(true);
  }, []);

  const handleBuyNow = React.useCallback((product, qty = 1) => {
    // Navigate to product detail view (same as clicking the title)
    try {
      navigate(`/products/${product.id}`, { state: product });
    } catch (e) {
      // fallback: show demo toast
      toast.info(`Buy Now is a demo — ${product.title} was not purchased.`, { position: 'bottom-right', autoClose: 3000 });
    }
  }, [navigate]);

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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < Math.floor(rating) ? styles.filledStar : styles.emptyStar}
        aria-hidden
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
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 1}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onAddToCart={handleAddToCart}
              onViewReviews={handleViewReviews}
              openImageModal={openImageModal}
            />
          ))}
        </div>
      </section>
    );
  };

  const ProductCard = React.memo(function ProductCard({ product, quantity, onIncrease, onDecrease, onAddToCart, onViewReviews, openImageModal }) {
    const [hoverIndex, setHoverIndex] = useState(0);

    return (
      <motion.div
        className={styles.productCard}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.28 }}
        whileHover={{ y: -6 }}
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
                loading="lazy"
                className={`${styles.productImage} ${index === hoverIndex ? styles.activeImage : ''}`}
              />
            ))}
          </div>

          {product.originalPrice && <div className={styles.saleBadge}>SALE</div>}

          <div className={styles.imageNavHint}>
            <span>Click to view gallery</span>
          </div>
        </div>

        <div className={styles.productInfo}>
          <h3 className={styles.productTitle}><Link to={`/products/${product.id}`} state={product} className={styles.productLink}>{product.title}</Link></h3>

          <div className={styles.priceSection}>
            {product.originalPrice ? (
              <>
                <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
              </>
            ) : (
              <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
            )}
          </div>

          <div className={styles.ratingSection}>
            <div className={styles.stars}>{renderStars(product.rating)}</div>
            <span className={styles.ratingValue}>({product.rating})</span>
          </div>

          <div className={styles.quantitySection}>
            <span className={styles.quantityLabel}>Quantity:</span>
            <div className={styles.quantityControls} onClick={(e) => e.stopPropagation()}>
              <button className={styles.quantityButton} onClick={(e) => onDecrease(product.id, e)}>
                <Minus size={14} />
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button className={styles.quantityButton} onClick={(e) => onIncrease(product.id, e)}>
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <motion.button className={styles.addToCartButton} onClick={() => onAddToCart(product, quantity)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <ShoppingCart size={18} />
              Add to Cart
            </motion.button>

            <motion.button className={styles.reviewsButton} onClick={() => onViewReviews(product)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              View Reviews
            </motion.button>
          </div>

          <motion.div style={{marginTop:12}}>
            <motion.button className={`${styles.buyNowButton} ${styles.buyNowFull}`} onClick={() => handleBuyNow(product, quantity)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Buy Now
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    );
  });
  ProductCard.displayName = 'ProductCard';

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
        <div className={styles.topControls}>
          <div className={styles.searchWrap}>
            <input
              className={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className={styles.sortWrap}>
            <select className={styles.sortSelect} value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="">Sort</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating-desc">Top Rated</option>
            </select>
          </div>
        </div>
        <div className={styles.categoryScroll}>
          {categories.map((category) => {
            const Icon = category.icon;
            // find first product image for this category as preview
            const preview = mockProducts.find(p => p.category === category.id)?.images?.[0] || '';
            return (
              <motion.button
                key={category.id}
                className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.activeCategory : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={styles.categoryFlip}>
                  <div className={styles.categoryFlipInner}>
                    <div className={styles.categoryFlipFront}>
                      <Icon size={20} />
                    </div>
                    <div className={styles.categoryFlipBack}>
                      {preview ? (
                        <img src={preview} alt={`${category.name} preview`} className={styles.categoryFlipImage} />
                      ) : (
                        <Icon size={20} />
                      )}
                      <div className={styles.categoryOverlay}>{category.name}</div>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
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
                    Add to Cart - {formatPrice(selectedProduct.price)}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />

      {/* Floating Cart Button & Cart Modal */}
      <div className={styles.floatingCartWrap}>
        <button className={styles.floatingCartButton} onClick={() => setIsCartOpen(true)} aria-label="Open cart">
          <ShoppingCart size={20} />
          <span className={styles.cartCount}>{cart.reduce((s,i) => s + i.quantity, 0)}</span>
        </button>
      </div>

      {isCartOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsCartOpen(false)}>
          <div className={styles.cartModal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setIsCartOpen(false)}><X size={20} /></button>
            <div style={{padding:20}}>
              <h3>Cart</h3>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className={styles.cartList}>
                  {cart.map(item => (
                    <div key={item.id} className={styles.cartItem}>
                      <div>
                        <strong>{item.title}</strong>
                        <div className={styles.cartItemMeta}>{item.quantity} × {formatPrice(item.price)}</div>
                      </div>
                      <div>
                        <strong>{formatPrice(item.price * item.quantity)}</strong>
                      </div>
                    </div>
                  ))}
                  <div className={styles.cartTotal}>
                    <strong>Total:</strong>
                    <strong>{formatPrice(cart.reduce((s,i) => s + i.price * i.quantity, 0))}</strong>
                  </div>
                  <div style={{marginTop:12}}>
                    <button className={styles.addToCartButton} onClick={() => { setCart([]); try { localStorage.removeItem('bp_cart'); } catch (e) {} toast.info('Checkout is a demo — cart cleared.'); setIsCartOpen(false); }}>Proceed to Checkout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;