import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Get all experiences
export const getExperiences = () => API.get("/experiences");

// ✅ Get single experience
export const getExperience = (id: string) => API.get(`/experiences/${id}`);

// ✅ Create booking
export const createBooking = (data: any) => API.post("/bookings", data);

// ✅ Validate promo (👉 ye missing tha)
export const validatePromo = (code: string) =>
  API.post("/promo/validate", { code });

export default API;
