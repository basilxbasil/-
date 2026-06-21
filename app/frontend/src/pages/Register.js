import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { formatApiErrorDetail } from "@/lib/api";

export default function Register() {
  const [formData, setFormData] = useState({ email: "", password: "", name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // سنستخدم نفس منطق الـ api الخاص بالتسجيل
      const { api } = require("@/lib/api");
      await api.post("/auth/register", formData);
      toast.success("تم إنشاء حسابك بنجاح!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto pt-12">
      <h1 className="text-2xl font-bold mb-6 text-center">إنشاء حساب جديد</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="field-label">الاسم</label>
          <input
            type="text"
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="field-label">البريد الإلكتروني</label>
          <input
            type="email"
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="field-label">كلمة المرور</label>
          <input
            type="password"
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <button
          disabled={loading}
          className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-opacity-90 disabled:opacity-50"
        >
          {loading ? "جاري التسجيل..." : "تسجيل"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-ink-3">
        لديك حساب بالفعل؟ <Link to="/login" className="text-primary font-bold">تسجيل الدخول</Link>
      </p>
    </div>
  );
}
