import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import AppShell from "@/components/AppShell";

export default function CreateListing() {
  const [formData, setFormData] = useState({ title: "", price: "", description: "", image: "" });
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("يجب تسجيل الدخول لإنشاء إعلان");
      return;
    }
    try {
      await api.post("/listings", formData);
      toast.success("تم نشر الإعلان بنجاح!");
      navigate("/");
    } catch (err) {
      toast.error("فشل نشر الإعلان");
    }
  };

  return (
    <AppShell>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">إضافة إعلان جديد</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            placeholder="العنوان" 
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <input 
            placeholder="السعر" 
            type="number"
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
          <textarea 
            placeholder="الوصف" 
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <input 
            placeholder="رابط الصورة (URL)" 
            className="w-full p-3 border rounded-xl"
            onChange={(e) => setFormData({...formData, image: e.target.value})}
          />
          <button type="submit" className="w-full py-4 bg-primary text-white rounded-xl font-bold">
            نشر الإعلان
          </button>
        </form>
      </div>
    </AppShell>
  );
}
