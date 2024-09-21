// components/Navbar.tsx

import Link from "next/link";
import styles from "./Navbar.module.css"; // Adjust the path based on your directory structure
import Logout from "../Logout/Logout";
import { getCookie } from "@/utils/ManageCookie";

const Navbar: React.FC = async () => {
  const isLoggedIn = await getCookie("token");

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">MyStore</Link>
      </div>
      {isLoggedIn && (
        <ul className={styles.navLinks}>
          <li>
            <Link href="/add-product">Add Product</Link>
          </li>
          <li>
            <Link href="/my-products">My Products</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
