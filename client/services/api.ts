import axios from "axios";

const API = axios.create({
  baseURL: "https://lms-backend-new-n1kz.onrender.com",
});

API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default API;