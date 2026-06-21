import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { phone, password });
      login(data.token, data.user);
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    } catch (err) {
      toast.error("بيانات الدخول غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell hideNav>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">تسجيل الدخول</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            required 
            placeholder="رقم الجوال" 
            className="w-full p-3 border rounded-xl" 
            onChange={(e) => setPhone(e.target.value)} 
          />
          <input 
            required 
            type="password" 
            placeholder="كلمة المرور" 
            className="w-full p-3 border rounded-xl" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button 
            disabled={loading} 
            className="w-full bg-[var(--brand)] text-white p-3 rounded-xl font-bold"
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    </AppShell>
  );
}
