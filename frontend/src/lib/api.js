import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// تمرير توكن المصادقة تلقائياً في كل طلب إذا كان موجوداً
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// دالة لتحويل مسار الصورة القادم من السيرفر إلى رابط كامل للمعاينة
export function fileUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_URL}/${path}`;
}

// دالة لتنسيق وعرض رسائل الخطأ القادمة من الـ API
export function formatApiErrorDetail(detail) {
  if (!detail) return null;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail.map((d) => d.msg).join(", ");
  }
  return JSON.stringify(detail);
}
