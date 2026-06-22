import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, LogOut, ShieldCheck, Edit3, Save } from "lucide-react";
import { toast } from "sonner";
import AppShell from "@/components/AppShell";
import ListingCard from "@/components/ListingCard";
import { api, formatApiErrorDetail } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { SAUDI_CITIES } from "@/lib/categories";

export default function Profile() {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", city: user?.city || "" });
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    if (!user) return;
    api.get("/listings", { params: { seller_id: user.id, limit: 50 } })
      .then((r) => setMyListings(r.data.items || []));
  }, [user]);

  const onSave = async () => {
    try {
      const { data } = await api.patch("/me", form);
      setUser(data);
      toast.success("تم تحديث الملف");
      setEditing(false);
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "فشل التحديث");
    }
  };

  const onLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  if (!user) return null;

  return (
    <AppShell>
      <header className="brand-bar px-4 py-3 flex items-center gap-2">
        <button onClick={() => navigate(-1)} aria-label="رجوع" data-testid="profile-back">
          <ArrowRight className="w-5 h-5" />
        </button>
        <h1 className="text-base font-semibold flex-1">حسابي</h1>
        <button onClick={onLogout} className="text-red-600" aria-label="خروج" data-testid="profile-logout">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <section className="px-4 pt-4">
        <div className="bg-white rounded-2xl border border-[var(--line)] p-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[var(--secondary)] text-white flex items-center justify-center text-lg font-bold">
              {(user.name || user.email).slice(0, 1)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold line-1" data-testid="profile-name">{user.name}</p>
              <p className="text-xs text-[var(--ink-3)] line-1" data-testid="profile-email">{user.email}</p>
              {user.role === "admin" && (
                <span className="inline-flex items-center gap-1 mt-1 text-[11px] bg-[var(--accent)]/30 text-[var(--secondary)] px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> مشرف
                </span>
              )}
            </div>
            <button
              onClick={() => editing ? onSave() : setEditing(true)}
              className="text-[var(--brand)]"
              aria-label={editing ? "حفظ" : "تعديل"}
              data-testid="profile-edit-toggle"
            >
              {editing ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
            </button>
          </div>

          {editing && (
            <div className="space-y-3 mt-4 fade-in">
              <div>
                <label className="field-label">الاسم</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-2.5 outline-none focus:border-[var(--brand)]"
                  data-testid="profile-name-input"
                />
              </div>
              <div>
                <label className="field-label">الجوال</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  inputMode="tel"
                  className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-2.5 outline-none focus:border-[var(--brand)]"
                  data-testid="profile-phone-input"
                />
              </div>
              <div>
                <label className="field-label">المدينة</label>
                <select
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-white border border-[var(--line)] rounded-xl px-4 py-2.5 outline-none focus:border-[var(--brand)]"
                  data-testid="profile-city-input"
                >
                  <option value="">اختر</option>
                  {SAUDI_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          )}
        </div>

        {user.role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="w-full mt-3 bg-[var(--secondary)] text-white font-semibold py-3 rounded-xl active:scale-[0.99] transition"
            data-testid="open-admin"
          >
            لوحة المشرف
          </button>
        )}
      </section>

      <section className="px-4 mt-6">
        <h3 className="text-base font-semibold mb-3">إعلاناتي ({myListings.length})</h3>
        {myListings.length === 0 ? (
          <div className="text-center text-sm text-[var(--ink-3)] py-8" data-testid="profile-empty">
            لم تنشر إعلانات بعد.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3" data-testid="profile-listings">
            {myListings.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        )}
      </section>
    </AppShell>
  );
}
