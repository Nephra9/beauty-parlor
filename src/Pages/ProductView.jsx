import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChevronLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import styles from './ProductView.module.css';

// Minimal fallback mock in case product is not passed via router state
const fallbackProducts = [
  {
    id: '1',
    title: 'Silky Straight Human Hair Wig',
    price: 249.99,
    category: 'wigs',
    images: [
      'https://picsum.photos/seed/p1-1/1200/900',
      'https://picsum.photos/seed/p1-2/1200/900',
    ],
    rating: 4.8,
    reviews: [
      { user: 'Sarah M.', rating: 5, comment: 'Absolutely love this wig!' }
    ],
    description: 'Premium human hair wig with silky finish. Breathable lace and comfortable cap.'
  }
];

const ProductView = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state || fallbackProducts.find(p => String(p.id) === String(id)) || fallbackProducts[0];

  const [qty, setQty] = useState(1);
  const [mainIndex, setMainIndex] = useState(0);

  const formatPrice = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  const handleAddToCart = () => {
    // simple demo toast - in full app you'd update shared cart state
    toast.success(`${qty} × ${product.title} added to cart (demo)`, { position: 'bottom-right' });
  };

  const handleBuyNow = () => {
    toast.info('Buy Now is a demo — no real payment processed', { position: 'bottom-right' });
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <ChevronLeft size={18} /> Back
      </button>

      <div className={styles.grid}>
        <div className={styles.gallery}>
          <div className={styles.mainImageWrap}>
            <img src={product.images[mainIndex]} alt={product.title} className={styles.mainImage} />
          </div>
          <div className={styles.thumbs}>
            {product.images.map((img, i) => (
              <button key={i} className={`${styles.thumb} ${i === mainIndex ? styles.activeThumb : ''}`} onClick={() => setMainIndex(i)}>
                <img src={img} alt={`thumb-${i}`} />
              </button>
            ))}
          </div>
        </div>

        <aside className={styles.details}>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.price}>{formatPrice(product.price)}</div>
          <div className={styles.rating}>Rating: {product.rating} / 5</div>

          <div className={styles.description}>{product.description}</div>

          <div className={styles.controls}>
            <div className={styles.qtyWrap}>
              <span>Quantity</span>
              <div className={styles.qtyControls}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={14} /></button>
                <div className={styles.qtyValue}>{qty}</div>
                <button onClick={() => setQty(q => q + 1)}><Plus size={14} /></button>
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.addBtn} onClick={handleAddToCart}><ShoppingCart size={16} /> Add to Cart</button>
              <button className={styles.buyBtn} onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>

          <div className={styles.shopInfo}>
            <h3>Shop Details</h3>
            <p><strong>Sold by:</strong> Beauty Bliss</p>
            <p><strong>Shipping:</strong> Standard & express available</p>
            <p><strong>Return Policy:</strong> 14-day returns (conditions apply)</p>
            <p><strong>SKU:</strong> {product.id}</p>
          </div>
        </aside>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductView;
