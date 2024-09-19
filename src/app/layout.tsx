// app/layout.tsx

import React from "react";
import Navbar from "../components/Navbar/Navbar"; // Adjust the path based on your directory structure
import Footer from "../components/Footer/Footer"; // Import the Footer component
import "./globals.css"; // Import global styles
import styles from "./layout.module.css"; // Import layout-specific styles
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "My Store",
  description: "A store for amazing products",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>{/* Add any additional head elements or metadata here */}</head>
      <body className={styles.body}>
        <Toaster position="top-center" />
        <Navbar />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
