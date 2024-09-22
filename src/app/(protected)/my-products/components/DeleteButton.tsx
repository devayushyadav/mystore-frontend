'use client';
import React from 'react';
import styles from '../ProductList.module.css';

// Define prop types using TypeScript
interface DeleteProps {
  productId: string; // Ensure productId is a string type
}

const Delete: React.FC<DeleteProps> = ({ productId }) => {
  const handleDelete = (id: string) => {
    // Placeholder function for deleting a product
    console.log(`Delete product with id: ${id}`);
  };

  return (
    <button onClick={() => handleDelete(productId)} className={styles.iconButton}>
      {/* Delete Icon */}
      <svg className={styles.icon} viewBox="0 0 24 24">
        <path d="M16 9v10H8V9h8m-1.5-6H9.5l-1 1H5v2h14V4h-3.5l-1-1z" />
      </svg>
    </button>
  );
};

export default Delete
