// lib/axiosInterceptor.js

import axios from 'axios';
import { getCookies } from 'next-client-cookies/server';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4500/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request configuration before sending
    // const cookies = getCookies();
    // const token = 'asdasdasdsa';
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response data
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login page)
      const cookieStore = document.cookie.split(";");
      cookieStore.forEach((cookie) => {
        document.cookie = cookie.split("=")[0] +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      });
      setTimeout(()=>{
        window.location.href = '/login';        
      },2000)
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
