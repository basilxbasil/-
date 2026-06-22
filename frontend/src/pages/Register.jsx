import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import AppShell from "../components/AppShell";
import { api } from "../lib/api";
import { useAuth } from "../contexts/AuthContext";
import { formatApiErrorDetail } from "../lib/api";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      await login(form.email.trim(), form.password);
      toast.success("تم إنشاء الحساب بنجاح");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "فشل التسجيل");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell hideNav>
      <header className="brand-bar px-4 py-3 flex items-center gap-2">
        <button onClick={() => navigate(-1)} aria-label="رجوع">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">إنشاء حساب جديد</h1>
      </header>

      <form onSubmit={onSubmit} className="px-4 pt-6 space-y-4" data-testid="register-form">
        <div>
          <label className="field-label">الاسم الكامل</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="محمد أحمد"
            className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-3 outline-none focus:border-[var(--brand)]"
            data-testid="register-name"
          />
        </div>
        <div>
          <label className="field-label">البريد الإلكتروني</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@example.com"
            className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-3 outline-none focus:border-[var(--brand)]"
            data-testid="register-email"
          />
        </div>
        <div>
          <label className="field-label">كلمة المرور</label>
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-3 outline-none focus:border-[var(--brand)]"
            data-testid="register-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--brand)] text-white font-semibold py-3 rounded-xl disabled:opacity-60 transition"
          data-testid="register-submit"
        >
          {loading ? "جاري إنشاء الحساب..." : "تسجيل جديد"}
        </button>

        <p className="text-center text-sm text-[var(--ink-2)] pt-2">
          لديك حساب بالفعل؟{" "}
          <Link to="/login" className="text-[var(--brand)] font-semibold">
            دخول
          </Link>
        </p>
      </form>
    </AppShell>
  );
}
