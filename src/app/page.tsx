// app/products/page.tsx
import React from "react";
import styles from "./page.module.css";
import axiosInstance from "@/services/axios";
import { cookies } from "next/headers";
import { Product } from "@/config/interfaces";
import Image from "next/image";

interface ProductListProps {
  products: Product[];
  error?: string;
}

const fetchProducts = async (): Promise<ProductListProps> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      products: [],
      error: "Unauthorized: Please login first",
    };
  }

  try {
    const response = await axiosInstance.get(`/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      products: response.data.product,
    };
  } catch (error: unknown) {
    let errorMessage = "An error occurred while fetching products";

    // Check if the error is an AxiosError and has the expected structure
    if (error instanceof Error && "response" in error) {
      const axiosError = error as {
        response?: { data?: { message?: string } };
      };
      if (axiosError.response?.data?.message) {
        errorMessage = axiosError.response.data.message;
      }
    }

    return {
      products: [],
      error: errorMessage,
    };
  }
};

const ProductList: React.FC = async () => {
  const { products, error } = await fetchProducts();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Featured Products</h1>

      {(error || products.length === 0) && (
        <p className={styles.notfound}>{error ?? "No products available"}</p>
      )}

      {!error && products.length > 0 && (
        <div className={styles.grid}>
          {products.map((product) => (
            <div className={styles.card} key={product.id}>
              <div className={styles.imageContainer}>
                <Image
                  src={product.image} // Base64 image from backend
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className={styles.image}
                />
              </div>
              <div>
                <h2>{product.name} &rarr;</h2>
                <p>Price: {product.price}</p>
                <p>Company: {product.company}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
