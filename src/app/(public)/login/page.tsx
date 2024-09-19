"use client";
// app/signup.tsx

import React, { useState } from "react";
import styles from "./login.module.css"; // Import CSS module for styling
import axiosInstance from "@/services/axios";
import toast from "react-hot-toast";
import { setCookie } from "../../../utils/ManageCookie";
import { objectToString } from "@/utils/utils";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, _loading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    _loading(true);
    axiosInstance
      .post("/login", formData)
      .then((resp) => {
        toast.success(resp.data.message);
        if (resp.data.success) {
          const user = resp.data.user;
          router.replace("/");
          setCookie("token", user._id);
          setCookie("user", objectToString(user));
        }
        _loading(false);
      })
      .catch((err) => {
        const resp = err.response;
        toast.error(resp.data.message);
        _loading(false);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Log In</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
