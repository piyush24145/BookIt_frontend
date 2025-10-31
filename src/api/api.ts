import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export const getExperiences = () => API.get("/experiences");

export const getExperience = (id: string) => API.get(`/experiences/${id}`);

export const createBooking = (data: any) => API.post("/bookings", data);


export const validatePromo = (code: string) =>
  API.post("/promo/validate", { code });

export default API;
