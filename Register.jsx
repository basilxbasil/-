import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import { api } from "@/lib/api";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/auth/register", { name, phone, password });
      toast.success("تم إنشاء الحساب بنجاح، يمكنك تسجيل الدخول الآن");
      navigate("/login");
    } catch (err) {
      toast.error("فشل إنشاء الحساب، تأكد من البيانات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell hideNav>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">إنشاء حساب جديد</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            required 
            placeholder="الاسم الكامل" 
            className="w-full p-3 border rounded-xl" 
            onChange={(e) => setName(e.target.value)} 
          />
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
            {loading ? "جاري التسجيل..." : "تسجيل"}
          </button>
        </form>
      </div>
    </AppShell>
  );
}
