'use client';

import React from 'react';

import { useConfigStore } from '@/lib/store/useConfigStore';
import { configOptions } from '@/lib/data/configOptions';
import OptionPanel from './OptionPanel';
import styles from './OptionsContainer.module.css';

const panels = [
  { title: 'Product', key: 'products' as const, storeKey: 'selectedProduct', setter: 'setProduct' },
  { title: 'Size', key: 'sizes' as const, storeKey: 'selectedSize', setter: 'setSize' },
  { title: 'Paper / Material', key: 'materials' as const, storeKey: 'selectedMaterial', setter: 'setMaterial' },
  { title: 'Finish', key: 'finishes' as const, storeKey: 'selectedFinish', setter: 'setFinish' },
] as const;

export default function OptionsContainer() {
  const store = useConfigStore();

  return (
    <div className={styles.wrapper} role="group" aria-label="Print configuration">
      {panels.map((panel, idx) => {
        const selectedValue = store[panel.storeKey];
        const selectedMod = configOptions[panel.key].find(o => o.id === selectedValue)?.priceModifier;

        return (
          <React.Fragment key={panel.key}>
            {idx > 0 && <div className={styles.separator} />}
            <OptionPanel
              title={panel.title}
              options={configOptions[panel.key]}
              selectedValue={selectedValue}
              onSelect={(id) => (store[panel.setter] as (id: string) => void)(id)}
              selectedPriceModifier={selectedMod}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
