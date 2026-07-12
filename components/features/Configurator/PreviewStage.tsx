import Image from 'next/image';
import { Upload, ScanSearch, Share2, Info } from 'lucide-react';
import styles from './PreviewStage.module.css';

const actions = [
  { Icon: Upload,     label: 'Upload Artwork' },
  { Icon: ScanSearch, label: 'Preview in Room' },
  { Icon: Share2,     label: 'Share' },
  { Icon: Info,       label: 'Info' },
];

export default function PreviewStage() {
  return (
    <div className={styles.artwork}>
      {/* Left action bar */}
      <div className={styles.actionBar}>
        {actions.map(({ Icon, label }) => (
          <button key={label} className={styles.actionBtn} title={label} aria-label={label}>
            <Icon />
          </button>
        ))}
      </div>

      {/* Gallery frame */}
      <div className={styles.frame}>
        <div className={styles.matting}>
          <div className={styles.imageWrapper}>
            <Image
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=900&auto=format&fit=crop"
              alt="Fine Art Preview – Placeholder"
              fill
              className={styles.image}
              priority
              sizes="(max-width:768px) 180px, 320px"
            />
          </div>
        </div>
      </div>

      {/* Shadow beneath frame */}
      <div className={styles.shadow} />
    </div>
  );
}
