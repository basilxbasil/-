import axios from 'axios';

const API_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getListings = async () => {
  const response = await api.get("/api/listings");
  return response.data;
};

export default api;
