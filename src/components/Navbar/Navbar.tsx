// components/Navbar.tsx

import Link from "next/link";
import styles from "./Navbar.module.css"; // Adjust the path based on your directory structure
import Logout from "../Logout/Logout";
import { getCookie } from "@/utils/ManageCookie";
import { stringToObject } from "@/utils/utils";

const Navbar: React.FC = async () => {
  const isLoggedIn = await getCookie("token");
  const userData = await getCookie("user");
  const userName = stringToObject(userData);

  console.log(userName);
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
            <Link href="/cart">Cart</Link>
          </li>
          <div className="dropdown">
            <button
              className="dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {userName.firstName || "-"}
            </button>
            <ul
              className={"dropdown-menu"}
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <Link href="/profile" className="dropdown-item">
                  Profile
                </Link>
              </li>
              <li>
                <Logout />
              </li>
            </ul>
          </div>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
