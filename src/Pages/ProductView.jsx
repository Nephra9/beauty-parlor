import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images,
    sku: product.id,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock"
    }
  }), [product]);

  const [qty, setQty] = useState(1);
  const [color, setColor] = useState('Rose');
  const [length, setLength] = useState('Medium');
  const [mainIndex, setMainIndex] = useState(0);

  const formatPrice = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  const handleAddToCart = () => {
    // simple demo toast - in full app you'd update shared cart state
    toast.success(`${qty} × ${product.title} added to cart (demo)`, { position: 'bottom-right' });
  };

  const handleBuyNow = () => {
    toast.info('Buy Now is a demo — no real payment processed', { position: 'bottom-right' });
  };

  // keyboard navigation for gallery
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setMainIndex((i) => (i + 1) % product.images.length);
      if (e.key === 'ArrowLeft') setMainIndex((i) => (i - 1 + product.images.length) % product.images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product.images.length]);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>{product.title} – Beauty Bliss</title>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 6, color: 'var(--text-muted)' }}>
          <li><a href="/">Home</a></li>
          <li>/</li>
          <li><a href="/products">Products</a></li>
          <li>/</li>
          <li aria-current="page" style={{ color: 'var(--text-primary)' }}>{product.title}</li>
        </ol>
      </nav>
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
            <div style={{display:'grid', gap:8}}>
              <div style={{fontWeight:700}}>Color</div>
              <div style={{display:'flex', gap:8}}>
                {['Rose','Ebony','Honey','Chestnut'].map(c => (
                  <button key={c} onClick={()=>setColor(c)} className={`bb-btn bb-btn--ghost bb-btn--md`} style={{borderColor: color===c? 'var(--color-pink-primary)':'', background: color===c? 'var(--color-pink-soft)':''}}>{c}</button>
                ))}
              </div>
              <div style={{fontWeight:700, marginTop:6}}>Length</div>
              <div style={{display:'flex', gap:8}}>
                {['Short','Medium','Long'].map(l => (
                  <button key={l} onClick={()=>setLength(l)} className={`bb-btn bb-btn--ghost bb-btn--md`} style={{borderColor: length===l? 'var(--color-pink-primary)':'', background: length===l? 'var(--color-pink-soft)':''}}>{l}</button>
                ))}
              </div>
            </div>
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

      {/* Upsell carousel */}
      <div style={{marginTop:24}}>
        <h3>Complete the look</h3>
        <div style={{display:'flex', gap:12, overflowX:'auto', paddingBottom:4}}>
          {["/src/assets/w1.avif","/src/assets/w2.webp","/src/assets/w3.webp","/src/assets/w4.webp"].map((src,idx)=> (
            <div key={idx} style={{minWidth:160, background:'var(--bg-elevated)', border:'1px solid color-mix(in oklab, var(--text-muted) 18%, transparent)', borderRadius:12, padding:8}}>
              <img src={src} alt="" width={160} height={120} style={{objectFit:'cover', borderRadius:8}} />
              <div style={{fontWeight:700, marginTop:6, fontSize:14}}>Style #{idx+1}</div>
              <div style={{color:'var(--text-muted)', fontSize:12}}>Pairs beautifully</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky bar (mobile) */}
      <div className={styles.stickyBar}>
        <div className={styles.stickyPrice}>{formatPrice(product.price)}</div>
        <div className={styles.stickyActions}>
          <button className={styles.stickyBtn} onClick={handleAddToCart}>Add</button>
          <button className={`${styles.stickyBtn} ${styles.stickyBtnPrimary}`} onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductView;
