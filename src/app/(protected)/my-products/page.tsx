// app/products/page.tsx (or page.jsx if using JavaScript)
import React from 'react';
import styles from './ProductList.module.css';
import axiosInstance from '@/services/axios';
import { cookies } from 'next/headers';
import { Product } from '@/config/interfaces';

// Define the Product type
interface ProductListProps {
  products: Product[];
  error?: string;
}

const fetchProducts = async (): Promise<ProductListProps> => {
  const cookieStore = cookies(); // Access cookies in the `app` directory
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return {
      products: [],
      error: 'Unauthorized: Please login first',
    };
  }

  try {
    const response = await axiosInstance.get(`/my-products/${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      products: response.data.product,
    };
  } catch (error: any) {
    return {
      products: [],
      error: error.response?.data?.message || 'An error occurred while fetching products',
    };
  }
};

const ProductList: React.FC = async () => {
  const { products, error } = await fetchProducts();

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Product Listing</h1>
      <div className={styles.productList}>
        {products.map((product) => (
          <div className={styles.productCard} key={product.id}>
            <img src={product.image} alt={product.name} className={styles.image} />
            <div className={styles.details}>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.productPrice}>Price: {product.price}</p>
              <p className={styles.productCompany}>Company: {product.company}</p>
              <p className={styles.productCategory}>Category: {product.category}</p>
              <p className={styles.productColor}>Color: {product.color}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
