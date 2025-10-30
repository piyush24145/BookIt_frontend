import axios from "axios";

const BASE = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export const getExperiences = () => api.get("/api/experiences");
export const getExperience = (id: string) => api.get(`/api/experiences/${id}`);
export const createBooking = (payload: any) => api.post("/api/bookings", payload);
export const validatePromo = (code: string) =>
  api.post("/api/promo/validate", { code });
