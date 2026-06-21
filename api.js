import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // تأكد أن هذا المسار يطابق سيرفرك
});

export const formatApiErrorDetail = (detail) => {
  return typeof detail === "string" ? detail : "حدث خطأ غير متوقع";
};
