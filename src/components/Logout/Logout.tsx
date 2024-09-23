// components/Footer.tsx
"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Logout: React.FC = () => {
  const router = useRouter();

  const logout = () => {
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setTimeout(() => {
      // Redirect to login page after 1 second to prevent flashing the login page
      router.push("/login");
    }, 100);
  };
  return (
    <button onClick={() => logout()} className="dropdown-item">
      Logout
    </button>
  );
};

export default Logout;
