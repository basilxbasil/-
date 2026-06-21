import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { formatApiErrorDetail } from "@/lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/dashboard");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto pt-12">
      <h1 className="text-2xl font-bold mb-6 text-center">تسجيل الدخول</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="field-label">البريد الإلكتروني</label>
          <input
            type="email"
            className="w-full p-3 border rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="field-label">كلمة المرور</label>
          <input
            type="password"
            className="w-full p-3 border rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          disabled={loading}
          className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-opacity-90 disabled:opacity-50"
        >
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-ink-3">
        ليس لديك حساب؟ <Link to="/register" className="text-primary font-bold">سجل الآن</Link>
      </p>
    </div>
  );
}
