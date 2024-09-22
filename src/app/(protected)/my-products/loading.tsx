// app/products/loading.tsx
import React from 'react';
import styles from './ProductList.module.css';

const Loading = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product Listing</h1>
      <div className={styles.productList}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div className={styles.productCard} key={index}>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonDetails}>
              <div className={styles.skeletonHeader}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
              <div className={styles.skeletonText}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
