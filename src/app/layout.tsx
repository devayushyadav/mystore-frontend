// app/layout.tsx

import React from "react";
import Navbar from "../components/Navbar/Navbar"; // Adjust the path based on your directory structure
import Footer from "../components/Footer/Footer"; // Import the Footer component
import "./globals.css"; // Import global styles
import styles from "./layout.module.css"; // Import layout-specific styles
import { Toaster } from "react-hot-toast";
import { CookiesProvider } from "next-client-cookies/server";

export const metadata = {
  title: "My Store",
  description: "A store for amazing products",
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>{/* Add any additional head elements or metadata here */}</head>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      ></link>
      <body className={styles.body}>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
          defer
        />
        <Toaster position="top-center" />
        <CookiesProvider>
          <Navbar />
          <main className={styles.main}>{children}</main>
          <Footer />
        </CookiesProvider>
      </body>
    </html>
  );
};

export default RootLayout;
