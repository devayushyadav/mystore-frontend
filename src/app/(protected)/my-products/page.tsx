// app/products/page.tsx (or page.jsx if using JavaScript)
import React from "react";
import styles from "./ProductList.module.css";
import axiosInstance from "@/services/axios";
import { cookies } from "next/headers";
import { Product } from "@/config/interfaces"; // Update this path as needed
import Link from "next/link";
import Delete from "./components/DeleteButton";

// Define the Product type
interface ProductListProps {
  products: Product[];
  error?: string;
}

const fetchProducts = async (): Promise<ProductListProps> => {
  const cookieStore = cookies(); // Access cookies in the `app` directory
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      products: [],
      error: "Unauthorized: Please login first",
    };
  }

  try {
    const response = await axiosInstance.get(`/my-products`, {
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
      <h1 className={styles.title}>Product Listing</h1>

      {(error || products.length === 0) && (
        <p className={styles.notfound}>{error ?? "No products available"}</p>
      )}

      {!error && products.length > 0 && (
        <div className={styles.productList}>
          {products.map((product) => (
            <div className={styles.productCard} key={product._id}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.image}
              />
              <div className={styles.details}>
                <h2 className={styles.productName}>{product.name}</h2>
                <p className={styles.productPrice}>Price: {product.price}</p>
                <p className={styles.productCompany}>
                  Company: {product.company}
                </p>
                <p className={styles.productCategory}>
                  Category: {product.category}
                </p>
                <p className={styles.productColor}>Color: {product.color}</p>
                <div className={styles.actions}>
                  <Link
                    href={`/my-products/${product._id}`}
                    className={styles.iconButton}
                  >
                    {/* Edit Icon */}
                    <svg className={styles.icon} viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </Link>
                  <Delete productId={product._id ?? ""} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
