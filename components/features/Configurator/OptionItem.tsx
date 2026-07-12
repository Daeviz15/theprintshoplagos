import { Check } from 'lucide-react';
import { ConfigOption } from '@/lib/data/configOptions';
import styles from './OptionItem.module.css';

interface OptionItemProps {
  option: ConfigOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function OptionItem({ option, isSelected, onSelect }: OptionItemProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      className={`${styles.item} ${isSelected ? styles.selected : ''}`}
      onClick={() => onSelect(option.id)}
    >
      <div className={styles.thumb}>
        <Check className={styles.checkmark} />
      </div>
      <span className={styles.label}>{option.name}</span>
      {option.priceModifier > 0 && (
        <span className={styles.price}>+${option.priceModifier}</span>
      )}
    </button>
  );
}
