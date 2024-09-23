"use client";

import React, { useEffect, useState } from "react";
import styles from "../../add-product/ProductForm.module.css"; // Import CSS module for styling
import axiosInstance from "@/services/axios"; // Assuming you have a configured axios instance
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";
import { base64ToFile, generateBase64String } from "@/utils/utils";

interface ProductFormProps {
  params: { productId: string };
}

const ProductForm: React.FC<ProductFormProps> = ({ params }) => {
  const router = useRouter();
  const cookies = useCookies();

  const token = cookies.get("token");
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    company: "",
    category: "",
    color: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUpdated, _imageUpdated] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    axiosInstance
      .get(`/my-products/${params.productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        if (resp.data.success) {
          const product = resp.data.product;
          setFormData({
            name: product.name,
            price: product.price,
            company: product.company,
            category: product.category,
            color: product.color,
          });
          setImagePreview(product.image);
          const file = base64ToFile(product.image, "image.jpg", "image/jpeg");
          setImageFile(file);
        }
        setLoading(false);
      })
      .catch((err) => {
        const resp = err.response;
        toast.error(resp.data.message);
        setLoading(false);
      });
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      _imageUpdated(true);
      try {
        const base64 = await generateBase64String(e.target.files[0]);
        setImagePreview(base64 as string);
      } catch (error) {
        // Type assertion for error
        const typedError = error as Error;
        console.error("Error generating Base64 string:", typedError.message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form data before submitting
    if (!validateForm() || loading) {
      return;
    }

    setLoading(true);

    // Create FormData to include both text fields and file

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("company", formData.company);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("color", formData.color);
    formDataToSend.append("userId", token || "");

    if (imageFile && imageUpdated) {
      formDataToSend.append("image", imageFile); // Type assertion as string
    }

    axiosInstance
      .put(`/my-products/${params.productId}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }, // Add JWT token to the request headers
      })
      .then((resp) => {
        toast.success(resp.data.message);
        if (resp.data.success) {
          router.push("/my-products"); // Redirect to products page
        }
        setLoading(false);
      })
      .catch((err) => {
        const resp = err.response;
        toast.error(resp.data.message);
        setLoading(false);
      });
  };

  const validateForm = () => {
    const { name, price, company, category, color } = formData;

    if (!name || !price || !company || !category || !color) {
      toast.error("Please fill in all the fields.");
      return false;
    }

    if (!imageUpdated) {
      return true;
    }

    if (!imageFile) {
      toast.error("Please upload an image.");
      return false;
    }

    // Optionally, validate image size/type if needed
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(imageFile.type)) {
      toast.error("Please upload a valid image (JPEG, PNG, GIF).");
      return false;
    }

    if (imageFile.size > 2 * 1024 * 1024) {
      // 2MB limit
      toast.error("Image size should be less than 2MB.");
      return false;
    }

    return true;
  };

  const handleImageClick = () => {
    fileInputRef.current?.click(); // Trigger click on the file input
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Update Product</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="image">Image</label>
          <div
            className={styles.imagePreviewWrapper}
            onClick={handleImageClick}
          >
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className={styles.imagePreview}
              />
            )}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.imageInput}
              ref={fileInputRef}
            />
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          {loading ? "Updating..." : "Make Changes"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
