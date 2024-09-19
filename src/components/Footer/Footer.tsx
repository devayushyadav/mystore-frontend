// components/Footer.tsx

import React from 'react';
import styles from './Footer.module.css'; // Adjust the path based on your directory structure

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>
      <ul className={styles.footerLinks}>
        <li><a href="/privacy-policy">Privacy Policy</a></li>
        <li><a href="/terms-of-service">Terms of Service</a></li>
        <li><a href="/contact">Contact Us</a></li>
      </ul>
    </footer>
  );
};

export default Footer;
