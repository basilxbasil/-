import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import AppShell from "../components/AppShell";
import { useAuth } from "../contexts/AuthContext";
import { formatApiErrorDetail } from "../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email.trim(), password);
      toast.success("مرحباً بك مجدداً");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell hideNav>
      <header className="brand-bar px-4 py-3 flex items-center gap-2">
        <button onClick={() => navigate("/")} aria-label="الرئيسية">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold">تسجيل الدخول</h1>
      </header>

      <form onSubmit={onSubmit} className="px-4 pt-8 space-y-4" data-testid="login-form">
        <div>
          <label className="field-label">البريد الإلكتروني</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-3 outline-none focus:border-[var(--brand)]"
            data-testid="login-email"
          />
        </div>
        <div>
          <label className="field-label">كلمة المرور</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-3 outline-none focus:border-[var(--brand)]"
            data-testid="login-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--brand)] text-white font-semibold py-3 rounded-xl disabled:opacity-60 transition"
          data-testid="login-submit"
        >
          {loading ? "جاري الدخول..." : "تسجيل الدخول"}
        </button>

        <p className="text-center text-sm text-[var(--ink-2)] pt-2">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="text-[var(--brand)] font-semibold">
            سجل الآن
          </Link>
        </p>
      </form>
    </AppShell>
  );
}
