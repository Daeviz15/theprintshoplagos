import Navbar from '@/components/layout/Navbar';
import styles from './ConfiguratorLayout.module.css';

interface ConfiguratorLayoutProps {
  stage: React.ReactNode;
  panels: React.ReactNode;
  meta: React.ReactNode;
}

export default function ConfiguratorLayout({ stage, panels, meta }: ConfiguratorLayoutProps) {
  return (
    <section className={styles.hero}>
      <Navbar />

      {/* Central artwork stage */}
      <div className={styles.stage}>
        {stage}
      </div>

      {/* Title + Price overlay at bottom of stage */}
      <div className={styles.meta}>
        {meta}
      </div>

      {/* Horizontally scrollable option panels */}
      <div className={styles.panels}>
        {panels}
      </div>
    </section>
  );
}
