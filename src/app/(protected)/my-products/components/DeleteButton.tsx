"use client";
import React, { useState } from "react";
import styles from "../ProductList.module.css";
import axiosInstance from "@/services/axios";
import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useCookies } from "next-client-cookies";

// Define prop types using TypeScript
interface DeleteProps {
  productId: string; // Ensure productId is a string type
}

const Delete: React.FC<DeleteProps> = ({ productId }) => {
  const cookies = useCookies();

  const token = cookies.get("token");
  const [loading, _loading] = useState<boolean>(false);

  const handleDelete = (id: string) => {
    if (loading) {
      return;
    }
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axiosInstance
              .delete(`/my-products/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((resp) => {
                toast.success(resp.data.message);
                if (resp.data.success) {
                }
                _loading(false);
              })
              .catch((err) => {
                const resp = err.response;
                toast.error(resp.data.message);
                _loading(false);
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <button
      onClick={() => handleDelete(productId)}
      className={styles.iconButton}
    >
      {/* Delete Icon */}
      <svg className={styles.icon} viewBox="0 0 24 24">
        <path d="M16 9v10H8V9h8m-1.5-6H9.5l-1 1H5v2h14V4h-3.5l-1-1z" />
      </svg>
    </button>
  );
};

export default Delete;
