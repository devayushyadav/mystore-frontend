// app/page.tsx

import React from 'react';
import styles from './page.module.css';

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Featured Products</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Product 1 &rarr;</h3>
          <p>This is a great product that you should definitely check out.</p>
        </div>
        <div className={styles.card}>
          <h3>Product 2 &rarr;</h3>
          <p>Another amazing product with great features and benefits.</p>
        </div>
        <div className={styles.card}>
          <h3>Product 3 &rarr;</h3>
          <p>Product 3 is here to make your life easier with its unique features.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
