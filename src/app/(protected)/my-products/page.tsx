import React from "react";
import styles from "./ProductList.module.css"; // Import CSS module for styling

// Sample product data for demonstration
const products = [
  {
    id: 1,
    name: "Product 1",
    price: "$100",
    company: "Company A",
    category: "Category 1",
    color: "Red",
    image: "/images/product1.jpg", // Replace with actual image path
  },
  {
    id: 2,
    name: "Product 2",
    price: "$150",
    company: "Company B",
    category: "Category 2",
    color: "Blue",
    image: "/images/product2.jpg", // Replace with actual image path
  },
  {
    id: 3,
    name: "Product 3",
    price: "$150",
    company: "Company B",
    category: "Category 3",
    color: "Blue",
    image: "/images/product3.jpg", // Replace with actual image path
  },
  {
    id: 4,
    name: "Product 4",
    price: "$150",
    company: "Company B",
    category: "Category 4",
    color: "Blue",
    image: "/images/product4.jpg", // Replace with actual image path
  },
  // Add more products here...
];

const ProductList: React.FC = () => {
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
