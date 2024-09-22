// app/products/loading.tsx
import React from 'react';
import styles from './page.module.css';

// Skeleton Component
const SkeletonCard: React.FC = () => (
  <div className={styles.card}>
    <div className={styles.skeletonImageContainer}></div>
    <div className={styles.skeletonHeader} />
    <div className={styles.skeletonText} />
    <div className={styles.skeletonText} />
  </div>
);

const Loading: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Featured Products</h1>
      <div className={styles.grid}>
        {/* Render multiple skeleton cards as placeholders */}
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export default Loading;
