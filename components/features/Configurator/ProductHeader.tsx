'use client';

import { ChevronDown } from 'lucide-react';
import { useConfigStore } from '@/lib/store/useConfigStore';
import { configOptions } from '@/lib/data/configOptions';
import styles from './ProductHeader.module.css';

export default function ProductHeader() {
  const { selectedProduct, getTotalPrice } = useConfigStore();
  const product = configOptions.products.find(p => p.id === selectedProduct);
  const price = getTotalPrice();

  return (
    <div className={styles.meta}>
      {/* Left: title */}
      <div className={styles.titleBlock}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Fine Art Giclée</h1>
          <button className={styles.chevronBtn} aria-label="Change product">
            <ChevronDown size={14} />
          </button>
        </div>
        <p className={styles.subtitle}>{product?.name} · Personal Edition</p>
      </div>

      {/* Right: price */}
      <div className={styles.priceBlock}>
        <p className={styles.price}>
          <span className={styles.currency}>$</span>
          {price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className={styles.priceNote}>+ shipping & handling</p>
      </div>
    </div>
  );
}
