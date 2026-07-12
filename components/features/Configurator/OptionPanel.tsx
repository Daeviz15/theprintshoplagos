import { Settings } from 'lucide-react';
import OptionItem from './OptionItem';
import { ConfigOption } from '@/lib/data/configOptions';
import styles from './OptionPanel.module.css';

interface OptionPanelProps {
  title: string;
  options: ConfigOption[];
  selectedValue: string;
  onSelect: (id: string) => void;
  selectedPriceModifier?: number;
}

export default function OptionPanel({
  title,
  options,
  selectedValue,
  onSelect,
  selectedPriceModifier,
}: OptionPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        <div className={styles.headerRight}>
          {selectedPriceModifier != null && selectedPriceModifier > 0 && (
            <span className={styles.modifier}>+${selectedPriceModifier}</span>
          )}
          <button className={styles.settingsBtn} aria-label="Settings">
            <Settings />
          </button>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.items}>
        {options.map((opt) => (
          <OptionItem
            key={opt.id}
            option={opt}
            isSelected={selectedValue === opt.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
